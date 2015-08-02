function each (objs, callback, context){
  for (var i = 0, l = objs.length; i < l; i++) {
    callback.call(context, objs[i], i);
  }
}
