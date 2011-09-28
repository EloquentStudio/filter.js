
jQuery(document).ready(function($) {

   $('#category_all, #nonprofit_all, #price_all').closest('ul').children().find(':checkbox').attr('checked', true);

   $('#category_all, #nonprofit_all, #price_all').click(function(){
     $(this).closest('ul').children().find(':checkbox').attr('checked', $(this).is(':checked'));
   });

   $('#price_filter').val('0-500');
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

  var fJS = filterInit();

});

function filterInit(){

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

  var settings = {
      filter_criteria: {
          category: ['#category_list input:checkbox .EVENT.click .SELECT.:checked', 'service_categories.ARRAY.category_id'],
          nonprofit: ['#nonprofit_list input:checkbox .EVENT.click .SELECT.:checked' , 'nonprofit.nonprofit_categories.ARRAY.category_id'],
          price: ['#price_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'amount'],
          amount: ['#price_filter .EVENT.change .SELECT.:input .TYPE.range', 'amount'],
          timeleft: ['#timeleft_filter .EVENT.change .SELECT.:input .TYPE.range', 'timeleft']
          }
      };

  return new filterJS(services, "#service_list", view, settings);
}

