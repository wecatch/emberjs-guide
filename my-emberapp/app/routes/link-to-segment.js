import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
        return {
            1: {
                name: 'Jone',
                value: 'Snow',
                id: 2
            },
            2: {
                name: 'Smith',
                value: 'Snow',
                id: 1
            }
        }[params.segment_id]
    }
});
