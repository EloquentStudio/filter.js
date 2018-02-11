var FJS = function(records, container, options) {
  var self = this;

  this.opts = options || {};
  this.callbacks = this.opts.callbacks || {};
  this.$container = $(container);
  this.view = this.opts.view || renderRecord;
  this.criterias = [];
  this._index = 1;
  this.appendToContainer = this.opts.appendToContainer || appendToContainer;
  this.has_pagination = !!this.opts.pagination;
  this.search_text = '';
  this.anyFilterSelected = false;

  this.setTemplate(this.opts.template);

  $.each(this.opts.criterias || [], function(){
    self.addCriteria(this);
  });

  this.Model = JsonQuery();
  this.Model.getterFns['_fid'] = function(r){ return r['_fid'];};
  this.addRecords(records, this.opts['filter_on_init'] || false);

  if(this.has_pagination){
    this.initPagination();
  }
};

var F = FJS.prototype;

Object.defineProperty(F, 'records', {
  get: function(){ return this.Model.records; }
});

Object.defineProperty(F, 'recordsCount', {
  get: function(){ return this.Model.records.length; }
});

F.templateBuilder = templateBuilder;

//Callback
F.execCallback = function(){
  var name = arguments[0];

  if(this.callbacks[name]) {
    this.callbacks[name].apply(this, Array.prototype.slice.call(arguments, 1));
  }
};

F.addCallback = function(name, fns){
  if(name && fns){
    this.callbacks[name] = fns;
  }
};

//Add Data
F.addRecords = function(records, applyFilter){
  var has_scheme = !!this.Model.schema;

  this.execCallback('beforeAddRecords', records);

  if(this.Model.addRecords(records)){
    if(!this.has_scheme){
      this.initSearch(this.opts.search);
    }

    this.render(records);
    if(applyFilter !== false){
      this.filter();
    }
  }

  this.execCallback('afterAddRecords', records);
};

F.removeRecords = function(criteria){
  var ids;

  if($.isPlainObject(criteria)){
    ids = this.Model.where(criteria).pluck('_fid').all;
  }else if($.isArray(criteria)){
    ids = this.Model.where({'id.$in': criteria}).pluck('_fid').all;
  }

  if(!ids){
    return false;
  }

  var records = this.Model.records, 
      removedCount = 0,
      idsLength = ids.length,
      fid;

  for(var i = records.length - 1; i > -1; i--){
    fid = records[i]._fid

    if(ids.indexOf(fid) > -1){
      records.splice(i, 1);
      removedCount ++;

      $('#fjs_' + fid).remove();
    } 

    if(removedCount == idsLength){
      break;
    }
  }

  this.execCallback('afterRemove');

  return true;
};

var renderRecord = function(record, index){
  return this.templateFn(record);
};

F.render = function(records){
  var self = this, 
      ele, 
      cbName;

  if(!records.length){return; }

  this.execCallback('beforeRender', records);
  cbName = 'beforeRecordRender';

  $.each(records, function(i){
    self.execCallback(cbName, this);
    this._fid = (self._index++);
  
    if(!self.has_pagination){ 
      self.renderItem(this, i);
    }
  });
};

F.renderItem = function(record, i){
  if(!record){
    return;
  }

  var ele = this.view(record, i);

  if(typeof ele == 'string'){
    ele = $($.trim(ele));
  }

  ele.attr('id', 'fjs_' + record._fid).addClass('fjs_item');

  this.appendToContainer(ele, record);
};

