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

  FilterJS(services, "#service_list", {
    template: '#template',
    criterias:[
      {field: 'amount', ele: '#price_filter', type: 'range'},
      {field: 'status', ele: '#status :checkbox'}
    ],
    search: { ele: '#search_box' }
  });

});
