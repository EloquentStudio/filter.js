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

