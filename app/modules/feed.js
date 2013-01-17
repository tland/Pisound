define([
  // Application.
  "app",

  // Libs
  "backbone",

  // Views
  "modules/feed/feed",

  "modules/post",

  // Plugins
  //"plugins/backbone-localstorage"  
],

// Map dependencies from above array.
function(app, Backbone, View, Post) {

  // Create a new module.
  var Feed = app.module();

  // Default model.

  // Default collection.
  Feed.Collection = Backbone.Collection.extend({
    
    model: Post.Model,

    feedUrl: "http://feeds.feedburner.com/tedtalks_audio/",

    parse: function(result) {
      return result.feed.entries;
    },

    sync: function(method, model, options) {
      if (method == 'read') {
        var feed = new google.feeds.Feed(this.feedUrl);
        feed.includeHistoricalEntries();
        feed.setNumEntries((options && options.numEntries) || 15);

        feed.load(function(result) {
          if (result.error) {
            options.error(model, result);
          } else {
            options.success(result);
          }
        });
      } else {
        throw new Error("Unsupported method: " + method);
      }    
    }
  });

  // Attach the Views sub-module into this module.
  Feed.View = View;  

  // Return the module for AMD compliance.
  return Feed;

});
