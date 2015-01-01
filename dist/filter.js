/*
 * filter.js
 * 2.0.0 (2015-01-01)
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
 * version: 0.0.2 (15/8/2014)
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014 Jiren Patel[jirenpatel@gmail.com]
 *
 */

(function(window) {

  'use strict';

  var JsonQuery = function(records, opts){
      return new _JsonQuery(records, opts || {});
  };

  window.JsonQuery = JsonQuery;

  JsonQuery.VERSION = '0.0.2'

  function log(obj){
    if(console && console.log){
      console.log(obj);
    }
  }

  if(!Object.defineProperty){
    Object.defineProperty = function(obj, name, opts){
      obj[name] = opts.get
    }
  }

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
    this.lat = opts.latitude || 'latitude';
    this.lng = opts.longitude || 'longitude'
    this.id = opts.id;

    if(this.records.length){
      initSchema(this, records[0], opts.schema);
    }
  };

  var JQ = _JsonQuery.prototype;

  var initSchema = function(context, record, hasSchema){
    context.schema = {};

    if(!context.id){
      context.id = record._id ? '_id' : 'id';
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

    if(type == 'String' && val.match(/\d{4}-\d{2}-\d{2}/)){
      return 'Date';
    }

    return type;
  };

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

  var buildGetPropFnOld = function(field, type){
    var i = 0, nestedPath, accessPath = "", accessFnBody, map;

    nestedPath = field.split('.');

    for(i = nestedPath.length - 1; i >= 0; i--){
      var last = nestedPath[i];
      var parentField = nestedPath.slice(0, i).join('.');

      if(this.schema[parentField] == 'Array'){
        accessPath = accessPath + ".map(function(r){ return r['" + last +"']})"
      }else{
        accessPath = "['" + last +"']"  + accessPath
      }
    }

    if(type == 'Date'){
      accessFnBody = 'var v = obj'+ accessPath +';  return (v ? new Date(v) : null);' ;
    }else{
      accessFnBody = 'return obj'+ accessPath +';' ;
    }

    return new Function('obj', accessFnBody);
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
          accessPath = prefix + (accessPath.length ? ".map(function(r" + i +"){  objs.push(r" + i + accessPath + ")})" : '');
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

    if(callback){
      each(result || this.records, callback);
    };

    if(!result){
      result = this.records;
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

})(this);

//In IE indexOf method not define.
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) { return i; }
    }
    return -1;
  }
}

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
  

  var FilterJS = function(records, container, options) {
    var fjs = new FJS(records, container, options);
    FilterJS.list.push(fjs);
  
    return fjs;
  };
  
  FilterJS.VERSION = '2.0.0';
  FilterJS.list = [];
  
  window.FilterJS = FilterJS;
  
  var FJS = function(records, container, options) {
    var self = this;
  
    this.opts = options || {};
    this.callbacks = this.opts.callbacks || {};
    this.$container = $(container);
    this.view = this.opts.view || renderRecord;
    this.templateFn = templateBuilder($.trim($(this.opts.template).html()));
    this.criterias = [];
    this._index = 1;
  
    $.each(this.opts.criterias || [], function(){
      self.addCriteria(this);
    });
  
    this.Model = JsonQuery();
    this.Model.getterFns['_fid'] = function(r){ return r['_fid'];};
  
    if(this.opts.pagination){
      this.initPaginator(this.opts.pagination);
    }
  
    this.addRecords(records);
  };
  
  var F = FJS.prototype;
  
  Object.defineProperty(F, 'records', {
    get: function(){ return this.Model.records; }
  });
  
  Object.defineProperty(F, 'recordsCount', {
    get: function(){ return this.Model.records.length; }
  });
  
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
    if(!records || !records.length){
      return;
    }
  
    this.execCallback('beforeAddRecords', records);
  
    if(this.Model.addRecords(records)){
      if(!this.Model.schema){
        this.initSearch(this.opts.search);
      }
  
      this.render(records);
      this.filter();
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
    var cName = 'beforeRecordRender',
        idAttr = 'id',
        css = 'fjs_item',
        ele,
        self = this;
  
    this.execCallback('beforeRender', records);
  
    records.forEach(function(r, i){
      self.execCallback(cName, r);
      r._fid =  (self._index++);
  
      ele = $(self.view(r, i));
      ele.attr(idAttr, 'fjs_' + r._fid);
      ele.addClass(css);
      self.$container.append(ele);
    })
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
  F.show = function(result){
    var offset = this.renderPagination(result.length);
    
    $('.fjs_item').hide();
  
    for(var i = offset.start; i < offset.end; i++){
      $('#fjs_' + result[i]._fid).show();
    }
  };
  
  //Search
  var bindSearchEvent = function(searchBox, timeout, context){
    $('body').on('keyup', searchBox, function(e){
      if (context.searchTimeoutId) {
        clearTimeout(context.searchTimeoutId);
      }
      context.searchTimeoutId = setTimeout(function() {
        context.filter();
      }, timeout);
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
      bindSearchEvent(opts.ele, opts.timeout || 0, this);
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
  
  F.initPaginator = function(){
    var self = this;
  
    this.paginator = new Paginator(this.opts.pagination, function(offset){
      self.show(self.lastResult(), offset);
    });
  };
  
  F.renderPagination = function(recordsCount){
    if(this.paginator){
      return this.paginator.render(recordsCount);
    }
      
    return {start: 0, end: recordsCount};
  };
  

  function Paginator(opts, filterCallback) {
    this.opts = $.extend({
      inner_window: 0,
      outer_window: 0,
      left: 0,
      right: 0
    }, opts);
  
    this.opts.window = this.opts.window || this.opts.inner_window || 3;
    this.opts.left = this.opts.left || this.opts.outer_window;
    this.opts.right = this.opts.right || this.opts.outer_window;
  
    this.opts.per_page = this.opts.per_page || {};
    this.opts.per_page.values = [].concat(this.opts.per_page.values || [20, 30, 50]);
    this.perPage = this.opts.per_page.values[0];
  
    this.currentPage = 1;
    this.lastCurrentPage = null;
    this.initTemplates();
    this.$container = $(this.opts.container);
    this.bindEvents(filterCallback); 
  }
  
  var P = Paginator.prototype;
  
  P.initTemplates = function(){
    var pagiHtml, perPhtml;
  
    if(this.opts.template){
      pagiHtml = $(this.opts.template).html()
    }else{
      pagiHtml = '<nav>  <ul class="pagination">    <% if(!current_page.isFirst()) { %>      <li> <a href="#" data-page="first" aria-label="First"><span aria-hidden="true">First</span></a> </li>      <li><a href="#" data-page="previous" aria-label="Previous"><span aria-hidden="true">&larr; Previous</span></a></li>    <% } %>    <% for(var i = 0, l = pages.length; i < l; i++ ){ %>        <% if(pages[i].isLeftOuter() || pages[i].isRightOuter() || pages[i].isInsideWindow()) { %>          <li class="<%= pages[i].isCurrent() ? \'active\' : \'\' %>">            <a href="#" data-page="<%= pages[i].num %>"><%= pages[i].num %></a>          </li>        <% }else{ %>          <li class="disabled"><a href="#">...</a></li>        <% } %>    <% } %>    <% if(!current_page.isLast()) { %>      <li><a href="#" data-page="next" aria-label="Next"><span aria-hidden="true">Next &rarr;</span></a></li>      <li><a href="#" data-page="last" aria-label="Last"><span aria-hidden="true">Last</span></a></li>    <% } %>  </ul></nav>';
    }
  
    this.paginationTmpl = templateBuilder(pagiHtml);
  
    if(!this.opts.per_page.container){
      return;
    }
  
    if(this.opts.per_page.template){
      perPhtml = $(this.opts.perPage.template).html();
    }else{
      perPhtml= '<select size="1" name="per_page" data-per-page="true">  <% for(var i = 0; i < options.length; i++ ){ %>    <option value="<%= options[i] %>"><%= options[i] %></option>  <% } %></select>';
    }
  
    $(this.opts.per_page.container).html(templateBuilder(perPhtml, {
      options: this.opts.per_page.values
    }));
  
  };
  
  P.rangeToArray = function(n1, n2){
    var nums = [];
  
    if(n1 <= 0){
      n1 = 1;
    }else if(n2 <= 0){
      n2 = 1;
    }
    
    if(n2 > this.totalPages){
      n2 = this.totalPages;
    } 
  
    for(n1; n1 <= n2; n1++){
      nums.push(n1);
    }
    return nums;
  };
  
  P.getPages = function(){
    var i = 0,
        l,
        pages = [],
        left = this.rangeToArray(1, this.opts.left),
        inside = this.rangeToArray(this.currentPage - this.opts.window, this.currentPage + this.opts.window ),
        right = this.rangeToArray(this.totalPages - this.opts.right, this.totalPages);
  
    var nums = $.unique(left.concat(inside, right))
                  .sort(function(a,b){ return (a - b);})
    
    for(i = 0, l = nums.length; i < l; i++){
      this.lastPage = new Page(this.opts, nums[i], this.totalPages, this.currentPage);
      pages.push(this.lastPage);
    }
  
    return pages;
  };
  
  P.render = function(totalItems, currentPage){
    var html;
  
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / this.perPage);
  
    html = this.paginationTmpl({
      pages: this.getPages(), 
      current_page: new Page(this.opts, this.currentPage, this.totalPages, this.currentPage), 
    });
  
    this.$container.html(html);
  
    return this.getOffset(totalItems);
  };
  
  P.bindEvents = function(filterCallback){
    var self = this;
  
    this.$container.on('click', '[data-page]', function(e){
      e.preventDefault();
      var page = getPageNum($(this).data('page'), self.totalPages, self.currentPage);
  
      if(page != self.currentPage){
        self.lastCurrentPage = self.currentPage;
        self.currentPage = page;
        filterCallback(self.getOffset());
      }
    })
  
    if(!this.opts.per_page.container){ return; }
  
    var $perPage = $(this.opts.per_page.container), 
        eleEvent = $perPage.find('[data-per-page]').is('select') ? 'change' : 'click';
  
    $perPage.on(eleEvent, '[data-per-page]', function(e){
  
      var $ele = $(this), perPage;
  
      if($ele.is('a')){
        e.preventDefault();
        perPage = $ele.data('value') || $ele.text();
      }else{
        perPage = $ele.val();
      }
  
      perPage = parseInt(perPage);
  
      if(perPage && self.perPage != perPage){
        self.perPage = perPage;
        filterCallback(self.getOffset());
      }
    });
  
  };
  
  P.getOffset = function(totalItems){
    var start = (this.perPage * (this.currentPage - 1)),
        end = start + this.perPage;
  
    if(!totalItems){
      totalItems = this.totalItems
    }
  
    if(end > totalItems){
      end = totalItems;
    }
  
    return {start: start, end: end};
  }
  

  function getPageNum(page, total, current){
    var num = parseInt(page);
  
    if(num){
      return num;
    }
  
    if(page == 'first') {
     return  1;
    }
    
    if(page == 'last'){
      return total;
    }
  
    if(page == 'next'){
      return current == total ? current : (current + 1);
    }
  
    if(page == 'previous'){
      return current == 1 ? 1 : (current - 1);
    }
  
    return page;
  };
  
  function Page(opts, page, last, current){
    this.opts = opts;
    this.last = last;
    this.current = current;
    this.num = getPageNum(page);
  }
  
  var G = Page.prototype;
  
  G.isCurrent = function(){
    return this.num == this.current;
  };
  
  G.isFirst = function(){
    return this.num == 1;
  };
  
  G.isLast = function(){
    return this.num == this.last;
  };
  
  G.isPrev = function(){
    return this.num == (this.current - 1);
  };
  
  G.isNext = function(){
    return this.num == (this.current + 1);
  };
  
  //within the left outer window or not
  G.isLeftOuter = function(){
    return this.num <= this.opts.left;
  };
  
  //within the right outer window or not
  G.isRightOuter = function(){
    return (this.last - this.num) < this.opts.right;
  };
  
  //inside the inner window or not
  G.isInsideWindow = function(){
    return Math.abs(this.current - this.num) <= this.opts.window;
  };
  
  G.isTruncated = function(){
    return this.num == 'gap';
  };
  
  

  $.fn.filterjs = function(records, options) {
    var $this = $(this);
  
    if (!$this.data('fjs')){
      $this.data('fjs', FilterJS(records, $this, options));
    }
  };
  


})( jQuery, window , document );
