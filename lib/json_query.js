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
