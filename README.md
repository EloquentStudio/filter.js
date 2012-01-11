Filter.js
=============

Filter.js is client-side JSON objects filter to show/hide html elements.
Multiple filter criteria can be specified and used in conjunction with 
each other.


Usage
-----

Capture the JSON data (maybe using @people.to_json)

    var people = [{person: {name: 'Jiren', age:26, country: 'India', country_id: 1, 
                            states : [{ state : 'MH', state_id : 3 }, {state : 'HN', state_id : 4}] } }, 
                  {person: {name: 'Joe', age:25, country: 'USA', country_id: 2,
                            states : [{ state : 'MH', state_id : 3 }, {state : 'HN', state_id : 4}] } }
                 ]

View function call for every object of the people array. It will render 
the HTML template.

    var view = function(person){

      name    = this.span({'class': 'name'}, person.name);
      age     = this.span({'class': 'age'},  person.age);
      country = this.div({'class': 'country'}, person.country);
    
      return this.link('/demo/' + person.id ,{'title': person.name}, [name,age,country]);
    };

Suppose you require some HTML element which is not currently supported in filter.js,
you can simply use the registerHtmlElement method to add this to your HTML views.

    FilterJS.registerHtmlElement('article');

    //Use arguments attributes, content
    this.article({class: 'new'}, 'demo')
  
Filter criteria is defined in the follwing ways: 

    var settings = {
      filter_criteria: {
              country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],
              age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'age'],
              states: ['#state_list input:checkbox .EVENT.click .SELECT.:checked', 'states.ARRAY.state_id'],
        },
       callbacks = filter_callbacks, //Define below.
       and_filter_on: false
    };

The detailed explaination is here:
For category selections:

    country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],

Selector: '#country_list input:checkbox': All the checkboxes in the div with id="country_list"

Event   : .EVENT.click : This is the event on the selector that will trigger the filter.

Selection Criteria: .SELECT.:checked : The criteria for filtering. (In this case, all selected checkboxes)

JSON attribute: country_id : This is a JSON attribute defined in JSON objects for which filtering is done.

For Range selections,

    age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'age'],

The only thing that changes here is the additional field 

Range: .TYPE.range : It is expected to set ranges as values like '20-30', 'below-30', '30-above'.

Example: 

    <input checked="checked" value="20-30" type="checkbox">

For Array selections,

    states: ['#state_list input:checkbox .EVENT.click .SELECT.:checked', 'states.ARRAY.state_id'],

If we need to look into a JSON array for the search criteria, we can use the .ARRAY. selector.
This would look into the states array and filter on the state_id

Categroy 'AND', 'OR' selection criteria.If any categroy selection result is zero and 'and_filter_on' => 'true'
then no elements are shown.For 'and_filter_on' => 'false' zero result category ignored.

    and_filter_on: true  //AND opration
    and_filter_on: false //OR Opration

Filtering Callbacks
-------------------

Define callback in settings. Callbacks executes after each filtering events.(In demo folder: 'map_filter.html')

    var filter_callbacks = {
        gmap: function(result){
          googleMap.updateMarkers(result);
        },
        logger: function(result){
          $.each(result, function(i,v){ console.log(v.id)})
        }
    };

If want to execute callback on init set configuration in setting

    exec_callbacks_on_init: true
  



Triggering the filter
---------------------

    var fJS = FilterJS(people, "#people_list", view, settings);

This will render each JSON object to html and append to '#people_list' div.
Second arg is object render function which can be customized as show above.

Filter using link
-----------------

Define link with hidden input. Link data-target is hidden input id and data-value is use to set 
hidden input value.

    <a id="filter_by_link" href="#" data-value="100-200" data-target='#link_filter'>Price: 100 - 200</a>
    <input type="hidden" id="link_filter"/>

Add filter criteria to setting.

    link_filter: ['#link_filter .EVENT.change .SELECT.:input .TYPE.range', 'amount']

To clear filter. data-value set to data-taget element which is hidden field associated with link.

    <a id="clear_link_filter" href="#" data-target="#link_filter" data-value='0-above'>Clear</a>

Bind event on filter link and clear filter link. Here on click link data-value set to data-target element value.

    $('#filter_by_link, #clear_link_filter').click(function(e){
      e.preventDefault();
      $($(this).data('target')).val($(this).data('value'));
      fJS.filter();
    });


Mustache.js integration
-----------------------

[https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)

Define mustache.js template in html page.

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

Jquery Template integration
---------------------------

[https://github.com/jquery/jquery-tmpl](https://github.com/jquery/jquery-tmpl)

Define jquery template in html page.

    <script id="person_template" type="text/x-jquery-tmpl">
      <a href="/demo/${id}" title="${name}">
        <span class="name">${name}</span>
        <span class="age">${age}</span>
        <div class="country">${country}</div>
      </a>
    </script>

View function:

    var jquery_template = $("#person_template"); //Find template data.

    var view = function(person){
        return $.tmpl(jquery_template, person)
    };


Demo
----
To see the sample demo, clone this repo and open demo/filterjs.html in your browser

[Filter](http://jiren.github.com/filter.js/filterjs.html)
[Filter with google map](http://jiren.github.com/filter.js/filterjs-map.html)

Examples
--------

[GoodInKind Services](http://www.goodinkind.com/services)
[GoodInKind NonProfits](http://www.goodinkind.com/nonprofits)
[Dealacer (require soft registration)](http://dealacre.com/)


If you use this, please send me an email, I shall add your link here!


Changes and New Functionality
----------------------------

v1.1
  - And / Or filtering

v1.2
 - Filtering Callbacks


Contributing
------------
Please send me a pull request so that this can be improved.

License
-------
This is released under the MIT license.
