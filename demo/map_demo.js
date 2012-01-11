var fJS;
jQuery(document).ready(function($) {

   $('#category_all').closest('ul').children().find(':checkbox').attr('checked', true);

   $('#category_all').click(function(){
     $(this).closest('ul').children().find(':checkbox').attr('checked', $(this).is(':checked'));
   });

   fJS = filterInit();

});

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

    var lat_lng = googleMap.ranndomLatLng()
    service.lat = lat_lng[0];
    service.lng = lat_lng[1];
    
    googleMap.addMarker(service);

    return this.link('/demo/' + service.to_param ,{'title': service.title}, fs_box);
  };

  var filter_callbacks = {
    gmap: function(result){
       googleMap.updateMarkers(result); 
    },
    logger: function(result){
       $.each(result, function(i,v){ console.log(v.id)})
    }

  };

  var settings = {
      filter_criteria: {
          category: ['#category_list input:checkbox .EVENT.click .SELECT.:checked', 'service_categories.ARRAY.category_id'],
       },
       and_filter_on: true, //If any filter selection is zero then select none. For 'OR' filter set 'false'
       callbacks: filter_callbacks //Filter callback execute in filter init and each filtering event.
  };

  googleMap.init();

  //Add hover event

  $('a[data-fjs]').live('hover', function(e){
     var service_id = $(this).attr('id').replace('service_', '');
     var marker = googleMap.markers[service_id];
     marker.openInfoWindow(marker.info_window_content);
  });

  return FilterJS(services, "#service_list", view, settings);
  
};

var googleMap = {

  center_lat_lng: [37.4419, -122.1419],
  map: null,
  markers: {},

  init: function(){
    this.map = new GMap2(document.getElementById("gmap"));
    this.map.setCenter(new GLatLng(this.center_lat_lng[0], this.center_lat_lng[1]), 13);
    this.map.setUIToDefault();
    this.bounds = this.map.getBounds();
  },

  addMarker: function(service){
    var point =  new GLatLng(service.lat, service.lng);
    var marker = new GMarker(point);
    marker.info_window_content = service.title + '<br/> Price: ' + service.amount;

    this.markers[service.id] = marker;
    this.map.addOverlay(marker);

    GEvent.addListener(marker, "click", function() {
        marker.openInfoWindowHtml(marker.info_window_content);
    });
  },

  ranndomLatLng: function(){
    var southWest = this.bounds.getSouthWest();
    var northEast = this.bounds.getNorthEast();
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();
    return [southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random()];
  },

  updateMarkers: function(filtering_result){
    var google_map = this;
    $.each(google_map.markers, function(){ this.hide(); });
    $.each(filtering_result, function(){
      google_map.markers[this.id].show();
    });
  }

};
