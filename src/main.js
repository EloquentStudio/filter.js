;(function($, window, document) {

  "use strict";

  /* inject src/template.js */
  /* inject src/util.js */
  /* inject src/filter.js */
  /* inject src/paginator.js */
  /* inject src/jquery_fn.js */

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

  views['pagination'] = /*inject src/views/pagination.html */; 
  views['per_page'] = /*inject src/views/per_page.html */; 

  /* inject src/auto.js */

})( jQuery, window , document );
