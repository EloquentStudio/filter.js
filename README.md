# Filter.js

Filter.js is client-side JSON objects filter which can render html elements. Multiple filter criteria can be specified and used in conjunction with each other.

## Usage

Basic requirement to implement filtering using filter.js are JSON data, a 'View' template and a filter criteria.

### Filter Initialisation

It takes three arguments one is movies, second is 'container' in which html elements are to be to appended and the third one is options.
You can set options such as template, criteria, callbacks and search but only `template` is compulsory.

```javascript
var FJS = FilterJS(movies, '#movies', {
  template: '#movie-template',
  callbacks: {
    afterFilter: function(result){
      $('#total_movies').text(result.length);
     }
   }
});
```

To append each item in different container use option `appendToContainer`.
This option is a function with two arguments, one is html element content and second is record object.

```javascript

//This will append elements to specific year.
var appendFn = function(html_ele, record) {
  $("#" + record.year).append(html_ele);
}

var FJS = FilterJS(movies, '#movies', {
  template: '#movie-template',
  appendToContainer: appendFn
});
```

### JSON data

Capture the JSON data (maybe using @movies.to_json).

```javascript
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

Rendering JSON objects requires a view template. The micro-templating module in filter.js is inspired by Underscore.js.

```javascript
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

The two mandatory options required are `field` which is name of any property from JSON data and other is HTML `ele` element on which filter will be triggered by an event(e.g. click, change, etc.).
Other filter options are `type`, `event` and `selector`.

- filter `type`: by default it is equal but if you want to search within a range you can set it to `range`.
For `range`, html element value should be in format of `val1-val2`(e.g. `100-200`).
By default hyphen '-' is used as `delimiter` or range separator `val1-val2`. If you want to use a different separator (if data contains hyphen e.g: '2012-02-02') it can be specified using `delimiter: ','` and html element value should be in format `val1<delimiter>val2`. i.e.`2012-02-02,2015-02-02`.
- `event` by default for checkbox and radio button is `click` and for text input and select box it is `change`.
- `selector` by default for checkbox and radio button is `:checked`, for input field is `input` and for select box is `select`. '#genre_criteria input:checkbox' will collect the checkboxes values in html element with `id="genre_criteria"`
- `all` option : if selected values of specific filter criteria contains `all` option value then all record selected for that criteria.

There are two way to add criteria. One is add at time of filter object initialisation and other is add when required.

```javascript
  //On create
  var fjs = FilterJS(movies, '#movies', {
    template: '#movie-template',
    criterias: [ {field: 'year', ele: '#year_filter', type: 'range'} ]
  }

  // Add one at a time.
  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range'})
  FJS.addCriteria({field: 'genre', ele: '#genre_criteria input:checkbox'})

  // with all  option
  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all_years'})

  // Full options list.
  FJS.addCriteria({field: 'genre', ele: '.genres', event: 'change', selector: ':checked' })
```

**field**: `genre` this is a JSON attribute defined in JSON objects.

#### For Range selections

More detail for `range` filter. It is expected to set ranges as values like '20-30'

  Example:

```html
<input checked="checked" value="20-30" type="checkbox">
```

**For nested field selection**: In the below object, to select filter on name `field` option value would be `detail.name` and for city `detail.address.city`.

JSON object:

```json
    {
      detail: { name: 'Jiren', address: { city: 'Pune' } }
    }
```

#### Remove criteria.

Using `removeCriteria`, remove criteria dynamically. It take one argument `filed` name. i.e removing year criteria.

```javascript
fjs.removeCriteria('year')
```

#### Filtering Callbacks

Define callback in settings. Callbacks execute on different events.

- `beforeAddRecords` : Triggered before adding records to filter.
- `afterAddRecords` : Triggered after all records are added.
- `beforeRender` : Triggered before rendering going to call.
- `beforeRecordRender` : Triggered for each JSON object record at time of rendering.
- `afterFilter` : Triggered after filtering event.

i.e.,

```javascript
  var filter_callbacks = {
    beforeAddRecords: function(records){
      // Process new JSON data records.
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

#### Init Filter object with above callbacks

```javascript
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

To enable search, add a textbox element and set the selector in options. By default search will work on all JSON object fields. If you want to search on some particular fields then set the `fields` option.

```javascript
  // Init with search
  FilterJS(movies, '#movies', {
    template: '#movie-template',
    search: { ele: '#searchbox' }  // Search in all fields of JSON object.
  }

  // Search in given fields
  search: { ele: '#searchbox', fields: ['name', 'runtime'] }
```

The search will trigger after 2 characters by default. This can be configured using `start_length` option.

```javascript
  search: {ele: '#searchbox', fields: ['name', 'runtime'], start_length: 4 }
```

By default search will start immediately after a user types. A timeout can be configured using `timeout` option (in milliseconds).

```javascript
  search: {ele: '#searchbox', fields: ['name', 'runtime'], timeout: 100 }
```

## Add more data to existing filter

If you are streaming JSON data using ajax then you can add data like this

```javascript
var fjs = FilterJS(movies, '#movies', { template: '#movie-template'})

fJS.addData(data)
```

### Add data using ajax streaming

Add streaming option to above define 'settings'.

```javascript
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

```javascript
fjs.setStreaming({
  data_url: 'data/stream_movies.json',
  stream_after: 1,
  batch_size: 50
});
```

## Remove records from filtering

- Remove records using the record's `id` field.

```javascript
fjs.removeRecords([1,2,3]);
```

- Remove using [JsonQuery](https://github.com/jiren/JsonQuery) criteria

```javascript
  fjs.removeRecords({year: 1980});

  fjs.removeRecords({'year.$gt': 1980, 'rating': 8.5});
```

## Change Template dynamically and Rebuild

If you want to change the template dynamically but do not want to re-render the view (you many choose to render the template yourself) then just pass the template name to `setTemplate` function.

```javascript
  fjs.setTemplate('#movie-list-template');
```

If you want to re-render the new template then pass a second paramater as `true`. This will render the container with the data using the new template specified and apply the filtering.

```javascript
  fjs.setTemplate('#movie-list-template', true);
```

## Build and Development

- `npm install gulp -g`
- Install packages `npm install`
- To build `gulp build`
- For development `gulp`. This will start watch on files, also start webserver.

## Note

- Old filter.js in [v1.5.2](https://github.com/jiren/filter.js/tree/v1.5.2) git tag.

## Demo

To see the sample demo, clone this repo and open demo/filterjs.html in your browser

[Filter](http://jiren.github.io/filter.js/index.html)

[Auto filtering using html attributes](http://jiren.github.io/filter.js/auto.html)

[Filter - Google Map](http://jiren.github.io/filter.js/map.html)

[Filter with Pagination](http://jiren.github.io/filter.js/pagination.html)

## Used by

[Itrenewdirect (product search)](https://www.itrenewdirect.com/category/laptops.html)

[Tischefrei (search page)](http://tischefrei.de)

[Roboty przemysłowe](http://roboty-przemyslowe.pl)

[Byte b.v. (partner page)](https://www.byte.nl/partners)

If you use this, please send me an email, I shall add your link here!

## Sponsors and Supporters

- [Josh Software](http://www.joshsoftware.com)
- Instant search field filtering sponsored by [W/E consultants](http://www.w-e.nl)

## Contributing

Please send me a pull request so that this can be improved.

## License

This is released under the MIT license.
