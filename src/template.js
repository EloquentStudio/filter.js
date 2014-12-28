
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
