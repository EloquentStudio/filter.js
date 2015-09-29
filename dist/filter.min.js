/*
 * filter.js
 * 2.1.0 (2015-09-27)
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Copyright 2011-2015 Jiren Patel[jirenpatel@gmail.com]
 *
 * Dependency:
 *  jQuery(v1.9 >=)
 */
 
 /*
 * JsonQuery
 * 0.0.2 (2015-08-06)
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Copyright 2011-2015 Jiren Patel[jirenpatel@gmail.com]
 *
 */
 
 (function(window) {

  'use strict';

  var JsonQuery = function(records, opts){
    return new _JsonQuery(records, opts || {});
  };

  window.JsonQuery = JsonQuery;

  JsonQuery.VERSION = '0.0.2'

  JsonQuery.Config = {
    id: 'id',
    latitude: 'latitude',
    longitude: 'longitude',
    date_regx: /^\d{4}-\d{2}-\d{2}$/ 
  }

 JsonQuery.blankClone = function(jq, records){
   return new _JsonQuery(records, {
     getterFns: jq.getterFns,
     schema: jq.schema,
     id: jq.id,
     latitude: jq.latitude, 
     longitude: jq.longitude
   })
 }

  var Config = JsonQuery.Config;

  var each = function(objs, callback, context){
    if (objs.length === +objs.length) {
      for (var i = 0, l = objs.length; i < l; i++) {
        callback.call(context, objs[i], i);
      }
    }else{
      for (var key in objs) {
        if (hasOwnProperty.call(objs, key)) {
          callback.call(context, objs[key], key);
        }
      }
    }
  };
  
  var eachWithBreak = function(objs, callback, context){
    for (var i = 0, l = objs.length; i < l; i++) {
      if(callback.call(context, objs[i], i) === false){
        return;
      }
    }
  };
  

  var _JsonQuery = function(records, opts){
    this.records = records || [];
    this.getterFns = opts.getterFns || {};
    this.lat = opts.latitude || Config.latitude;
    this.lng = opts.longitude || Config.longitude;
    this.id  = opts.id;
  
    if(opts.schema){
      this.schema = opts.schema;
    }
  
    if(this.records.length && !this.schema){
      initSchema(this, records[0], opts.schema);
    }
  };
  
  var JQ = _JsonQuery.prototype;
  
  var initSchema = function(context, record, hasSchema){
    context.schema = {};
  
    if(!context.id){
      context.id = record._id ? '_id' : Config.id;
    }
  
    if(!hasSchema){
      buildSchema.call(context, record);
      buildPropGetters.call(context, record);
    }
  };
  
  var getDataType = function(val){
    if(val == null){
      return 'String';
    }
  
    /*
     * @info Fix for IE 10 & 11
     * @bug Invalid calling object
     */
    var type = Object.prototype.toString.call(val).slice(8, -1);
  
    if(type == 'String' && val.match(Config.date_regx)){
      return 'Date';
    }
  
    return type;
  };
  
  var parseValue = function(type, value){
    if(!value && value != 0){
      return value;
    }
  
    if(type == 'String'){
      return String(value);
    }else if(type == 'Number'){
      return Number(value)
    }else if(type == 'Boolean'){
      return (value == 'true' || value == true || value == '1') ? true : false;
    }else if(type == 'Date'){
      return new Date(value)
    }else{
      return value
    }
  }
  
  var buildSchema = function(obj, parentField){
    var field, dataType, fullPath, fieldValue;
  
    for(field in obj){
      fieldValue = obj[field];
      dataType = getDataType(fieldValue);
  
      fullPath = parentField ? (parentField + '.' + field) : field;
      this.schema[fullPath] = dataType;
  
      if(dataType == 'Object'){
        buildSchema.call(this, fieldValue, fullPath);
      }else if(dataType == 'Array'){
  
        if(['Object', 'Array'].indexOf(getDataType(fieldValue[0])) > -1){
          buildSchema.call(this, obj[field][0], fullPath);
        }else{
          this.schema[fullPath] = getDataType(fieldValue[0]);
        }
      }
    }
  };
  
  var parseDate = function(dates){
    if(dates.constructor.name == 'Array'){
      return dates.map(function(d){  return (d ? new Date(d) : null ) });
    }
    return (dates ? new Date(dates) : null);
  };
  
  var buildPropGetters = function(record){
    var selector, type, val;
  
    for(selector in this.schema){
      type = this.schema[selector];
  
      try{
        if(!this.getterFns[selector]){
          this.getterFns[selector] = buildGetPropFn.call(this, selector, type);
        }
  
        //Remap if it is array
        val = this.getterFns[selector](record);
        if(getDataType(val) == 'Array'){
          this.schema[selector] = 'Array';
        }
      }catch(err){
        console.log("Error while generating getter function for selector : " + selector + " NOTE: Define manually");
      }
    }
  };
  
  var countArrHierarchy = function(schema, nestedPath){
    var lastArr = 0,
        arrCount = 0,
        path,
        pathLength = nestedPath.length - 1;
  
    for(var i = nestedPath.length - 1; i >= 0; i--){
      path = nestedPath.slice(0, i + 1).join('.');
  
      if(schema[path] == 'Array' && i < pathLength){
        lastArr = i;
        arrCount = arrCount + 1;
      }
    }
    return (arrCount > 1 ? (lastArr  + 1) : -1);
  };
  
  var buildGetPropFn = function(field, type){
    var accessPath = '',
        nestedPath = field.split('.'),
        path,
        lastArr = countArrHierarchy(this.schema, nestedPath),
        prefix,
        accessFnBody;
  
    for(var i = nestedPath.length - 1; i >= 0; i--){
      path = nestedPath.slice(0, i + 1).join('.');
      prefix = "['" + nestedPath[i] +"']";
  
      if(this.schema[path] == 'Array'){
        if(lastArr == i){
          accessPath = prefix + (accessPath.length ? ".every(function(r" + i +"){  objs.push(r" + i + accessPath + ")})" : '');
        }else{
          accessPath = prefix + (accessPath.length ? ".map(function(r" + i +"){  return r" + i + accessPath + "})" : '');
        }
      }else{
        accessPath = prefix + accessPath;
      }
    }
  
    if(lastArr > -1){
      accessFnBody = 'var objs = []; obj' + accessPath + ';' + (this.schema['path'] == 'Date' ?  'return parseDate(objs)'  :  'return objs;');
    }else{
      accessFnBody = 'return ' + (this.schema['path'] == 'Date' ? 'parseDate(obj'+ accessPath +');' : 'obj'+ accessPath +';') ;
    }
  
    return new Function('obj', accessFnBody);
  };
  
  JQ.operators = {
    eq: function(v1, v2){ return v1 == v2},
    ne: function(v1, v2){ return v1 != v2},
    lt: function(v1, v2){ return v1 < v2},
    lte: function(v1, v2){ return v1 <= v2},
    gt: function(v1, v2){ return v1 > v2},
    gte: function(v1, v2){ return v1 >= v2},
    in: function(v1, v2){ return v2.indexOf(v1) > -1},
    ni: function(v1, v2){ return v2.indexOf(v1) == -1},
    li: function(v, regx) { return regx.test(v)},
    bt: function(v1, v2){ return (v1 >= v2[0] && v1 <= v2[1])}
  };
  
  JQ.addOperator = function(name, fn){
    this.operators[name] = fn;
  };
  
  // rVal = Record Value
  // cVal = Condition Value
  var arrayMatcher = function(rVal, cVal, cFn){
     var i = 0, l = rVal.length;
  
     for(i; i < l; i++){
       if(cFn(rVal[i], cVal)) return true;
     }
  };
  
  JQ.addCondition = function(name, func){
    this.operators[name] = func;
  };
  
  JQ.getCriteria = function(criteria){
    var fieldCondition = criteria.split('.$');
  
    return {
      field: fieldCondition[0],
      operator: fieldCondition[1] || 'eq'
    };
  };
  
  JQ.setGetterFn = function(field, fn){
    this.getterFns[field] = fn;
  };
  
  JQ.addRecords = function(records){
    if(!records || !records.length){
      return false;
    }
  
    if(getDataType(records) == 'Array'){
      this.records = this.records.concat(records);
    }else{
      this.records.push(records);
    }
  
    if(!this.schema){
      initSchema(this, records[0]);
    }
  
    return true;
  };
  
  JQ._findAll = function(records, qField, cVal, cOpt){
    var result = [],
        cFn,
        rVal,
        qFn = this.getterFns[qField], arrayCFn;
  
    if(cOpt == 'li' && typeof cVal == 'string'){
      cVal = new RegExp(cVal);
    }
  
    cFn = this.operators[cOpt];
  
    if(this.schema[qField] == 'Array'){
      arrayCFn = cFn;
      cFn = arrayMatcher;
    }
  
    each(records, function(v){
      rVal = qFn(v);
  
      if(cFn(rVal, cVal, arrayCFn)) {
        result.push(v);
      }
    });
  
    return result;
  };
  
  JQ.find = function(field, value){
    var result, qFn;
  
    if(!value){
      value = field;
      field = this.id;
    }
  
    qFn = this.getterFns[field];
  
    eachWithBreak(this.records, function(r){
      if(qFn(r) == value){
        result = r;
        return false;
      }
    });
  
    return result;
  };
  
  each(['where', 'or', 'groupBy', 'select', 'pluck', 'limit', 'offset', 'order', 'uniq', 'near'], function(c){
    JQ[c] = function(query){
      var q = new Query(this, this.records);
      q[c].apply(q, arguments);
      return q;
    };
  });
  
  each(['update_all', 'destroy_all'], function(c){
    JQ[c] = function(query){
      var q = new Query(this, this.records);
      return q[c].apply(q, arguments);
    };
  });
  
  each(['count', 'first', 'last', 'all'], function(c){
    Object.defineProperty(JQ, c, {
      get: function(){
        return (new Query(this, this.records))[c];
      }
    });
  });
  
  var compareObj = function(obj1, obj2, fields){
    for(var i = 0, l = fields.length; i < l; i++){
      if(this.getterFns[fields[i]](obj1) !== this.getterFns[fields[i]](obj2)){
        return false;
      }
    }
  
    return true;
  };
  
  var execWhere = function(query, records){
    var q, criteria, result;
  
    for(q in query){
      criteria = this.jQ.getCriteria(q);
      result = this.jQ._findAll(result || records, criteria.field, query[q], criteria.operator);
    }
  
   return result;
  };
  
  var execGroupBy = function(field, records){
    var fn = this.jQ.getterFns[field], v, result = {}, i = 0, l = records.length;
  
    each(records, function(r){
      v = fn(r);
      (result[v] || (result[v] = [])).push(r);
    });
  
    return result;
  };
  
  var execOrder = function(orders, records){
    var fn,
        direction,
        _records = records.slice(0);
  
    for(var i = 0, l = orders.length; i < l; i++){
      fn = this.jQ.getterFns[orders[i].field],
        direction = orders[i].direction == 'asc' ? 1 : -1;
  
      _records.sort(function(r1,r2){
        var a = fn(r1), b = fn(r2);
  
        return (a < b ? -1 : a > b ? 1 : 0)*direction;
      })
    }
  
    return _records;
  };
  
  var execSelect = function(fields, records){
    var self = this, result = [], getFn;
  
    each(fields, function(f){
      getFn = self.jQ.getterFns[f];
  
      each(records, function(r, i){
        (result[i] || (result[i] = {}))[f] = getFn(r);
      });
    });
  
    return result;
  };
  
  var execPluck = function(field, records){
    var getFn = this.jQ.getterFns[field], result = [];
  
    each(records, function(r){
      result.push(getFn(r));
    });
  
    return result;
  };
  
  var execUniq = function(fields, records){
    var result = [], self = this;
  
    if(getDataType(records[0]) != 'Object'){
      each(records, function(r){
        if(result.indexOf(r) == -1){
          result.push(r);
        }
      });
  
      return result;
    }
  
    result.push(records[0]);
  
    each(records, function(r){
      var present = false;
  
      for(var i = 0, l = result.length; i < l; i++){
        if(compareObj.call(self.jQ, result[i], r, fields)){
          present = true;
        }
      }
  
      if(!present){
        result.push(r);
      }
    });
  
    return result;
  };
  
  

  var Query = function(jQ, records){
    this.jQ = jQ;
    this.records = records;
    this.criteria = {};
    return this;
  };
  
  var Q = Query.prototype;
  
  Q.each = function(callback, context){
    each(this.exec() || [], callback, context)
  };
  
  Q.exec = Q.toArray = function(callback){
    var result, c;
  
    if(this.criteria['all']){
      result = this.records;
    }
  
    if(this.criteria['where']){
      result = execWhere.call(this, this.criteria['where'], result || this.records);
    }
  
    if(this.criteria['or']){
      result = result.concat(execWhere.call(this, this.criteria['or'], this.records));
      result = execUniq.call(this, [this.jQ.id], result);
    }
  
    if(this.criteria['order']){
      result = execOrder.call(this, this.criteria['order'], result || this.records);
    }
  
    if(this.criteria['near']){
      result = execNear.call(this, this.criteria['near'], result || this.records);
    }
  
    if(this.criteria['uniq']){
      result = execUniq.call(this, this.criteria['uniq'], result || this.records);
    }
  
    if(this.criteria['select']){
      result = execSelect.call(this, this.criteria['select'], result || this.records);
    }
  
    if(this.criteria['pluck']){
      result = execPluck.call(this, this.criteria['pluck'], result || this.records);
    }
  
    if(this.criteria['limit']){
      result = (result || this.records).slice(this.criteria['offset'] || 0, (this.criteria['offset'] || 0) + this.criteria['limit']);
    }
  
    if(this.criteria['group_by']){
      result = execGroupBy.call(this, this.criteria['group_by'], result || this.records);
    }
  
    if(!result){
      result = this.records;
    }
  
    if(callback){
      each(result, callback);
    }
  
    if(this.jQ.onResult){
      this.jQ.onResult(result, this.criteria);
    }
  
    return result;
  }
  
  var addToCriteria = function(type, query){
    var c;
  
    if(!this.criteria[type]){
      this.criteria[type] = {};
    }
  
    for(c in query){
      this.criteria[type][c] = query[c];
    }
  
    return this;
  };
  
  Q.where = function(query){
    return addToCriteria.call(this, 'where', query);
  };
  
  Q.or = function(query){
    return addToCriteria.call(this, 'or', query);
  };
  
  Q.groupBy = function(field){
    this.criteria['group_by'] = field;
    return this;
  };
  
  Q.select = function(){
    this.criteria['select'] = arguments;
    return this;
  };
  
  Q.pluck = function(field){
    this.criteria['pluck'] = field;
    return this;
  };
  
  Q.limit = function(l){
    this.criteria['limit'] = l;
    return this;
  };
  
  Q.offset = function(o){
    this.criteria['offset'] = o;
    return this;
  };
  
  Q.order = function(criteria){
    var field;
    this.criteria['order'] = this.criteria['order'] || [];
  
    for(field in criteria){
      this.criteria['order'].push({field: field, direction: criteria[field].toLowerCase()});
    }
  
    return this;
  };
  
  Q.uniq = function(){
    this.criteria['uniq'] = (arguments.length > 0 ? arguments : true);
    return this;
  };
  
  Object.defineProperty(Q, 'count', {
    get: function(){
      this.criteria['count'] = true;
      var r = this.exec();
  
      if(getDataType(r) == 'Array'){
        return this.exec().length;
      }else{
        return Object.keys(r).length;
      }
    }
  });
  
  Object.defineProperty(Q, 'all', {
    get: function(){
      this.criteria['all'] = true;
      return this.exec();
    }
  });
  
  Object.defineProperty(Q, 'first', {
    get: function(){
      this.criteria['first'] = true;
      return this.exec()[0];
    }
  });
  
  Object.defineProperty(Q, 'last', {
    get: function(){
      this.criteria['last'] = true;
      var r = this.exec();
      return r[r.length - 1];
    }
  });
  
  //Geocoding
  var GEO = {
    redius: 6371,
    toRad: function(v){
      return v * Math.PI / 180;
    }
  };
  
  var calculateDistance = function(lat1, lat2, lng1, lng2){
    var dLat = GEO.toRad(lat2 - lat1),
        dLon = GEO.toRad(lng2 - lng1),
        lat1 = GEO.toRad(lat1),
        lat2 = GEO.toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  
    return (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))) * GEO.redius;
  };
  
  var execNear = function(opts, records){
    var result = [],
        self = this,
        unit_c = opts.unit == 'mile' ? 0.6214 : 1,
        latFn = self.jQ.getterFns[self.jQ.lat],
        lngFn = self.jQ.getterFns[self.jQ.lng];
  
    each(records, function(r){
      r._distance = calculateDistance(latFn(r), opts.lat, lngFn(r), opts.lng) * unit_c;
  
      if(r._distance <= opts.distance){
        result.push(r);
      }
    });
  
    result.sort(function(a, b){
      return (a._distance < b._distance ? -1 : a._distance > b._distance ? 1 : 0);
    })
  
    return result;
  };
  
  Q.near = function(lat, lng, distance, unit){
    this.criteria['near'] = {lat: lat, lng: lng, distance: distance, unit: (unit || 'km')};
    return this;
  };
  
  //Helpers
  Q.map = Q.collect = function(fn){
    var result = [], out;
  
    this.exec(function(r){
      if(out = fn(r)){
        result.push(out);
      }
    })
    return result;
  };
  
  Q.sum = function(field){
    var result = 0,
        group,
        getFn = this.jQ.getterFns[field];
  
    if(this.criteria['group_by']){
      group = true;
      result = {};
    }
  
    this.exec(function(r, i){
      if(group){
        result[i] = 0;
  
        each(r, function(e){
          result[i] = result[i] + (getFn(e) || 0);
        })
      }else{
        result = result + (getFn(r) || 0);
      }
    });
  
    return result;
  };
  
  Q.toJQ = function(){
    var q = JsonQuery(this.all, {schema: true});
    q.schema = this.jQ.schema;
    q.getterFns = this.jQ.getterFns;
  
    return q;
  };
  
  Q.destroy_all = Q.destroy = function(){
    var marked_records = this.all;
  
    each(marked_records, function(r, i){
      r._destroy_ = true;
    });
  
    this.records = this.jQ.records = this.records.filter(function(r){
      return !r._destroy_; 
    });
  
    return marked_records;
  };
  
  Q.update_all = Q.update = function(attrs){
    if(!attrs){
      return false;
    }
  
    var updated_count = 0;
  
    each(this.all, function(r){
      each(attrs, function(value, key){
        r[key] = value;
      });
      updated_count = updated_count + 1;
    });
    
    return updated_count;
  };
  

  //In IE 8 indexOf method not define.
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) { return i; }
      }
      return -1;
    }
  }
  
  if(!Object.defineProperty){
    Object.defineProperty = function(obj, name, opts){
      obj[name] = opts.get
    }
  }
  
  


})(this);

