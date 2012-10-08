define([
  // Application.
  "app",

  "backbone",

  // Views
  "modules/photo/pin"
],

// Map dependencies from above array.
function(app, Backbone, View) {

  // Create a new module.
  var Pin = app.module();

  // Default model.
  Pin.Model = Backbone.Model.extend({
    defaults: {
      'state': 'stop'
    },
  });

  // Default collection.

  Pin.View = View;

  // Return the module for AMD compliance.
  return Pin;

});
