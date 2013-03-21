var fJS;
jQuery(document).ready(function($) {

   $('#category_all, #nonprofit_all, #price_all').closest('ul').children().find(':checkbox').prop('checked', true);

   $('#category_all, #nonprofit_all, #price_all').on('click',function(){
     $(this).closest('ul').children().find(':checkbox').prop('checked', $(this).is(':checked'));
   });

   $('#price_filter').val('0-500');
   $('#price_range_label').html('$0-$500');
   $( "#price_slider" ).slider({
      range:true,
      min: 0,
      max: 1000,
      values:[0, 500],
      step: 5,
      slide: function( event, ui ) {
        $( "#price_range_label" ).html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
        $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
      }   
   });

   $('#timeleft_filter').val('0-3');
   $('#timeleft_range_label').html('0 days - 3 days');
   $( "#timeleft_slider" ).slider({
      range:true,
      min: 0,
      max: 10,
      values:[0, 3],
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

  fJS.unbindEvents();
  fJS = filterInit(type);
}

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
    service.short_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    service.short_nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';

    return (template_type == 'hogan' ? template.render(service): template(service));
  };

  var customView = function(service){
    var service_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    var nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';
    service.timeleft = Math.floor(Math.random()*10);

    clear     = this.div({'class': 'clear'});
    fs_price  = this.div({'class': 'fs_price'}, '$' + service.amount );
    fs_head   = this.span({'class': 'fs_head'}, service_title);
    fs_for    = this.span({'class': 'fs_for'}, 'for');
    fs_disc   = this.span({'class': 'fs_disc'}, nonprofit_name);
    time_left   = this.span({'class': 'fs_disc'},  calulate_day_left(service.timeleft));
    fs_left   = this.div({'class': 'fs_left'}, [fs_head, fs_for, fs_disc, time_left]);
    fs_box    = this.div({'class': 'fs_box'}, [fs_left, fs_price, clear ] );

    return this.link('/demo/' + service.to_param ,{'title': service.title}, fs_box)
  }

  var filter_callbacks = {
    logger: function(result){
      //console.log(result);
    },

    show_result_count: function(result){
      $('.result_count').text('Found : ' + result.length);
    },
                     
    tiny_sort: function() {
      $('a[data-fjs]').tsort('.fs_head:visible', {order: 'asc'});
    }
            
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

  var settings = {
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

  if(template_type == 'custom') view = customView;

  return FilterJS(services, "#service_list", view, settings);
}