var appendToContainer = function(html_ele, record){
  this.$container.append(html_ele);
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
  this.bindEvent(criteria.ele, criteria.event);

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

  if(index != null){
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

F.getSelectedValues = function(criteria, context){
  var vals = [];

  criteria.$ele.filter(criteria.selector).each(function() {
    vals.push($(this).val());
  });

  if($.isArray(vals[0])){
    vals = [].concat.apply([], vals);
  }

  if(criteria.all && vals.indexOf(criteria.all) > -1){
    return;
  }

  if(criteria.type == 'range'){
    vals = vals[0].split(criteria.delimiter || '-');
  }

  vals = this.parseValues(criteria.field, vals);

  return context.execCallback('onFilterSelect', {criteria: criteria, values: vals}) || vals;
};

F.lastResult = function(){
  return (this.last_result || this.records);
};

F.filter = function(){
  var query = {}, 
      vals, _q,
      count = 0,
      self = this,
      criteria;

  $.each(this.criterias, function(){
    if(this.active){
      vals = self.getSelectedValues(this, self);

      if(vals && vals.length){
        _q = ($.isArray(vals) && !this.type) ? (this._q + '.$in') : this._q;
        query[_q] = vals ;
        count = count + 1;
      }
    }
  });

  this.anyFilterSelected = count > 0;
  criteria = this.Model.where(query);
  this.execCallback('shortResult', criteria);
  this.last_result = criteria.all;

  if(this.searchFilter(this.last_result)){
    return query;
  }

  this.show(this.last_result);
  this.renderPagination(this.last_result.length);
  this.execCallback('afterFilter', this.last_result, JsonQuery.blankClone(this.Model, this.last_result));

  return query;
};

F.show = function(result, type){
  var i = 0, l = result.length;

  if(this.has_pagination){

    i = this.page.perPage *(this.page.currentPage - 1);
    l = i + this.page.perPage;

    this.$container.html("");

    for(i; i < l; i++){
      this.renderItem(result[i], i);
    }

    return;
  }

  $('.fjs_item').hide();

  for(i; i < l; i++){
    $('#fjs_' + result[i]._fid).show();
  }
  
};

F.filterTimer = function(timeout){
  var self = this;

  if (this.filterTimeoutId) {
    clearTimeout(this.filterTimeoutId);
  }

  this.filterTimeoutId = setTimeout(function() {
    self.filter();
  }, timeout);
};

F.bindEvent = function(ele, eventName){
  var self = this;

  $(document).on(eventName, ele, function(e){
    self.filterTimer(self.opts.timeout || 35);
  });

};

F.initSearch = function(opts){
  if(!opts || !opts.ele){
    return;
  }

  if(!opts.start_length){
    this.opts.search.start_length = 2
  }

  this.$search_ele = $(this.opts.search.ele);

  if(this.$search_ele.length){
    this.has_search = true;
    this.searchFn = this.buildSearchFn(opts.fields);
    this.bindEvent(opts.ele, 'keyup');
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

F.lastSearchResult = function(){
  if (this.search_text.length > this.opts.search.start_length){
    return this.search_result;
  }else{
    return this.lastResult();
  }
}

F.searchFilter = function(records) {
  if(!this.has_search){
    return;
  }

  var result;
  this.search_text =  $.trim(this.$search_ele.val());

  if (this.search_text.length < this.opts.search.start_length){
    return false;
  }

  result = this.search(this.search_text, records || this.lastResult());

  this.search_result = result;
  this.show(result);
  this.renderPagination(result.length)
  this.execCallback('afterFilter', result, JsonQuery.blankClone(this.Model, result));

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

F.clear = function(){
  if(this.opts.streaming){
    this.stopStreaming();
  }

  $.each(this.criterias, function(){
    $(document).off(this.event, this.ele);
  })

  if(this.opts.search){
    $(document).off('keyup', this.opts.search.ele);
  }

  if (this.filterTimeoutId) {
    clearTimeout(this.filterTimeoutId);
  }
}

F.initPagination = function(){
  var self = this,
  opts = this.opts.pagination;

  if(!opts.perPage){
    opts.perPage = {}
  }

  if(!opts.perPage.values){
    opts.perPage.values = [10, 20, 30];
  }

  this.page = { currentPage: 1, perPage: opts.perPage.values };

  this.paginator = new Paginator(this.lastResult().length, this.opts.pagination, function(currentPage, perPage){
    self.page = { currentPage: currentPage, perPage: perPage }

    if(self.has_search){
      self.show(self.lastSearchResult())
    }else{
      self.show(self.lastResult())
    }
  })

  this.filter();
};

F.renderPagination = function(totalCount){
  if(this.has_pagination){
    this.paginator.setRecordCount(totalCount);
  }
};

F.parseValues = function(field, values){
  var type = typeof this.Model.schema == 'undefined' ? 'String' : this.Model.schema[field];

  if(type == 'Number'){
    return $.map(values, function(v){ return Number(v) }); 
  }else if(type == 'Boolean'){
    return $.map(values, function(v){ return (v == 'true' || v == true) }); 
  }else{
    return values;
  }
};

F.setTemplate = function(template, rebuild) {
  this.templateFn = templateBuilder($(template).html());
  if(rebuild === true) {
    this.$container.empty();

    this.render(this.records);
    this.filter();
  }
};

