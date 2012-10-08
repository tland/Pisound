define([
  // Application.
  "app",

  "modules/photo/post"
],

// Map dependencies from above array.
function(app, View) {

  // Create a new module.
  var Post = app.module();

  // Default model.
  Post.Model = Backbone.Model.extend({
    name: "Post",
     
    getImage: function() {
      var mediaGroups = this.get("mediaGroups");

      return mediaGroups && mediaGroups[0].contents[0].thumbnails[0].url;
    },

    getAudio: function() {
      var mediaGroups = this.get("mediaGroups");

      return mediaGroups && mediaGroups[0].contents[0].url;
    }
  });

  // Default collection.

  Post.View = View;

  // Return the module for AMD compliance.
  return Post;

});
