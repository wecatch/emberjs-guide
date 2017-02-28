import Ember from 'ember';
import RSVP from 'rsvp';


export default Ember.Route.extend({
    model(){
        return new Ember.RSVP.Promise(function(resolve, reject){
            setTimeout(function(){
                resolve({message: 'I am slow model that no custome loading message'});
            }, 5000);
        });
    }
});