;(function($, window, document) {

  "use strict";

  
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
  
  function templateBuilder(str, data) {
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
  

  function each (objs, callback, context){
    for (var i = 0, l = objs.length; i < l; i++) {
      callback.call(context, objs[i], i);
    }
  }
  

  var FJS = function(records, container, options) {
    var self = this;
  
    this.opts = options || {};
    this.callbacks = this.opts.callbacks || {};
    this.$container = $(container);
    this.view = this.opts.view || renderRecord;
    this.templateFn = templateBuilder($(this.opts.template).html());
    this.criterias = [];
    this._index = 1;
    this.appendToContainer = this.opts.appendToContainer || appendToContainer;
    this.has_pagination = !!this.opts.pagination;
    this.search_text = '';
    this.anyFilterSelected = false;
  
    $.each(this.opts.criterias || [], function(){
      self.addCriteria(this);
    });
  
    this.Model = JsonQuery();
    this.Model.getterFns['_fid'] = function(r){ return r['_fid'];};
    this.addRecords(records, false);
  
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
    criteria = count ? this.Model.where(query) : this.Model;
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
    var type = this.Model.schema[field];
  
    if(type == 'Number'){
      return $.map(values, function(v){ return Number(v) }); 
    }else if(type == 'Boolean'){
      return $.map(values, function(v){ return (v == 'true' || v == true) }); 
    }else{
      return values;
    }
  };
  

  var Paginator = function(recordsCount, opts, onPagination) {
    var paginationView;
  
    this.recordsCount = recordsCount;;
    this.opts = opts;
    this.$container = $(this.opts.container);
  
    if(this.opts.paginationView){
      paginationView = $(this.opts.paginationView).html();
    } else {
      paginationView = views.pagination;
    }
  
    this.paginationTmpl = templateBuilder(paginationView);
  
    this.currentPage = 1;
    this.onPagination = onPagination;
    this.initPerPage();
    this.render();
    this.bindEvents();
  };
  
  var P = Paginator.prototype;
  
  P.bindEvents = function(){
    var self = this;
  
    $(this.opts.container).on('click', '[data-page]', function(e){
      self.setCurrentPage($(this).data('page'));
      e.preventDefault();
    });
  };
  
  P.totalPages = function(){
    return Math.ceil(this.recordsCount/this.perPageCount);
  };
  
  P.setCurrentPage = function(page){
    page = this.toPage(page)
    this.prevCurrentPage = this.currentPage;
    this.currentPage = page;
    this.paginate(page);
  };
  
  P.setRecordCount = function(total){
    this.recordsCount = total;
    this.setCurrentPage(this.currentPage);
  }
  
  P.toPage = function(page){
    if(page == 'first'){
      return 1;
    }
  
    if(page == 'last'){
      return this.totalPages();
    }
  
    if(page == 'next'){
      var next_page = this.currentPage + 1;
      return (next_page > this.totalPages() ? this.currentPage : next_page);
    }
  
    if(page == 'prev'){
      var prev_page = this.currentPage - 1;
      return (prev_page <= 0 ? this.currentPage : prev_page);
    }
    
    return parseInt(page);
  };
  
  P.paginate = function(page){
    this.render();
    this.onPagination(this.currentPage, this.perPageCount);
  };
  
  P.render = function(){
    var pages  = this.getPages();
  
    if(this.currentPage > pages.totalPages){
      this.currentPage = pages.totalPages;
    }
  
    if(this.currentPage == 0){
      this.currentPage = 1;
    }
  
    pages.currentPage = this.currentPage;
    this.$container.html(this.paginationTmpl(pages))
  };
  
  function makePageArray(start, end){
    var i = start, pages = [];
  
    for(i; i <= end; i++){
      pages.push(i);
    }
    
    return pages;
  }
  
  P.getPages = function () {
    var total = this.totalPages();
      
    if(!this.opts.visiblePages){
      return { totalPages: total, pages: makePageArray(0, total), self: this };
    }
  
    var half = Math.floor(this.opts.visiblePages / 2);
    var start = this.currentPage - half + 1 - this.opts.visiblePages % 2;
    var end = this.currentPage + half;
  
    // handle boundary case
    if (start <= 0) {
      start = 1;
      end = this.opts.visiblePages;
    }
  
    if (end > total) {
      start = total - this.opts.visiblePages;
  
      if(start <= 0){
        start = 1;
      }
  
      end = total; 
    }
  
    return { currentPage: this.currentPage, totalPages: total, pages: makePageArray(start, end), self: this };
  },
  
  P.initPerPage = function(){
    var opts = this.opts.perPage,
        template,
        html,
        ele,
        event_type,
        self = this;
  
    this.perPageCount = opts.values[0];
  
    template = opts.perPageView ? $(opts.perPageView).html() : views.per_page;
    html = templateBuilder(template)({ values: opts.values });
    $(opts.container).html(html);
  
    ele = $(opts.container).find('[data-perpage]')
    event_type = ele.get(0).tagName == 'SELECT' ? 'change' : 'click';
  
    $(opts.container).on(event_type, '[data-perpage]', function(e){
      var value = parseInt($(this).val() || $(this).data('value'));
      self.setPerPage(value)
      e.preventDefault();
    });
  };
  
  P.setPerPage = function(value){
    this.perPageCount = value;
    this.setCurrentPage(this.currentPage);
  }
  

  $.fn.filterjs = function(records, options) {
    var $this = $(this);
  
    if (!$this.data('fjs')){
      $this.data('fjs', FilterJS(records, $this, options));
    }
  };
  
  


  var list = [];
  var views = [];
  var FilterJS = function(records, container, options) {
    var fjs = new FJS(records, container, options);
    list.push(fjs);

    return fjs;
  };

  FilterJS.list = list;
  FilterJS.templateBuilder = templateBuilder;

  window.FilterJS = FilterJS;

  views['pagination'] = '<nav>  <ul class="pagination">    <% if(currentPage > 1) { %>      <li> <a href="#" data-page="first" aria-label="First"><span aria-hidden="true">First</span></a> </li>      <li><a href="#" data-page="prev" aria-label="Previous"><span aria-hidden="true">&larr; Previous</span></a></li>    <% } %>    <% for(var i = 0, l = pages.length; i < l; i++ ){ %>      <li class="<%= pages[i] == currentPage ? \'active\' : \'\' %>">        <a href="#" data-page="<%= pages[i] %>"><%= pages[i] %></a>      </li>    <% } %>    <% if( currentPage < totalPages ) { %>      <li><a href="#" data-page="next" aria-label="Next"><span aria-hidden="true">Next &rarr;</span></a></li>      <li><a href="#" data-page="last" aria-label="Last"><span aria-hidden="true">Last</span></a></li>    <% } %>  </ul></nav>'; 
  views['per_page'] = '<select size="1" name="per_page" data-perpage="true" class="per-page">  <% for(var i = 0; i < values.length; i++ ){ %>    <option value="<%= values[i] %>"><%= values[i] %></option>  <% } %></select>'; 

  /*
   * Find html tag and parse options for filter
   */
  function getElementWithOptions(name, hasMany){
    var attr  = "fjs-"+ name;
    var $eles = $("[" + attr + "]");
    var options = []; 
  
    if(!$eles.length){
      return;
    }
  
    $.each($eles, function(){
      var $ele = $(this);
      var option = { ele: $ele };
      var optionStr = $ele.attr(attr);
  
      options.push(option);
  
      if(!optionStr){
        return options;
      }
  
      $.each(optionStr.split(','), function(i, opt){
        var kv = opt.split("=");
        option[kv[0]] = kv[1];
      })
    })
  
    return hasMany ? options : options[0];
  };
  
  FilterJS.auto = function(records, callbacks){
    var options = {};
    var container = getElementWithOptions("items");
    var fjs,
        search, 
        template,
        criterias;
    
    if(!container || !container.template){
      return;
    }
  
    options.template = container.template
    search = getElementWithOptions("search");
    
    if(search){
      if(search.fields){
        search.fields = search.fields.split(',');
      }
      options.search = search;
    }
  
    if(callbacks){
      options.callbacks = callbacks;
    }
  
    fjs = FilterJS(records, container.ele, options) 
  
    criterias = getElementWithOptions("criteria", true);
  
    if(criterias){
      fjs.addCriteria(criterias);
    }
  
    return fjs
  };
  
  


})( jQuery, window , document );
