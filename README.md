Filter.js
=============

Filter.js is client-side JSON objects filter and render html elements.
Multiple filter criteria can be specified and used in conjunction with
each other.


Usage
-----

Capture the JSON data (maybe using @people.to_json).Here 'id' field is mandatory in all json records and it should be uniq.

    var people = [{person: {id: 1, name: 'Jiren', age:26, country: 'India', country_id: 1,
                            states : [{ state : 'MH', state_id : 3 }, {state : 'HN', state_id : 4}] } },
                  {person: {id: 2, name: 'Joe', age:25, country: 'USA', country_id: 2,
                            states : [{ state : 'MH', state_id : 3 }, {state : 'HN', state_id : 4}] } }
                 ]

View function call for every object of the people array. It will render
the HTML template.We can Mustache.js, Hogan.js, Handlebars.js for render view or just make html string and return from the view function.

Without any rendering framework

    var view = function(person){
        return "<a href='/demo/"+  person.id +"'>" +
               "<div class='name'>" + person.name + "</div>" +
               "<div class='age'>" + person.age + "</div>" +
               "<div class='country'>" + person.country + "</div>" +
               "</a>";
    }


Below explain rendering using Mustache.js.

Filter criteria is defined in the follwing ways:(.EVENT. and .SELECT. option are not mandatory)

    var settings = {
      filter_criteria: {
              country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],
              age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'age'],
              states: ['#state_list input:checkbox .EVENT.click .SELECT.:checked', 'states.ARRAY.state_id']
        },
       callbacks: filter_callbacks, //Define below.
       and_filter_on: false,
       filter_on_init: false,  //By default it is true.
       search: { input: '#searchbox' },
       filter_types: filter_type_functions //Define below
    };

The detailed explaination is here:
For category selections:

    country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],

Selector: '#country_list input:checkbox': All the checkboxes in the div with id="country_list"

Event   : .EVENT.click : This is the event on the selector that will trigger the filter. This options is not mandatory.
If this optons is not given automatically bind checkbox, radio bind with click event, select box and hidden fields with change event.

Selection Criteria: .SELECT.:checked : The criteria for filtering. (In this case, all selected checkboxes). This option alos not mandatory.
Default selected checkbox, radio button selected.

JSON attribute: country_id : This is a JSON attribute defined in JSON objects for which filtering is done.

For Range selections,

    age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'age'],

    OR

    age: ['#age_list input:checkbox .TYPE.range', 'age'],

The only thing that changes here is the additional field

Range: .TYPE.range : It is expected to set ranges as values like '20-30', 'below-30', '30-above'.

Example:

    <input checked="checked" value="20-30" type="checkbox">

For Array selections,

    states: ['#state_list input:checkbox', 'states.ARRAY.state_id'],

If we need to look into a JSON array for the search criteria, we can use the .ARRAY. selector.
This would look into the states array and filter on the state_id

Categroy 'AND', 'OR' selection criteria.If any categroy selection result is zero and 'and_filter_on' => 'true'
then no elements are shown.For 'and_filter_on' => 'false' zero result category ignored.

    and_filter_on: true  //AND opration
    and_filter_on: false //OR Opration

For Instant Search,

    search: { input: '#searchbox'}

Search option is adding live search from the html elements. 'input' is the jquery element selector for the searchbox.

Filtering Callbacks
-------------------

Define callback in settings. Callbacks executes after each filtering events.(In examples folder: 'filterjs-map.html')

    var filter_callbacks = {
        after_init: function(record_ids){
           //Call after init of filter.
        },
        after_filter: function(result){
          googleMap.updateMarkers(result);
          //Tinysort integration
          $('a[data-fjs]').tsort('.fs_price:visible', {order: 'asc'})
        },
        before_add: function(data){
          //Process data before adding to filter while streaming.
        },
        after_add: function(data){
          //Call after adding data to filter.
        },
    };


- after_init   : Call after initialize of filter. Args: array of data record ids.
- after_filter : Call after filter event done.Args: array of filter data record ids.
- before_add   : Call before adding data to filter while streaming.One usecase is manupulate data before add to filter.Args: json data
- after_add    : Call after adding data to filter while streaming.Args: json data.


Triggering the filter
---------------------

    var fJS = FilterJS(people, "#people_list", view, settings);

This will render each JSON object to html and append to '#people_list' div.
Second arg is object render function which can be customized as show above.

NOTE: Initially where html element going to render and append must be empty.Here '#people_list' div is empty.


Filter using link
-----------------

Define link with hidden input. Link data-target is hidden input id and data-value is use to set
hidden input value.

    <a id="filter_by_link" href="#" data-value="100-200" data-target='#link_filter'>Price: 100 - 200</a>
    <input type="hidden" id="link_filter"/>

Add filter criteria to setting.

    link_filter: ['#link_filter .TYPE.range', 'amount']

To clear filter. data-value set to data-taget element which is hidden field associated with link.

    <a id="clear_link_filter" href="#" data-target="#link_filter" data-value='0-above'>Clear</a>

