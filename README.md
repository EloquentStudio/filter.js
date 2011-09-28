Filter.js
=============

Filter.js is client-side JSON objects filter to show/hide html elements.
Multiple filter criteria can be specified and used in conjunction with 
each other.


Usage
-----

Capture the JSON data (maybe using @people.to_json)

    var people = [{person: {name: 'Jiren', age:26, country: 'India', country_id: 1}}, 
                  {person: {name: 'Joe', age:25, country: 'USA', country_id: 2}}] 

View function call for every object of the people array. It will render 
the HTML template.

    var view = function(person){

      name    = this.span({'class': 'name'}, person.name);
      age     = this.span({'class': 'age'},  person.age);
      country = this.div({'class': 'country'}, person.country);
    
      return this.link('/demo/' + person.id ,{'title': person.name}, [name,age,country]);
    };

/*  
 * Filter is working on html input element value.
 * '#country_list input:checkbox' checkox selector
 * .EVENT.click : bind click event to '#country_list input:checkbox' 
 * .SELECT.:checked : Filter on checked input checkbox. 
 *  country_id : This is a filtering field defined in JSON objects. i.e above people JSON.
 * 
 * For Range.
 *  Define .TYPE.range 
 *  Also set input value like '20-30', below-30, 30-above
 *  <input checked="checked" value="20-30" type="checkbox">
 */
var settings = {
  filter_criteria: {
          country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'country_id'],
          age: ['#age_list input:checkbox .EVENT.click .SELECT.:checked .TYPE.range', 'country_id'],
     }
};

/* This will render each person object to html and append to  '#people_list'.
 * Second arg is object render function. 
 */
new filterJS(people, "#people_list", view, settings);


NOTE
----
- For silder filter see demo.

- Filter on internal array of json object
i.e Filter on country id
  var people = [{person: {name: 'Jiren', age:26, countries:[{ country: 'India', country_id: 1},{ country: 'US', country_id: 2}]}}]
Settings"
  country: ['#country_list input:checkbox .EVENT.click .SELECT.:checked', 'countries.ARRAY.country_id'],


