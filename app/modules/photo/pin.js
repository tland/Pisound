define([
  "jquery",
  
  "backbone",
  "modules/post"
],

function($, Backbone, Post) {

  var View = Backbone.View.extend({
    className: 'pin',
    tagName: 'figure',

    template: "layouts/photo/pin",

    events: {
      'click img': 'onClick'
    },

    initialize: function() {
      this.post = this.options.post;
    },

    onClick: function() {
      var postView = new Post.View({post: this.post});
      postView.show();
    },

    serialize: function() {
      return {
        imageUrl: this.post.getImage(),
        audioUrl: this.post.getAudio(),
        title: this.post.get("title")
      };
    }
  });

  return View;
});