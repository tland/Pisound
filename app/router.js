define([
  // Application.
  "app",

  // Modules.
  "modules/todo",

  "modules/feed",
  "modules/player"
],

function(app, Todo, Feed, Player) {

  // An example Backbone application contributed by
  // [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
  // [LocalStorage adapter](backbone-localstorage.js)
  // to persist Backbone models within your browser.

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      this.loadFeed();
      //this.loadTodoList();
    },

    loadFeed: function() {
      var coll = new Feed.Collection();
      var g_player =  new Player.Model();

      app.useLayout("feed").setViews({       
        // Attach the root content View to the layout.
        ".feed": new Feed.View({
          collection: coll,
          player: g_player
        })
      }).render();

      coll.fetch();      
    },

    loadTodoList: function() {
      // Create a new Todo List.
      var list = new Todo.List();

      // Use the main layout.
      app.useLayout("main").setViews({
        // Attach the root content View to the layout.
        "form": new Todo.Views.Form({
          collection: list
        }),

        // Attach the stats View into the content View.
        ".stats": new Todo.Views.Stats({
          collection: list
        }),

        // Attach the list View into the content View.
        ".list": new Todo.Views.List({
          collection: list
        })
      }).render();

      // Fetch the data from localStorage
      list.fetch();      
    }
  });

  return Router;

});
