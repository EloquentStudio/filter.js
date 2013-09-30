var fJS;
jQuery(document).ready(function($) {

  $('#price_filter').val('0-500');
  $("#price_slider").slider({
    range:true,
    min: 0,
    max: 500,
    values:[0, 500],
    step: 5,
    slide: function(event, ui) {
      $("#price_range_label").html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
      $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }   
  });

  $('#status :checkbox').prop('checked', true);

  fJS = filterInit();
});

function filterInit() {

  var template = Mustache.compile($.trim($("#template").html()));

  var view = function(service){
    return template(service);
  };

  var settings = {
    filter_criteria: {
      amount: ['#price_filter .TYPE.range', 'amount'],
      status: ['#status :checkbox', 'status']
    },
    search: {input: '#search_box' },
    and_filter_on: true,
    id_field: 'id' //Default is id. This is only for usecase
  };

  return FilterJS(services, "#service_list", view, settings);
}
