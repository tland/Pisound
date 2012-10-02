define([
  "jquery",
  
  "backbone",
  "modules/post"
],

function($, Backbone, Post) {

  var View = Backbone.View.extend({
    className: 'pin',
    tagName: 'figure',

    template: "photo/pin",

    events: {
      'click': 'onClick'
    },

    onClick: function() {
      var postView = new Post.View({model: this.model});
      postView.show();
    },

    serialize: function() {
      return {
        imageUrl: this.model.getImage(),
        title: this.model.get("title")
      };
    }
  });

  return View;
});