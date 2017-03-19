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
  this.route('error-lab', function() {
    this.route('bar', function() {
      this.route('error-model');
      this.route('error-model-no-custome');
    });
    this.route('bar-error');
  });
  this.route('page-not-found', {path: '/*wildcard'});
  this.route('component-lab', function() {
    this.route('first-component');
    this.route('second-component');
  });
});

export default Router;
