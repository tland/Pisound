define([
  // Application.
  "app",

  // Views
  "modules/photo/pin",  
],

// Map dependencies from above array.
function(app, View) {

  // Create a new module.
  var Pin = app.module();

  // Default model.

  // Default collection.

  Pin.View = View;

  // Return the module for AMD compliance.
  return Pin;

});
