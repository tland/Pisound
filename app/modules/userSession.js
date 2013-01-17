define([
  // Application.
  "app",
  "use!libs/jquery.cookie",

  "modules/auth/session"
],

// Map dependencies from above array. 
function(app, jqCookie, View) {

  // Create a new module.
  var UserSession = app.module();

  // Default model.
  UserSession.Model = Backbone.Model.extend({
    name: "UserSession",

    // MongoDB uses _id as default primary key
    idAttribute: "user_id",

    urlRoot: function() {
      return "/api" + this.baseUrl;
    },

    defaults: {
      access_token: null,
      user_id: null,
      username: ""
    },
    
    initialize: function() {
      this.baseUrl = "/users/session";
      this.load_token();
      this.auth = this.authenticated();
      this.getAuth();
    },

    parse: function(resp) {
      this.user_id = resp.id;
      this.auth = resp.auth;
      this.username =  resp.username;
      this.save_token(resp);
      return resp;
    },

    authenticated: function() {
      console.log("user auth: " + this.auth);
      return Boolean(this.get("access_token"));
    },
    
    save_token: function(resp) {
      $.cookie('user_id', resp.id);
      return $.cookie('access_token', resp.access_token);
    },

    destroy_token: function() {
      $.cookie('user_id', null);
      $.cookie('access_token', null);
    },
  
    load_token: function() {
      return this.set({
        user_id: $.cookie('user_id'),
        access_token: $.cookie('access_token')
      });
    },

    signin: function(creds) {
      this.baseUrl =  "/users/session";
      that = this;
      // Do a POST to /session and send the serialized form creds
      this.save(creds, {
         success: function(model, resp) {
          that.set({auth: true, _csrf: resp._csrf});
        }
      });
    },

    signout: function() {
      this.baseUrl = "/users/session";
      // Do a DELETE to /session and clear the clientside data
      var that = this;
      this.destroy({
        success: function (model, resp) {
          model.clear()
          model.id = null;
          model.destroy_token();
          // Set auth to false to trigger a change:auth event
          // The server also returns a new csrf token so that
          // the user can relogin without refreshing the page
          that.set({auth: false/*, _csrf: resp._csrf*/});
        }
      });
    },

    signup: function(creds) {
      this.baseUrl =  "/users";
      // Do a POST to /session and send the serialized form creds
      this.save(creds, {
         success: function(model, resp) {
          that.set({auth: true, _csrf: resp._csrf});
        }
      });
    },

    getAuth: function(callback) {
      console.log("session getAuth");
      this.baseUrl = "/users"
      // getAuth is wrapped around our router
      // before we start any routers let us see if the user is valid
      this.fetch({
          success: callback
      });
    }
  });

  // Default collection.

  UserSession.View = View;

  // Return the module for AMD compliance.
  return UserSession;

});
