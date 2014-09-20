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
    this.$container = $(container);
    this.view = this.opts.view || renderRecord;
    this.templateFn = this.template($(this.opts.template).html());
    this.criterias = [];

    $.each(this.opts.criterias || [], function(){
      self.addCriteria(this);
    });

    this.Model = JsonQuery();
    this.addRecords(records);
  };

  var F = FJS.prototype;

  Object.defineProperty(F, 'records', {
    get: function(){ return this.Model.records; }
  });

  Object.defineProperty(F, 'recordsCount', {
    get: function(){ return this.Model.records.length; }
  });

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

  //Callback
  F.execCallback = function(name, records){
    if(this.callbacks[name]) {
      this.callbacks[name].call(this, records);
    }
  };

  F.addCallback = function(name, fns){
    if(name && fns){
      this.callbacks[name] = fns;
    }
  };

  //Add Data
  F.addRecords = function(records){
    var index = this.records.length;
    var has_scheme = !!this.Model.schema;

    this.execCallback('beforeAddRecords', records);

    if(this.Model.addRecords(records)){
      if(!this.has_scheme){
        this.initSearch(this.opts.search);
      }

      this.render(records, index++);
      this.filter();
    }

    this.execCallback('afterAddRecords', records);
  };

  var renderRecord = function(record, index){
    return this.templateFn(record);
  };

  F.render = function(records, index){
    var self = this, ele;

    if(!records.length){return; }

    this.execCallback('beforeRender', records);

    index = index || 0;
    var cName = 'beforeRecordRender';

    $.each(records, function(i){
      self.execCallback(cName, this);
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
    criteria.active = true;

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

  var changeCriteriaStatus = function(names, active){
    var self = this;

    if(!names){ return; }

    if(!$.isArray(names)){
      names = [names]
    }

    $.each(names, function(){
      var name = this;

      $.each(self.criterias, function(){
        if(this.field == name){
          this.active = active;
        }
      })
    });
  };

  F.deactivateCriteria = function(names){
    changeCriteriaStatus.call(self, names, false);
  };

  F.activateCriteria = function(names){
    changeCriteriaStatus.call(this, names, true);
  };

  var getSelectedValues = function(criteria){
    var vals = [];

    criteria.$ele.filter(criteria.selector).each(function() {
      vals.push($(this).val());
    });

    if(criteria.type == 'range'){
      vals = vals[0].split('-');
    }

    return vals;
  };

  F.lastResult = function(){
    return (this.last_result || this.records);
  };

  F.filter = function(){
    var query = {}, vals, _q;

    $.each(this.criterias, function(){
      if(this.active){
        vals = getSelectedValues(this);

        if(vals || vals.length){
          _q = ($.isArray(vals) && !this.type) ? (this._q + '.$in') : this._q;
          query[_q] = vals ;
        }
      }
    });

    this.last_result = this.Model.where(query).all;

    if(this.searchFilter(this.last_result)){
      return query;
    }

    this.show(this.last_result);
    this.execCallback('afterFilter', this.last_result);

    return query;
  };

  //HideShow element
  F.show = function(result, type){
    $('.fjs_item').hide();

    for(var i = 0, l = result.length; i < l; i++){
      $('#fjs_' + result[i]._fid).show();
    }
  };

  //Search
  var bindSearchEvent = function(searchBox, context){
    $('body').on('keyup', searchBox, function(e){
      context.filter();
      //context.searchFilter(true);
    });
  };

  F.initSearch = function(opts){
    if(!opts && !opts.ele){
      return;
    }

    if(!opts.start_length){
      this.opts.search.start_length = 2
    }

    this.$search_ele = $(this.opts.search.ele);

    if(this.$search_ele.length){
      this.has_search = true;
      this.searchFn = this.buildSearchFn(opts.fields);
      bindSearchEvent(opts.ele, this);
    }
  };

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

  F.searchFilter = function(records) {
    if(!this.has_search){
      return;
    }

    var text = $.trim(this.$search_ele.val()),
        result;

    if(text.length < this.opts.search.start_length){
      return false;
    }

    result = this.search(text, records || this.lastResult());

    this.show(result);
    this.execCallback('afterFilter', result);

    return true;
  };

  F.search = function(text, records){
    text = text.toLocaleUpperCase();

    var result = [];

    for(var i = 0, l = records.length; i < l; i++){
      if(this.searchFn(text, records[i])){
        result.push(records[i]);
      }
    }

    return result;
  };

  //Streaming
  F.setStreaming = function(opts){
    if(!opts) {return;}

    this.opts.streaming = opts;

    if(opts.data_url){
      opts.stream_after = (opts.stream_after || 2)*1000;
      opts.batch_size = opts.batch_size || false;
      this.streamData(opts.stream_after);
    }

  };

  var fetchData = function(){
    var self = this,
        params = this.opts.params || {},
        opts = this.opts.streaming;

    params.offset = this.recordsCount;

    if (opts.batch_size) {
      params.limit = opts.batch_size;
    }

    if (this.has_search){
      params['q'] = $.trim(this.$search_ele.val());
    }

    $.getJSON(opts.data_url, params).done(function(records){
      if (params.limit != null && (!records || !records.length)){
        self.stopStreaming();
      }else{
        self.setStreamInterval();
        self.addRecords(records);
      }

    }).fail(function(e){
        self.stopStreaming();
    });
  };

  F.setStreamInterval = function(){
    var self = this;

    if(self.opts.streaming.stop == true){ return; }

    self.streamingTimer = setTimeout(function(){
      fetchData.call(self);
    }, self.opts.streaming.stream_after);
  };

  F.stopStreaming = function(){
    this.opts.streaming.stop = true;

    if (this.streamingTimer){
      clearTimeout(this.streamingTimer);
    }
  };

  F.resumeStreaming = function(){
    this.opts.streaming.stop = false;
    this.streamData(this.opts.streaming.stream_after);
  };

  F.streamData = function(time){
    this.setStreamInterval();

    if(!this.opts.streaming.batch_size){
      this.stopStreaming();
    }
  };

})(this);
