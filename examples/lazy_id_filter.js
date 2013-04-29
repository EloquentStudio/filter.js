jQuery(document).ready(function($) {

  var template = Mustache.compile($.trim($("#template").html()))
      ,$container = $('.movies');

  var all_genre = ["Crime", "Drama", "Thriller", "Adventure", "Western", "Action", "Biography", "History", "War", "Fantasy", "Sci-Fi", "Mystery", "Romance", "Family", "Horror", "Film-Noir", "Comedy", "Animation", "Musical", "Music", "Sport"];
  var genre_template = Mustache.compile($.trim($("#genre_template").html()))
      ,$genre_container = $('#genre_criteria')

  $.each(all_genre, function(i, g){
    $genre_container.append(genre_template({genre: g}));
  });

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

  $("#year_slider").slider({
    min: 1920,
    max: (new Date()).getFullYear(),
    values:[1920, (new Date()).getFullYear()],
    step: 10,
    range:true,
    slide: function( event, ui ) {
      $("#year_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#year_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $.each(Movies, function(i, m){ m.id = i+1; });
  window.mf = MovieFilter(Movies);

  $('#genre_criteria :checkbox').prop('checked', true);
  $('#all_genre').on('click', function(e){
    $('#genre_criteria :checkbox:gt(0)').prop('checked', $(this).is(':checked'));
    mf.filter();
  });


  // Here is the interesting part:
  //------------------------------

  // Sometimes the data initially loaded cannot contain everything
  // The idea is then to allow to filter the data based on the id that is set
  // in the loaded data and define the filter afterwards

  // 1) In this case the ids for the filter are defined as a data attribute on the element (data-ids)
    mf.addIdFilterCriteria('in_cinema',         '#in_cinema');
    mf.addIdFilterCriteria('straight_to_video', '#straight_to_video');

  // 2) In this case we load the filter manually but this can easily come from
  // an ajax request as well and then build the filter
    top_worst_movie_filter_criteria = [
      {name: 'top_10_all_time', fullname: 'Top 10 all time', ids: [50, 1, 2, 4, 5, 20, 29, 40, 42, 53]},
      {name: 'worst_10_all_time', fullname: 'Worst 10 all time', ids: [60, 44, 76, 47, 98, 93, 23, 45, 90, 155]},
      {name: 'top_10_last_year', fullname: 'Top 10 last year', ids: [59, 43, 77, 33, 66, 89, 98, 22, 33, 122]},
      {name: 'worst_10_last_year', fullname: 'Worst 10 last year', ids: [102, 104, 108, 111, 113, 119, 156, 176, 198, 134]}
    ];

    top_worst_movie_filter_criteria_by_key = {}
    // With the data retrieve we can build the filter
    $.each(top_worst_movie_filter_criteria, function(i, t){
      top_worst_movie_filter_criteria_by_key[t.name] = t.ids;
       $('#top_worst').append('<option value='+t.name+'>'+t.fullname+'</option>');
    });

    // No we bind the filter logic
    mf.addIdFilterCriteria('top_worst', '#top_worst', top_worst_movie_filter_criteria_by_key);

});

var MovieFilter = function(data){
  var template = Mustache.compile($.trim($("#template").html()));

  var view = function(movie){
    movie.stars = movie.stars.join(', ');
    return template(movie);
  };
  var callbacks = {
    show_search_count: function(result){
      $('#total_movies').text(result.length);
    },
  };

  options = {
    filter_criteria: {
      rating:  ['#rating_filter .TYPE.range', 'rating'],
      year:    ['#year_filter .TYPE.range', 'year'],
      runtime: ['#runtime_filter .TYPE.range', 'runtime'],
      genre:   ['#genre_criteria input:checkbox:gt(0)', 'genre']
    },
    and_filter_on: false,
    callbacks: callbacks,
    search: {input: '#searchbox'},
    streaming: {
      data_url: 'data/top_movies_data.json',
      stream_after: 1,
      batch_size: 50,
      before_add: function(data){
        var offset = this.data.length;

        if (offset == 450) {
          this.clearStreamingTimer();
        }

        $.each(data, function(i, m) { m.id = offset+1;})
      },
      after_add: function(data){
        var percent = (this.data.length - 250)*100/250;
        $('#stream_progress').text(percent + '%').attr('style', 'width: '+ percent +'%;');
        if (percent == 100) $('#stream_progress').parent().fadeOut(1000);
      }
    }
  }

  return FilterJS(data, "#movies", view, options);
}
