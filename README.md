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

Register new html element
    FilterJS.registerHtmlElement('p');

    //Use arguments attributes, content
    this.p({class: 'new'}, 'demo')
  
Filter criteria is defined in the follwing ways: 

    var settings = {
      filter_criteria: {
              country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],
              age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'age'],
              states: ['#state_list input:checkbox .EVENT.click .SELECT.:checked', 'states.ARRAY.state_id'],
        }
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

Triggering the filter
---------------------

    var fJS = FilterJS(people, "#people_list", view, settings);

This will render each JSON object to html and append to '#people_list' div.
Second arg is object render function which can be customized as show above.

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

    var mustacheView = function(person){
        return Mustache.to_html(mustache_template, person);
    };

Demo
----
To see the sample demo, clone this repo and open demo/filterjs.html in your browser

Examples
--------

[GoodInKind Services](http://www.goodinkind.com/services)
[GoodInKind NonProfits](http://www.goodinkind.com/nonprofits)

If you use this, please send me an email, I shall add your link here!

Contributing
------------
Please send me a pull request so that this can be improved.

License
-------
This is released under the MIT license.