Bind event on filter link and clear filter link. Here on click link data-value set to data-target element value.

    $('#filter_by_link, #clear_link_filter').click(function(e){
      e.preventDefault();
      $($(this).data('target')).val($(this).data('value'));
      fJS.filter();
    });

Javascript Template Integration
-------------------------------
 Template must have parent any html tag.
 i.e

    incorrect:

    <span class="name">{{name}}</span>
    <span class="age">{{age}}</span>

    correct:

    <div>
      <span class="name">{{name}}</span>
      <span class="age">{{age}}</span>
    </div>

Mustache.js integration
-----------------------

[https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)

Define Mustache.js template in html page.

    <script id="person_template" type="text/mustache">
      <a href="/demo/{{id}}" title="{{name}}">
        <span class="name">{{name}}</span>
        <span class="age">{{age}}</span>
        <div class="country">{{country}}</div>
      </a>
    </script>

View function:

    var mustache_template = $("#person_template").html(); //Find template data.

    var view = function(person){
        return Mustache.to_html(mustache_template, person);
    };

In Example you can also find template using Handlebars.js, Hogan.js.

Instant Search integration
---------------------------

Default search config: This will search each filtered item html text.
Add default search option in filter setting.

    search: {input: '#searchbox'}

Custom search for particular fields.
Custom search config for above html template 'a' tag(filtering item), if we want to search by only 'name' and 'age'

'search_in' is html element selector inside the item html.

    search: {input: '#searchbox', search_in: '.name, .age' }

min_length:

Inspired by the 'minLength' option in Jquery's Autocomplete Widget, the 'min_length' specifies the minimum number of characters a user must type before a search is performed.
'1' is the default value and is useful for local data with just a few items, but a higher value should be used when a single character search could match a few thousand items.

Code examples:

Initialize the filter with the 'min_length' option specified:

	search: { input: '#searchbox', search_in: 'div.fs_head', min_length: 3 },

Custom Filter Types
--------------------

Default filter are only equalto and range.If you want to add custom filter type like age-range, date-range.
We can define multiple filter types and set to filter setting like this and each key is filter type.
Filter type function has two arguments, first one is filter category value and second one is value.

    //In filter setting
    age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.age-range', 'age']
    filter_types: filter_type_functions

    //Filter types defination
    var filter_type_functions = {

      //i.e category_value you can get value like 20-30 and for age 25
      age-range: function(category_value, age){
        var range = category_value.split('-');
        if (Number(age) >= range[0] && Number(age) <= range[1]){
          return true;
        }
      },

      date-range: function(category_value, date){
        //Your code
      }
    };

Add more data to existing filter
--------------------------------

If you are streaming json data using ajax then you can add data like this

    fJS.addData(data)

    Here fJS is Filter.js object and data is json records.

Add data using ajax streaming
-----------------------------

Add streaming option to above define 'settings'.

    streaming: {
      data_url: 'persons.json',        //JSON data url
      stream_after: 1,                 // strat streaming data after in seconds
      batch_size: 50,                  // Fetch reacord limit
      before_add: function(data){      // callback: Process data/update html/.etc before adding data to filter.
         //do your processing
      },
      after_add: function(data){       // callback: Process data/update html/.etc after adding data to filter.
        //do your processing
      }
    }

- Only 'data_url' is mandatory.
- 'stream_after' default value is 2 sec.
- 'before_add' and 'after_add' are callbacks
- Streaming ajax request format

   persons.json?offset=0&limit=50&q='search text'

Options
-------

- Default primary key for indexing array is 'id' field or json object. To change this field set 'id_field' option.

Demo
----
To see the sample demo, clone this repo and open demo/filterjs.html in your browser

[Filter](http://jiren.github.io/filter.js/filterjs.html)

[Filter with google map](http://jiren.github.io/filter.js/filterjs-map.html)

[Filter with streaming](http://jiren.github.io/filter.js/stream.html)

Examples
--------

[Tischefrei (search page)](http://tischefrei.de)


If you use this, please send me an email, I shall add your link here!


Changes and New Functionality
----------------------------

v1.1
  - And / Or filtering

v1.2
 - Filtering Callbacks

v1.3
 - Search with filtering

v1.3.1
 - Custom search for particular field

V1.3.2
 - Custom filter types i.e for data filtering

v1.4.0
 - JSON data record with or without root. i.e [{name: 'Jiren'}...] or [{info: {name: 'Jiren'}}...]
 - Upgraded Jquery to 1.9.1
 - Code optimization for performance

v1.4.1
 - Add json data to existing filter object.

v1.5
  Streaming data using ajax.

v1.5.1
  Change callbacks format.

v1.5.2
  Initialize the filter with the min_length option specified.

Sponsors and Supporters
-----------------------

- Instant searchfield filtering sponsored by [W/E consultants](http://www.w-e.nl)
- [Josh Software](http://www.joshsoftware.com)

Contributing
------------
Please send me a pull request so that this can be improved.

License
-------
This is released under the MIT license.
