var fJS;
jQuery(document).ready(function(){
  $('#category_all').closest('ul').children().find(':checkbox').prop('checked', true);

  $('#category_all').click(function(){
    $(this).closest('ul').children().find(':checkbox').prop('checked', $(this).is(':checked'))
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
    var service_title = service.title.length < 27 ? service.title : service.title.substring(0,27) +'...'
    var nonprofit_name = service.nonprofit.name.length < 27 ? service.nonprofit.name : service.nonprofit.name.substring(0,27) +'...'
    var lat_lng = googleMap.ranndomLatLng();
    
    service.timeleft = Math.floor(Math.random()*10);
    clear     = this.div({'class': 'clear'});
    fs_price  = this.div({'class': 'fs_price'}, '$' + service.amount );
    fs_head   = this.span({'class': 'fs_head'}, service_title);
    fs_for    = this.span({'class': 'fs_for'}, 'for');
    fs_disc   = this.span({'class': 'fs_disc'}, nonprofit_name);
    time_left   = this.span({'class': 'fs_disc'},  calulate_day_left(service.timeleft));
    fs_left   = this.div({'class': 'fs_left'}, [fs_head, fs_for, fs_disc, time_left]);
    fs_box    = this.div({'class': 'fs_box'}, [fs_left, fs_price, clear ] );

    service.lat = lat_lng[0];
    service.lng = lat_lng[1];
    
    googleMap.addMarker(service);

    return this.link('/demo/' + service.to_param ,{'title': service.title}, fs_box);
  };

  var filter_callbacks = {
    gmap: function(result){
      $('#result_count').text('Found : ' + result.length);
      googleMap.updateMarkers(result); 
    },

    logger: function(result){
      //console.log(result);
    }

  };

  var settings = {
    filter_criteria: {
      category: ['#category_list input:checkbox', 'service_categories.ARRAY.category_id'],
    },
    and_filter_on: true, //If any filter selection is zero then select none. For 'OR' filter set 'false'
    callbacks: filter_callbacks //Filter callback execute in filter init and each filtering event.
    //exec_callbacks_on_init: true
  };

  googleMap.init();

  //Add hover event
  $('#service_list').on('mouseenter mouseleave', 'a[data-fjs]', function(e){
     var service_id = $(this).attr('id').replace('service_', '');
     var marker = googleMap.markers[service_id];
     googleMap.infowindow.setContent(marker.info_window_content);
     googleMap.infowindow.open(googleMap.map, marker);
  });

  return FilterJS(services, "#service_list", view, settings);
};

var googleMap = {

  center_lat_lng: [37.4419, -122.1419],
  map: null,
  markers: {},

  init: function(){
    var options = {
      center: new google.maps.LatLng(this.center_lat_lng[0], this.center_lat_lng[1]),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById("gmap"), options);
    this.southWest = new google.maps.LatLng(37.42145310364248, -122.20198148193361);
    this.northEast = new google.maps.LatLng(37.462341310602696, -122.08181851806643);
    this.infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(50,50) });
  },

  addMarker: function(service){
    var that = this;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(service.lat, service.lng),
      map: this.map,
      title: service.title
    });

    marker.info_window_content = service.title + '<br/> Price: ' + service.amount
    this.markers[service.id] = marker

    google.maps.event.addListener(marker, 'click', function() {
      that.infowindow.setContent(marker.info_window_content)
      that.infowindow.open(that.map,marker);
    });
  },
 
  ranndomLatLng: function(){
    var lngSpan = this.northEast.lng() - this.southWest.lng();
    var latSpan = this.northEast.lat() - this.southWest.lat();
    return [this.southWest.lat() + latSpan * Math.random(), this.southWest.lng() + lngSpan * Math.random()];
  },

  updateMarkers: function(filtering_result){
    var google_map = this;
    $.each(google_map.markers, function(){ this.setMap(null); })
    $.each(filtering_result, function(i, id){
      google_map.markers[id].setMap(google_map.map);
    });

    //Set map center
    if(filtering_result.length) google_map.setCenterPoint();
  },

  setCenterPoint: function(){
    var lat = 0, lng = 0; count = 0;

    //Calculate approximate center point.
    for(id in this.markers){
      var m = this.markers[id];

      if(m.map){
        lat += m.getPosition().lat();
        lng += m.getPosition().lng();
        count++;
      }
    }

    if(count > 0){
      this.map.setCenter(new google.maps.LatLng(lat/count,lng/count));
    }
  }

};
