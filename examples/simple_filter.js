var fJS;
jQuery(document).ready(function($) {

  $('#price_filter').val('0-500');
  $("#price_slider").slider({
    range:true,
    min: 0,
    max: 1000,
    values:[0, 500],
    step: 5,
    slide: function(event, ui) {
      $("#price_range_label").html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
      $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }   
  });

  fJS = filterInit();
});

function filterInit() {

  var calulate_day_left = function(days) {
    if(days == 0) return 'Last Day';
    else if(days == 1) return '1 day Left';
    else return days + ' day Left';
  };

  var template, html = $.trim($("#template").html());

  template = Mustache.compile(html);

  var view = function(service){
    service.timeleft = Math.floor(Math.random()*10);
    service.timeleft_str = calulate_day_left(service.timeleft);
    service.short_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    service.short_nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';

    return template(service);
  };

  var settings = {
    filter_criteria: {
                       amount: ['#price_filter .TYPE.range', 'amount']
                     },
    search: {input: '#search_box' },
    and_filter_on: true,
  };

  return FilterJS(services, "#service_list", view, settings);
}
