var fJS;
jQuery(document).ready(function($) {

   $('#category_all, #nonprofit_all, #price_all').closest('ul').children().find(':checkbox').prop('checked', true);

   $('#category_all, #nonprofit_all, #price_all').on('click',function(){
     $(this).closest('ul').children().find(':checkbox').prop('checked', $(this).is(':checked'));
   });

   $('#price_filter').val('0-1000');
   $('#price_range_label').html('$0-$1000');
   $("#price_slider").slider({
      range:true,
      min: 0,
      max: 1000,
      values:[0, 1000],
      step: 5,
      slide: function( event, ui ) {
        $("#price_range_label").html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
        $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
      }   
   });

   $('#timeleft_filter').val('0-10');
   $('#timeleft_range_label').html('0 days - 10 days');
   $("#timeleft_slider").slider({
      range:true,
      min: 0,
      max: 10,
      values:[0, 10],
      slide: function( event, ui ) {
        $( "#timeleft_range_label" ).html(ui.values[ 0 ] + ' days - ' + ui.values[ 1 ] + ' days' );
        $('#timeleft_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
      }   
   });

   $('#filter_by_link, #clear_link_filter').on('click', function(e){
     var $link = $(this);
     var $target = $($link.data('target'));

     $target.val($link.data('value')).trigger('change');

     return false;
   });

   $('#mustache_renderer').prop('checked', true);

   //Rendering by tempate type
   $('#renderer_types input').on('click', function(){
     var $ele = $(this)
     renderByType('#' + $ele.attr('id'), $ele.val());
   });

   fJS = filterInit('mustache');
});

function renderByType(id, type){
  $('#renderer_types :checkbox').prop('checked', false); 
  $(id).prop('checked', true);
  $('#service_list').html('');

  fJS.clear();
  fJS = filterInit(type);
};

function filterInit(template_type){

  var calulate_day_left = function(days){
    if(days == 0) return 'Last Day';
    else if(days == 1) return '1 day Left';
    else return days + ' day Left';
  };
  
  var template, html = $.trim($("#template").html());

  if(template_type == 'hogan'){
    template = Hogan.compile(html);
  } else if(template_type == 'handlebars'){
    template = Handlebars.compile(html);
  }else if(template_type == 'mustache'){
    template = Mustache.compile(html);
  }
  
  var view = function(service){
    service.timeleft = Math.floor(Math.random()*10);
    service.timeleft_str = calulate_day_left(service.timeleft);

    return (template_type == 'hogan' ? template.render(service): template(service));
  };

  var filter_callbacks = {
    after_filter: function(result) {
      $('.result_count').text('Found : ' + result.length);
      $('a[data-fjs]').tsort('.fs_head:visible', {order: 'asc'});
      //console.log(result);
    },
    after_render_record: function(record) {
      if(record.amount < 50) {  
        $('#fjs_'+record.id+' .fs_price').addClass('black'); 
      }
      if(record.amount >= 50 && record.amount < 200) {  
        $('#fjs_'+record.id+' .fs_price').addClass('blue'); 
      }
      if(record.amount >= 200 && record.amount < 500) {  
        $('#fjs_'+record.id+' .fs_price').addClass('green'); 
      }
      if(record.amount >= 500) {  
        $('#fjs_'+record.id+' .fs_price').addClass('red'); 
      }
    }// after_render_record ends here
            
  };

  /*
   * Custom filter type for time range
   * Params: category_value i.e '0-10'
   *         days(from json data) i.e 4
   */
  var timeRangeFilter = function(category_value, days){
    var range = category_value.split('-');
    if (Number(days) >= range[0] && Number(days) <= range[1]){
      return true;
    }
  };

  var options = {
    filter_criteria: {
      category: ['#category_list input:checkbox', 'service_categories.ARRAY.category_id'],
      nonprofit: ['#nonprofit_list input:checkbox' , 'nonprofit.nonprofit_categories.ARRAY.category_id'],
      price: ['#price_list input:checkbox  .TYPE.range', 'amount'],
      amount: ['#price_filter .TYPE.range', 'amount'],
      timeleft: ['#timeleft_filter .TYPE.time_range', 'timeleft'],
      link_filter: ['#link_filter .TYPE.range', 'amount']
    },
    search: {input: '#search_box' },
    and_filter_on: true, //If any filter selection is zero then select none. For 'OR' filter set 'false'
    callbacks: filter_callbacks, //Filter callback execute in filter init and each filtering event.
    filter_types: { time_range: timeRangeFilter }
  };

  //Note: For testing using root
  //services = $.map(services, function(e,i){ return {service: e}})

  //var temp = services.slice();
  //for(var i = 0; i < 5; i++){
  //  temp = temp.concat(services.slice());
  //}

  var fjs, d1 = new Date(), d2;
  fjs = FilterJS(services, "#service_list", view, options);
  //fjs = FilterJS(temp, "#service_list", view, options);

  d2 = new Date();
  $('#init_time').text((d2.getTime() - d1.getTime()) + 'ms' );

  var filter_func = fjs.filter;

  fjs.filter = function(){
    var d2, d1 = new Date();

    filter_func.call(fjs);
    d2 = new Date();

    $('#filter_time').text((d2.getTime() - d1.getTime()) + 'ms' );
  };

  return fjs;
}

