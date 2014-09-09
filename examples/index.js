$(document).ready(function(){

  init();

  var FJS = FilterJS(movies, '#movies',
    {
      template: '#movie-template',
      search: {ele: '#searchbox'},
      callbacks: {
        afterFilter: function(result){
          $('#total_movies').text(result.length);
        }
      }
    });

  FJS.addCriteria({field: 'genre', ele: '#genre_criteria input:checkbox'});
  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range'});
  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});

  /*
   * Add multiple criterial.
    FJS.addCriteria([
      {field: 'genre', ele: '#genre_criteria input:checkbox'},
      {field: 'year', ele: '#year_filter', type: 'range'}
    ])
  */

  window.FJS = FJS;
});

function init(){
  $("#rating_slider").slider({
    min: 8,
    max: 10,
    values:[8, 10],
    step: 0.1,
    range:true,
    slide: function( event, ui ) {
      $("#rating_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#rating_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $("#runtime_slider").slider({
    min: 50,
    max: 250,
    values:[0, 250],
    step: 10,
    range:true,
    slide: function( event, ui ) {
      $("#runtime_range_label" ).html(ui.values[ 0 ] + ' mins. - ' + ui.values[ 1 ] + ' mins.');
      $('#runtime_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#genre_criteria :checkbox').prop('checked', true);
  $('#all_genre').on('click', function(){
    $('#genre_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
