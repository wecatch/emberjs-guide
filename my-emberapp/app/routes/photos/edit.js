import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
        return {'id': params.photo_id}
    },
    queryParams: {
        keyword: ''
    }
});
