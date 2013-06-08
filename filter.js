/*
 * Filter.js
 * version: 1.5.1 (22/4/2013)
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013 Jiren Patel[ joshsoftware.com ]
 * 
 * Dependency:
 *  jQuery(v1.8 >=)
 */

(function(window) {

  'use strict';

  var FilterJS = function(data, container, view, options) {
    return new _FilterJS(data, container, view, options);
  };

  FilterJS.VERSION = '1.5.1';

  $.fn.filterjs = function(data, view, options) {
    var $this = $(this);
    if ($this.data('fjs')) return;
    $this.data('fjs', new _FilterJS(data, $this, view, options));
  };

  window.FilterJS = FilterJS;

  var _FilterJS = function(data, container, view, options) {
    var property_count = 0;

    this.data = data;
    this.view = view;
    this.container = container;
    this.options = options || {};
    this.categories_map = {}
    this.record_ids = [];

    if (this.data.constructor != Array) this.data = [this.data];

    for (name in this.data[0]){
      this.root = name;
      property_count += 1;
    }

    if (property_count == 1){
      this.getRecord = function(i, d){ return d[i][this.root]; }
    }else{
      this.getRecord = function(i, d){ return d[i]; }
      this.root = 'fjs';
    }

    this.render(this.data);
    this.parseOptions();
    this.buildCategoryMap(this.data);
    this.bindEvents();

    this.options.callbacks = this.options.callbacks || {};
    this.execCallBack('after_init', this.record_ids);
    this.options.filter_types = this.options.filter_types || {};

    if (!this.options.filter_types['range'])
      this.options.filter_types['range'] = this.rangeFilter;

    this.options.streaming = this.options.streaming || {};
    if (this.options.streaming.data_url){
      this.options.streaming.stream_after = (this.options.streaming.stream_after || 2)*1000;
      this.options.streaming.batch_size = this.options.streaming.batch_size || false;
      this.timer = this.setStreamingTimer();
    }
    
    return this;
  };

  _FilterJS.prototype = {

    //Render Html using JSON data
    render: function(data, offset) {
      var $container = $(this.container), record, el;

      if (!data) return;

      for (var i = 0, l = data.length; i < l; i++){
        record = this.getRecord(i, data);
        el = $(this.view(record));
        el.attr({id: this.root + '_' + record.id, 'data-fjs': true});
        el = $container.append(el);
      }
    },

    //Bind Events to filter html elements
    bindEvents: function() {
      var self = this, s = this.options.selectors, i = 0, l = s.length;

      for (i; i < l; i++){
        this.bindSelectorEvent(s[i], self);
      }

      if (this.options.search){
        $(this.options.search.input).on('keyup', function(e){
          self.filter();
        });
      }
    },

    bindSelectorEvent: function(selector, context) {
      $(selector.element).on(selector.events, function(e) {
        context.filter();
      });
    },

    //Unbind fileter events
    clear: function() {
      var s = this.options.selectors, i = 0, l = s.length;

      for (i; i < l; i++)
        $(s[i].element).off(s[i].events);

      if (this.options.search) $(this.options.search.input).off('keyup');

      this.category_map = null;
      this.record_ids = null;
    },

    //Find elements accroding to selection criteria.
    filter: function(){
      var result, s, selected_vals, records, selected_none = false, i = 0, l = this.options.selectors.length;

      for (i; i < l; i++){
        s = this.options.selectors[i];
	// Apply filter unless element's value is 'all'.
	// This approach is useful when we need a reset option (e.g. "All")
	// for a select box. If element's value matched as 'all', then it will
	// neither apply filter nor will give zero results for that value.
	if($(s.element).filter(s.select).val() != "all") {
	  selected_vals = $(s.element).filter(s.select).map(function() {
	    return $(this).val();
	  });

	  if (selected_vals.length) {
	    records = this.findObjects(selected_vals, this.categories_map[s.name], this.options.filter_types[s.type]);

	    result = $.grep((result || this.record_ids), function(v) {
	      return (records.indexOf(v) != -1);
	    });
	  }else{
	    selected_none = true;
	  }
        }
      }

      if (selected_none && this.options.and_filter_on) result = [];

      if (this.options.search) result = this.search(this.options.search, result);

      this.hideShow(result);

      this.execCallBack('after_filter', result);
    },

    //Compare and collect objects
    findObjects: function(category_vals, category_map, filter_type_func) {
      var r = [], ids, category_val, i = 0, l = category_vals.length;

      for (i; i < l; i++){
        category_val = category_vals[i];
        
        if (filter_type_func){
          ids = $.map(category_map, function(n,v){
            if (filter_type_func(category_val, v)) return n;
          });
        } else {
          ids = category_map.constructor == Array ? category_map : category_map[category_val];
        }

        if (ids) r = r.concat(ids);
      }

      return r;
    },

    //Make eval expresssion  to collect object from the json data.
    buildEvalString: function(field_map) {
      var fields = field_map.split('.ARRAY.'), eval_str, i = 1, l = fields.length;

      eval_str = fields[0];

      for (i; i < l; i++) {
        eval_str += ".filter_collect('" + fields[i] + "')";
      }

      return eval_str;
    },

    addFilterCriteria: function(name, criteria, ids_or_mapping) {
      this.categories_map[name] = {};

      var selector = this.parseSelectorOptions({name: name}, [criteria]);
      ids_or_mapping = ids_or_mapping || $(selector.element).data('ids') || [];

      this.options.selectors.push(selector);
      this.categories_map[name] = ids_or_mapping;

      this.bindSelectorEvent(selector, this);
    },

    //Create map accroding to selection criteria.
    parseOptions: function() {
      var filter_criteria = this.options.filter_criteria, selector, criteria, ele, ele_type;
      this.options.selectors = [];

      for (name in filter_criteria) {

        criteria = filter_criteria[name];
        selector = this.parseSelectorOptions({name: name}, criteria);

        this.options.selectors.push(selector);

        criteria.push(this.buildEvalString(criteria[1]));
        this.categories_map[name] = {};
      }
    },

    parseSelectorOptions: function(selector, criteria) {
      selector.element = criteria[0].split(/.EVENT.|.SELECT.|.TYPE./)[0];
      selector.events = (criteria[0].match(/.EVENT.(\S*)/) || [])[1];
      selector.select = (criteria[0].match(/.SELECT.(\S*)/) || [])[1];
      selector.type = (criteria[0].match(/.TYPE.(\S*)/) || [])[1];

      var ele = $(selector.element),
          ele_type = ele.attr('type');

      if (!selector.select){
        if (ele.get(0).tagName == 'INPUT'){
          if (ele_type == 'checkbox' || ele_type == 'radio'){
            selector.select = ':checked';
          }else if (ele_type == 'hidden'){
            selector.select = ':input';
          }
        }else if (ele.get(0).tagName == 'SELECT'){
           selector.select = 'select';
        }
      }

      if (!selector.events){
        if (ele_type == 'checkbox' ||ele_type == 'radio'){
          selector.events = 'click';
        }else if (ele_type == 'hidden' || ele.get(0).tagName == 'SELECT'){
          selector.events = 'change';
        }
      }

      return selector;
    },

    buildCategoryMap: function(data) {
      var filter_criteria = this.options.filter_criteria, record, categories, obj, x;

      for (var i = 0, l = data.length; i < l; i++){
        record = this.getRecord(i, data);
        this.record_ids.push(record.id);

        for (name in filter_criteria) {
          categories = eval('record.' + filter_criteria[name][2]);
          obj = this.categories_map[name];

          if (categories && categories.constructor == Array) {
            for (var j = 0, lj = categories.length; j < lj; j++){
              x = categories[j];
              obj[x] ? obj[x].push(record.id) : obj[x] = [record.id];
            }
          } else {
            obj[categories] ? obj[categories].push(record.id) : obj[categories] = [record.id];
          }
        }
      }
    },

    hideShow: function(ids) {
      var e_id = '#' + this.root + '_', i = 0, l = ids.length;

      $(this.container + ' > *[data-fjs]').hide();

      for (i; i < l; i++)
        $(e_id + ids[i]).show();
    },

    search: function(search_config, filter_result){
      var val = $.trim($(search_config.input).val());
          
      if (val.length < 2) return filter_result;

      var serach_in = search_config.serach_in;
      var id_prefix = '#' + this.root + '_';
      val = val.toUpperCase();

      return $.map(filter_result, function(id){
        var $ele = $(id_prefix + id);

        if (serach_in) $ele = $ele.find(serach_in); 

        if ($ele.text().toUpperCase().indexOf(val) >= 0) return id;
      });
    },

    execCallBack: function(type, result){
      if(this.options.callbacks[type]) 
        this.options.callbacks[type].call(this, result)
    },

    rangeFilter: function(category_value, v){
      var range = category_value.split('-');

      if (range.length == 2){
        if (range[0] == 'below') range[0] = -Infinity;
        if (range[1] == 'above') range[1] = Infinity;
        if (Number(v) >= range[0] && Number(v) <= range[1]){
          return true;
        }
      }
    },

    //Collect Records by id array
    getRecordsByIds: function(ids){
      var records = [], r, i = 0, l = this.data.length;

      for (i; i < l; i++){
        r = this.getRecord(i, this.data);
        if (ids.indexOf(r.id) != -1) records.push(r)
      }

      return records; 
    },

    addData: function(data){
      var i = 0, l = data.length, r, uniq_data = [], e_id = '#' + this.root + '_';

      this.execCallBack('before_add', data)

      for (i, l; i < l; i++){
        r = this.getRecord(i, data);
        if ($(e_id + r.id).length == 0) uniq_data.push(data[i]);
      }

      if (uniq_data.length){
        this.data = this.data.concat(uniq_data);
        this.render(uniq_data);
        this.buildCategoryMap(uniq_data);
      }

      this.execCallBack('after_add', data)
      this.filter();
    },

    setStreamingTimer: function(){
      var self = this, 
          timer_func = this.options.streaming.batch_size ? setInterval : setTimeout;

      return timer_func(function(){
        self.streamData();
      }, this.options.streaming.stream_after);
    },

    clearStreamingTimer: function(){
      if (this.timer) clearTimeout(this.timer);
    },

    streamData: function(){
      var self = this, 
          params = this.options.params || {},
          opts = this.options.streaming;

      params['offset'] = this.data.length;

      if (opts.batch_size) params['limit'] = opts.batch_size;
      if (this.options.search) params['q'] = $.trim($(this.options.search.input).val()); 

      $.getJSON(opts.data_url, params).done(function(data){
        (data && data.length > 0) ? self.addData(data) : clearTimeout(self.timer)
      });
    }

}


})(this);

/**
 * Recursive method to collect object from json object.
 * i.e. test =  [ {"deal": {"id": 1 }}, {"deal": {"id": 2}}]
 *  - to collect id from the json data
 *    test.filter_collect('deal').filter_collect('id')
 *    this will return [1,2]
 */
Array.prototype.filter_collect = function(field, arr) {
  var arr = arr || [];
  for (var i = 0, l = this.length; i < l; i++){
    var obj = this[i];
    if (obj.constructor == Array){
      obj.filter_collect(field, arr);
    }
    else {
      arr.push(obj[field]);
    }
  }

  return arr;
};

//In IE indexOf method not define.
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) { return i; }
    }
    return -1;
  }
}
