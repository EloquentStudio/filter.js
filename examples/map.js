$(document).ready(function(){

  renderCategories();
  initInputs();

  var place = places[0];
  GoogleMap.init(place.coordinate.latitude, place.coordinate.longitude, places);

  var afterFilter = function(result){
    $('#total_places').text(result.length);
    GoogleMap.updateMarkers(result);
  }

  afterFilter(places);

    //search: {ele: '#searchbox', fields: ['runtime']}, // With specific fields
  var FJS = FilterJS(places, '#places', {
    template: '#place-template',
    search: {ele: '#searchbox', fields: ['name', 'categories', 'address']},
    callbacks: {
      afterFilter: afterFilter 
    }
  });

  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
  FJS.addCriteria({field: 'is_closed', ele: '#is_closed_criteria input:checkbox'});
  FJS.addCriteria({field: 'categories', ele: '#categories_criteria input:checkbox', all: 'all'});

  window.FJS = FJS;
});

function initInputs(){
  $("#rating_slider").slider({
    min: 4.0,
    max: 5.0,
    values:[4.0, 5.0],
    step: 0.1,
    range:true,
    slide: function( event, ui ) {
      $("#rating_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#rating_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });


  $('#categories_criteria :checkbox').prop('checked', true);

  $('#all_categories').on('click', function(){
    $('#categories_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}

function renderCategories(){
  var categories = ["Falafel", "Vegan", "Gluten-Free", "Coffee & Tea", "Landmarks & Historical Buildings", "Venues & Event Spaces", "Desserts", "Chocolatiers & Shops", "Ethiopian", "Bakeries", "Creperies", "American (New)", "Delis", "Sushi Bars", "Japanese", "Sandwiches", "Hawaiian", "Asian Fusion", "Chinese", "Tea Rooms", "Local Flavor", "Hiking", "Vietnamese", "Parks", "Beaches", "Pizza", "Italian", "Bars", "Tobacco Shops", "Peruvian", "Laotian", "Thai", "Gastropubs", "Mexican", "French", "American (Traditional)", "Breakfast & Brunch", "Steakhouses", "Mediterranean", "Grocery", "Convenience Stores", "Wine Bars", "Pubs", "Juice Bars & Smoothies", "Cocktail Bars", "Food Stands", "Meat Shops", "German", "Indian", "Food Delivery Services", "Caterers", "Videos & Video Game Rental", "Salad"]; 

  var html = $('#category-template').html();
  var templateFn = FilterJS.templateBuilder(html)
  var container = $('#categories_criteria');

  $.each(categories, function(i, c){
    container.append(templateFn({ name: c, value: c }))
  });
}

var GoogleMap = {

  map: null,
  markers: {},

  init: function(lat, lng, places){
    var self = this;
    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(lat, lng)
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(50,50) });

    $.each(places, function(){
      self.addMarker(this);
    });

    this.setCenterPoint();
  },

  addMarker: function(place){
    var self = this;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.coordinate.latitude, place.coordinate.longitude),
      map: self.map,
      title: place.name
    });

    marker.info_window_content = place.name + '<br/>' + place.address
    self.markers[place.id] = marker

    google.maps.event.addListener(marker, 'click', function() {
      self.infowindow.setContent(marker.info_window_content)
      self.infowindow.open(self.map,marker);
    });
  },

  updateMarkers: function(records){
    var self = this;

    $.each(self.markers, function(){ this.setMap(null); })
    $.each(records, function(){
      self.markers[this.id].setMap(self.map);
    });

    //Set map center
    if(records.length) self.setCenterPoint();
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
