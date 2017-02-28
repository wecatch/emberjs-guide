import Ember from 'ember';
import RSVP from 'rsvp';


export default Ember.Route.extend({
    model(){
        return new Ember.RSVP.Promise(function(resolve, reject){
            setTimeout(function(){
                resolve({message: 'I am slow model message'});
            }, 5000);
        });
    },
    actions: {
        // loading(transition, originRoute) {
        //     let controller = this.controllerFor('loading-lab.bar.slow-model');
        //     controller.set('currentlyLoading', true);
        //     transition.promise.finally(function() {
        //       controller.set('currentlyLoading', false);
        //     });
        //     return true;
        // }
    }
});
