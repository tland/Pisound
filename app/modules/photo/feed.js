define([
  "jquery",
  
  "use!libs/jquery.imagesloaded",
  "backbone",
  "modules/pin",
  "modules/player",

  // Plugins
  "plugins/infiniScroll"
],
function($, jqImagesLoaded, Backbone, Pin, Player) {

  var View = Backbone.View.extend({
    template: "layouts/feed",
    views: [],

    initialize: function() {
      this.collection.on("reset", function() {
        this.render();
      }, this);

      this.player = this.options.player;

      $(window).resize(_.bind(this.doLayout, this));

      this.infiniScroll = new InfiniScroll(this, this.collection, {
        success: this.appendRender
      });
    },

    getNumColumns: function() {
      return Math.floor(this.$el.width() / this.columnWidth);
    },

    minIndex: function(list) {
      var minValue = Number.MAX_VALUE;
      var minIndex = null;
      _(list).each(function(value, index) {
        if(value < minValue) {
          minIndex = index;
          minValue = value;
        }
      });
      return minIndex;
    },

    doLayout: function() {
      var numColumns = this.getNumColumns();
      if(numColumns === this.lastNumColumns) return;

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
      if(!this.views.length) {
        this.$el.empty();
        this.collection.each(function(post) {
          var view = new Player.View({
            post: post,
            player: this.player
          });
          this.views.push(view);
          this.insertView(view);

        }, this);
      } 
      else {
        for(var i = 0; i < this.collection.length; i++) {
          var view = new Player.View({
            post: this.collection.at(i),
            player: this.player
          });
          this.views.push(view);
          this.insertView(view);
        }
      }
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
    },

    appendRender: function(viewContainer, collection, response) {
      viewContainer.render();
    }
  });

  return View;
});