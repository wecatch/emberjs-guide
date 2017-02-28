import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('loading-lab', function() {
    this.route('bar', function() {
      this.route('slow-model');
      this.route('slow-model-loading');
      this.route('slow-model-no-custome');
    });
  });
});

export default Router;
