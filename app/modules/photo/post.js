define([
  "jquery",

  "backbone"
],

function($, Backbone) {

  var View = Backbone.View.extend({
    className: 'post',
    template: "photo/post",

    events: {
      'click': 'stopPropagation'
    },

    initialize: function() {
      $('#lightbox').click(_.bind(this.hide, this));
      $(document).on('keydown.lightbox', _.bind(this.onKeyDown, this));
      this.post = this.options.post;
    },

    serialize: function() {
      return this.post.toJSON();
    },

    show: function() {
      $('#lightbox').append(this.render().$el).show();
      $('body').css('overflow', 'hidden');
    },

    hide: function() {
      this.remove();
      $('#lightbox').hide();
      $('body').css('overflow', '');
      $('#lightbox').off();
      $(document).off('.lightbox');
    },

    onKeyDown: function(e) {
      if (e.keyCode == 27) this.hide();
    },

    stopPropagation: function(e) {
      e.stopPropagation();
    }
  });

  return View;
});