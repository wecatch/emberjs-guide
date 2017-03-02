import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return new Ember.RSVP.Promise(function(resolve, reject){
            setTimeout(function(){
                reject({message: 'I am model error message'});
            }, 1000);
        });
    }
});
