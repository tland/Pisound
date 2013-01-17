// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main.js application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    use: "../assets/js/plugins/use"
  },

  shim: {
    lodash: {
      exports: '-'
    },

    backbone: {
      deps: ["jquery", "lodash"],
      exports: "Backbone"
    },

    // Backbone.layoutmanager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],

    // Backbone.localstorage depends on Backbone.
    //"plugins/backbone-localstorage": ["backbone"],

    // Backbone-forms depends on Backbone.
    //"plugins/backbone-forms": ["backbone"],     
  },

  use: {
    "libs/jquery.imagesloaded": {
      deps: ["jquery"],
      attach: function($) {
        return $.fn.imagesLoaded;
      }
    },

    "libs/jquery.cookie": {
      deps: ["jquery"],
      attach: function($) {
        return $.fn.cookie;
      }
    }
  }  
});
