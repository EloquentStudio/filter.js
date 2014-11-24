Filter.js
=============

Filter.js is client-side JSON objects filter and render html elements.
Multiple filter criteria can be specified and used in conjunction with
each other.


Usage
-----

Basic requirement to implement filtering using filter.js are JSON data, View template and filter criteria.

### Filter Initialisation
-------------------------

It takes three arguments one is movies, second is container in which html element going to append, third one is options. Options must have template element selector.
Others are in options like criteria, callbacks, search.

```
var FJS = FilterJS(movies, '#movies', {
  template: '#movie-template',
    callbacks: {
    afterFilter: function(result){
      $('#total_movies').text(result.length);
     }
   }
});
```

### JSON data
-------------

Capture the JSON data (maybe using @movies.to_json). i.e

```
  var movies = [
  {
    "name": "The Shawshank Redemption",
    "rating": 9.3,
    "director": "Frank Darabont",
    "year": 1994,
    "stars": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton"
    ],
    "runtime": 142,
    "genre": [
      "Crime",
      "Drama"
    ],
    "id": 1
  },
  ....
  ....
 ]
 ```

### View
--------

To render each json object require view template. In filter.js micro-templating module inspired by Underscopre.js.


```
	<script id="movie-template" type="text/html">
	  <div class="movie">
 		<div class="thumbnail">
          <span class="label label-success rating"><%= rating %></span>
          <div class="caption">
            <h4><%= name %></h4>
            <div class="outline">
              <%= outline %>
              <span class="runtime">
                <i class="glyphicon glyphicon-time"></i>
                <%= runtime %> mins.
              </span>
            </div>
            <div class="detail">
              <dl>
                <dt>Actors</dt>
                <dd><%= stars %></dt>
                <dt>Year</dt>
                <dd><%= year %></dd>
              </dl>
            </div>
          </div>
         </div>
       </div>
	</script>
```

### Filter Criteria
-------------------

It required two mandatory options are `field` which is name of any property from json data and other is HTML `ele` element on which filter will be trigger by click,change etc events.
Other options are filter `type`, `event` and `selector`.
- filter `type`, by default it is equal but if you want to search in range you can set it `range`. For `range` html element value must be in format of `val1-val2`. i.e `100-200`.
- `event` by default for checkbox, radio button is `click`, for text input, select box is `change`.
- `selector` by default for checkbox and radio button is `:checked`, for input field `input` and for select box is `select`.'#genre_criteria input:checkbox' will collect the checkboxes values in html element with `id="genre_criteria"`


There are two way to add criteria one is add at time of filter object initialisation and other one is add when required

```
  # On create
  var fjs = FilterJS(movies, '#movies', {
    template: '#movie-template',
    criterias: [ {field: 'year', ele: '#year_filter', type: 'range'} ]
  }

  # Add one at a time.
  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range'})
  FJS.addCriteria({field: 'genre', ele: '#genre_criteria input:checkbox'})

  # With all options.
  FJS.addCriteria({field: 'genre', ele: '.genres', event: 'change', selector: ':checked' })
```

**field**: `genre` this is a JSON attribute defined in JSON objects.
For Range selections,

More detail for `range` filter. It is expected to set ranges as values like '20-30'

   Example:

```
<input checked="checked" value="20-30" type="checkbox">
```

For nested field selection. In below object to select filter on name `field` option value would be `detail.name`, for city `detail.address.city`.

Json object:

    {
      detail: { name: 'Jiren', address: {city: 'Pune'} }
    }

#### Remove criteria.

Using `removeCriteria`, remove criteria dynamically. It take one argument `filed` name. i.e removing year criteria.

```
fjs.removeCriteria('year')
```

### Filtering Callbacks
-------------------

Define callback in settings. Callbacks execute on different events.

- `beforeAddRecords` : Trigger before adding records to filter.
- `afterAddRecords`
- `beforeRender`  : Trigger before rendering going to call.
- `beforeRecordRender` : Trigger for each json object record at time of rendering.
- `afterFilter` : Trigger after filtering event.

i.e

```
 var filter_callbacks = {
   beforeAddRecords: function(records){
     // Process new json data records.
     // i.e Process data before adding to filter while streaming.
   },
   afterAddRecords: function(records){
     // i.e Update google markers or update sorting.
   },
   beforeRender: function(records){
     //
   },
   beforeRecordRender: function(record){
      //i.e Add/Update record fields
   },
   afterFilter: function(result){
     // i.e Update result counter, update google map markers.
   }
};
```

Init Filter object with above callbacks

```
var fjs = FilterJS(movies, '#movies', {
  template: '#movie-template',
    callbacks: filter_callbacks
  }

  # Or add callback separately.
  FJS.addCallback('afterAddRecords', function(){
    // i.e Update total count
  });
```


### Instant Search integration
---------------------------

For search needed textbox element selector. By default search will work on all json object fields. If needed search in particular fields then set `fields` option.

```
 # Init with search
 FilterJS(movies, '#movies', {
   template: '#movie-template',
   search: {ele: '#searchbox'}  // Search in all fields of json object.
 }

 #Search in given fields

 search: {ele: '#searchbox', fields: ['name', 'runtime']}

```

Default search will trigger after 2 char. This can be configured using `start_length` option.

```
search: {ele: '#searchbox', fields: ['name', 'runtime'], start_length: 4 }
```

Default search will start searching immediately after user types. A timeout can be configured using `timeout` option (in milliseconds).

```
search: {ele: '#searchbox', fields: ['name', 'runtime'], timeout: 100 }
```


Add more data to existing filter
--------------------------------

If you are streaming json data using ajax then you can add data like this


    var fjs = FilterJS(movies, '#movies', { template: '#movie-template'})

    fJS.addData(data)


Add data using ajax streaming
-----------------------------

Add streaming option to above define 'settings'.

```
  var fjs = FilterJS(movies, '#movies', {
    template: '#movie-template',
    streaming: {
      data_url: 'movies/index.json',
      stream_after: 1,
        batch_size: 50
      }
  });
```

- Only 'data_url' is mandatory.
- 'stream_after' default value is 2 sec.
- Streaming ajax request format

```
movies/index.json.json?offset=0&limit=50&q='search text'
```

 Add streaming after initialisation.

```
fjs.setStreaming({
  data_url: 'data/stream_movies.json',
  stream_after: 1,
  batch_size: 50
});
```

Remove records from filtering
-----------------------------

- Remove using ids. ids are records `id` field.

```
  fjs.removeRecords([1,2,3]);

```

- Remove using [JsonQuery](https://github.com/jiren/JsonQuery) criteria

```
  fjs.removeRecords({year: 1980});

  fjs.removeRecords({'year.$gt': 1980, 'rating': 8.5}); 
```


### NOTE
---------

- Old filter.js in [v1.5.2](https://github.com/jiren/filter.js/tree/v1.5.2) git tag.


Demo
----
To see the sample demo, clone this repo and open demo/filterjs.html in your browser

[Filter](http://jiren.github.io/filter.js/index.html)


USED BY
--------

[Tischefrei (search page)](http://tischefrei.de)

[Roboty przemysłowe](http://roboty-przemyslowe.pl)

If you use this, please send me an email, I shall add your link here!


Sponsors and Supporters
-----------------------

- [Josh Software](http://www.joshsoftware.com)

- Instant search field filtering sponsored by [W/E consultants](http://www.w-e.nl)

Contributing
------------
Please send me a pull request so that this can be improved.

License
-------
This is released under the MIT license.
