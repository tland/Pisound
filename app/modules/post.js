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
      // Most image urls from Techcrunch support the w param for server-side scaling.
      // Replacing the default value with 192 for a larger image that looks nicer in the UI
      return mediaGroups && mediaGroups[0].contents[0].url.replace(/w=\d+/, "w=192");
    } 
  });

  // Default collection.

  Post.View = View;

  // Return the module for AMD compliance.
  return Post;

});
