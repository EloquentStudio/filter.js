var fJS;
jQuery(document).ready(function($) {

   $('#category_all, #nonprofit_all, #price_all').closest('ul').children().find(':checkbox').attr('checked', true);

   $('#category_all, #nonprofit_all, #price_all').click(function(){
     $(this).closest('ul').children().find(':checkbox').attr('checked', $(this).is(':checked'));
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
        $('#price_filter').val(ui.values[0] + '-' + ui.values[1]);
        $('#price_filter').trigger('change');
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
        $('#timeleft_filter').val(ui.values[0] + '-' + ui.values[1]);
         fJS.filter();
      }   
   });

   $('#filter_by_link, #clear_link_filter').click(function(e){
     e.preventDefault();
     $($(this).data('target')).val($(this).data('value'));
     fJS.filter();
   });


   fJS = filterInit();

   //For Demo
   $('#native_renderer').attr('checked', true);
   $('#native_renderer').click(function(){
       renderByType('#native_renderer')
   });

   $('#mustache_renderer').click(function(){
       renderByType('#mustache_renderer', 'mustache')
   });

   $('#jtempl_renderer').click(function(){
       renderByType('#jtempl_renderer', 'jtempl')
   });

});

function renderByType(id, type){
  $('#renderer_types :checkbox').attr('checked', false);
  $(id).attr('checked', true);
  $('#service_list').html('');
  fJS.unbindEvents();
  fJS = filterInit(type);
}


function filterInit(filter_type){

  var calulate_day_left = function(days){
    if(days == 0) return 'Last Day';
    else if(days == 1) return '1 day Left';
    else return days + ' day Left';
  };


  var view = function(service){
    service.timeleft = Math.floor(Math.random()*10);
    var service_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    var nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';
    
    clear     = this.div({'class': 'clear'});
    fs_price  = this.div({'class': 'fs_price'}, '$' + service.amount );
    fs_head   = this.span({'class': 'fs_head'}, service_title);
    fs_for    = this.span({'class': 'fs_for'}, 'for');
    fs_disc   = this.span({'class': 'fs_disc'}, nonprofit_name);
    time_left   = this.span({'class': 'fs_disc'},  calulate_day_left(service.timeleft));
    fs_left   = this.div({'class': 'fs_left'}, [fs_head, fs_for, fs_disc, time_left]);
    fs_box    = this.div({'class': 'fs_box'}, [fs_left, fs_price, clear ] );

    return this.link('/demo/' + service.to_param ,{'title': service.title}, fs_box);
  };

  //Mustache
  var mustache_template = $("#mustache_template").html(); 

  var mustacheView = function(service){
    service.timeleft = Math.floor(Math.random()*10);
    service.timeleft_str = calulate_day_left(service.timeleft);
    service.short_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    service.short_nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';
      
    return Mustache.to_html(mustache_template, service);
  };

  //JQuery Template
  var jquery_template = $('#jtempl_template');

  var jtemplView = function(service){
    service.timeleft = Math.floor(Math.random()*10);
    service.timeleft_str = calulate_day_left(service.timeleft);
    service.short_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...';
    service.short_nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...';
      
    return $.tmpl(jquery_template, service);
  };

  var filter_callbacks = {
    logger: function(result){
       console.log(result);
    },

    show_result_count: function(result){
        $('.result_count').text('Found : ' + result.length);
    },
                     
    tiny_sort: function() {
       $('a[data-fjs]').tsort('.fs_head:visible', {order: 'asc'})
    }
            
  };

  var settings = {
      filter_criteria: {
          category: ['#category_list input:checkbox .EVENT.click .SELECT.:checked', 'service_categories.ARRAY.category_id'],
          nonprofit: ['#nonprofit_list input:checkbox .EVENT.click .SELECT.:checked' , 'nonprofit.nonprofit_categories.ARRAY.category_id'],
          price: ['#price_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'amount'],
          amount: ['#price_filter .EVENT.change .SELECT.:input .TYPE.range', 'amount'],
          timeleft: ['#timeleft_filter .EVENT.change .SELECT.:input .TYPE.range', 'timeleft'],
          link_filter: ['#link_filter .EVENT.change .SELECT.:input .TYPE.range', 'amount']
          },
       and_filter_on: true, //If any filter selection is zero then select none. For 'OR' filter set 'false'
       callbacks: filter_callbacks //Filter callback execute in filter init and each filtering event.
  };


  if(filter_type == 'mustache'){
    return FilterJS(services, "#service_list", mustacheView, settings);
  }
  else if(filter_type == 'jtempl'){
    return FilterJS(services, "#service_list", jtemplView, settings);
  }
  else{
    return FilterJS(services, "#service_list", view, settings);
  }
  
}

