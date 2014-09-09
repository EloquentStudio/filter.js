(function(window){
  'use strict';

  var FilterJS = function(records, container, options) {
    var fjs = new FJS(records, container, options);
    FilterJS.list.push(fjs);

    return fjs;
  };

  FilterJS.VERSION = '2.0.0';
  FilterJS.list = [];

  $.fn.filterjs = function(records, options) {
    var $this = $(this);

    if (!$this.data('fjs')){
      $this.data('fjs', FilterJS(records, $this, options));
    }
  };

  window.FilterJS = FilterJS;

  var FJS = function(records, container, options) {
    var self = this;

    this.opts = options || {};
    this.callbacks = this.opts.callbacks || {};
    this.records = records;
    this.$container = $(container);
    this.view = this.opts.view || renderRecord;
    this.templateFn = this.template($(this.opts.template).html());

    this.Model = JsonQuery(this.records);
    //this.Model.setGetterFn('_fid', function(obj) { return obj._fid; } )
    this.render(records);

    if(this.opts.search && this.opts.search.ele){
      this.searchFn = this.buildSearchFn(this.opts.search.fields);
      bindSearchEvent(this.opts.search.ele, this);
    }

    this.criterias = [];
    $.each(this.opts.criterias || [], function(){
      self.addCriteria(this);
    });
  };

  var F = FJS.prototype;

  //View Template
  // Ref: Underscopre.js
  //JavaScript micro-templating, similar to John Resig's implementation.
  var templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  var escapeStr = function(string) {
    return (''+string).replace(/&/g,  '&amp;')
                      .replace(/</g,  '&lt;')
                      .replace(/>/g,  '&gt;')
                      .replace(/"/g,  '&quot;')
                      .replace(/'/g,  '&#x27;')
                      .replace(/\//g, '&#x2F;');
  };

  F.template = function(str, data) {
    var c  = templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape, function(match, code) {
           return "',escapeStr(" + code.replace(/\\'/g, "'") + "),'";
         })
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : function(data) { return func(data) };
  };

  F.addRecords = function(records){
    this.records.concat(records);
    this.render(records, this.records.length);
  }

  var renderRecord = function(record, index){
    return this.templateFn(record);
  };

  F.render = function(records, index){
    var self = this, ele;

    if(this.callbacks.beforeRender){
      this.callbacks.beforeRender(records);
    }

    index = index || 0;

    $.each(records, function(i){
      if(self.callbacks.beforeItemRender){
        self.callbacks.beforeItemRender(this);
      }

      this._fid = (index++);

      ele = $($.trim(self.view.call(self, this, i)));
      ele.attr('id', 'fjs_' + this._fid);
      ele.addClass('fjs_item');
      self.$container.append(ele);
    });
  };

  var setDefaultCriteriaOpts = function(criteria){
    var ele = criteria.$ele,
        eleType = criteria.$ele.attr('type');

    if(!criteria.selector){
      if (ele.get(0).tagName == 'INPUT'){
        criteria.selector = (eleType == 'checkbox' || eleType == 'radio') ? ':checked' : ':input';
      }else if (ele.get(0).tagName == 'SELECT'){
        criteria.selector = 'select';
      }
    }

    if (!criteria.event){
      criteria.event = (eleType == 'checkbox' || eleType == 'radio') ? 'click' : 'change';
    }

    return criteria;
  };

  var bindFilterEvent = function(criteria, context){
    $('body').on(criteria.event, criteria.ele, function(e) {
      context.filter();
    });
  };

  var bindSearchEvent = function(searchBox, context){
    $('body').on('keyup', searchBox, function(e){
      //context.filter('search');
      context.search($(this).val());
    });
  };

  F.addCallback = function(name, fns){
    if(name && fns){
      this.callbacks[name] = fns;
    }
  };

  F.addCriteria = function(criterias){
    var self = this;

    if(!criterias){ return false; }

    if($.isArray(criterias)){
      $.each(criterias, function(){
        addFilterCriteria.call(self, this);
      });
    }else{
      addFilterCriteria.call(self, criterias);
    }

    return true;
  };

  // Add Filter criteria
  // criteria: { ele: '#name', event: 'check', field: 'name', type: 'range' }
  var addFilterCriteria = function(criteria){
    if(!criteria || !criteria.field || !criteria.ele){
      return false;
    }

    criteria.$ele = $(criteria.ele);

    if(!criteria.$ele.length){
      return false;
    }

    criteria = setDefaultCriteriaOpts(criteria);
    bindFilterEvent(criteria, this);

    criteria._q = criteria.field + (criteria.type == 'range' ? '.$bt' : '')

    this.criterias.push(criteria);

    return true;
  };

  F.removeCriteria = function(field){
    var self = this, criteria, index;

    $.each(self.criterias, function(i){
      if(this.field == field){
        index = i;
      }
    });

    if(index){
      criteria = this.criterias.splice(index, 1)[0];
      $('body').off(criteria.event, criteria.ele)
    }
  };

  var getSelectedValues = function(criteria){
    var vals = [];

    criteria.$ele.filter(criteria.selector).each(function() {
      vals.push($(this).val());
    });

    if(criteria.type == 'range'){
      vals = vals[0].split('-')
    }

    return vals;
  };

  F.lastResult = function(){
    return (this.last_result || this.Model.records);
  };

  F.filter = function(){
    var query = {}, vals, _q;

    $.each(this.criterias, function(){
      vals = getSelectedValues(this);
      _q = ($.isArray(vals) && !this.type) ? (this._q + '.$in') : this._q;

      query[_q] = vals ;
    });

    $('.fjs_item').hide();

    var result = this.Model.where(query).exec(function(r){
      $('#fjs_' + r._fid).show();
    });

    this.last_result = result;

    if(this.callbacks.afterFilter){
      this.callbacks.afterFilter(result);
    }
    return query;
  };

  //Search
  F.buildSearchFn = function(fields){
     var self = this, getterFns = [];

     if(fields){
       $.each(fields, function(){
         getterFns.push(self.Model.getterFns[this]);
       })
     }else{
       $.each(self.Model.getterFns, function(i, fn){
         getterFns.push(fn);
       });
     }

     return function(text, record){
       text = text.toLocaleUpperCase();

       for(var i = 0, l = getterFns.length; i < l; i++){

         if((getterFns[i](record) + '').toLocaleUpperCase().indexOf(text) > -1){
           return true;
         }

       }
       return false;
     }
  };

  F.search = function(text, records){
    text = $.trim(text);

    if(!text.length || text.length < 2){ return records; }

    records = records || this.lastResult();

    text = text.toLocaleUpperCase();
    $('.fjs_item').hide();

    var result = [];

    for(var i = 0, l = records.length; i < l; i++){
      if(this.searchFn(text, records[i])){
        $('#fjs_' + records[i]._fid).show();
        result.push(records[i]);
      }
    }

    if(this.callbacks.afterFilter){
      this.callbacks.afterFilter(result);
    }
  };

})(this);
