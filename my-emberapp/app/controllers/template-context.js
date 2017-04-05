import Ember from 'ember';

export default Ember.Controller.extend({
    firstName: 'Jone',
    lastName: 'Snow',
    people: [{
        firstName: 'Jone'
    },{
        firstName: 'Sum'
    }],
    child: {
        name: 'sum',
        age: 10
    }
});
