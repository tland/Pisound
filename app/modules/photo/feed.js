define([
  "jquery",
  
  "use!libs/jquery.imagesloaded",
  "backbone",
  "modules/pin",
  "modules/player"
],

function($, jqImagesLoaded, Backbone, Pin, Player) {

  var View = Backbone.View.extend({
    template: "photo/pinPlayer",

    views: [],

    initialize: function() {
      this.collection.on("reset", function() {
        this.render();
      }, this);

      this.player = this.options.player;

      $(window).resize(_.bind(this.doLayout, this));
    },

    getNumColumns: function() {
      return Math.floor(this.$el.width() / this.columnWidth);
    },

    minIndex: function(list) {
      var minValue = Number.MAX_VALUE;
      var minIndex = null;
      _(list).each(function(value, index) {
        if (value < minValue) {
          minIndex = index;
          minValue = value;
        }
      });
      return minIndex;
    },

    doLayout: function() {
      var numColumns = this.getNumColumns();
      if (numColumns === this.lastNumColumns) return;

      var tops = [];
      _(numColumns).times(function() {
        tops.push(0);
      });

      // Add each item to the current shortest column
      _(this.views).each(function(view) {
        var curColumn = this.minIndex(tops);
        var top = tops[curColumn];
        view.$el
          .css("top", top)
          .css("left", curColumn * this.columnWidth);

        tops[curColumn] = top + view.$el.outerHeight(true);
      }, this);

      this.lastNumColumns = numColumns;
    },

    // Insert all subViews prior to rendering the View.
    beforeRender: function() {
      this.$el.empty();
      this.collection.each(function(post) {
        var view = new Player.View({
            post: post, 
            player: this.player
        });
        this.views.push(view);
        this.insertView(view);

      }, this);      
    },

    render: function(manage) {
      return manage(this).render();
    },

    // Adjust the layout after the view is rendered.
    afterRender: function() {
      var els = $(_(this.views).pluck('el'));
      els.imagesLoaded().done(_.bind(function() {
        $('#loading').hide();
        els.appendTo(this.$el);
        this.columnWidth = els.outerWidth(true);
        this.lastNumColumns = null;
        this.doLayout();
      }, this));
    }
  });

  return View;
});