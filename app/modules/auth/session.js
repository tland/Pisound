define([
  "jquery",

  "backbone",

  "modules/auth/signin",
  "modules/auth/signup"
],

function($, Backbone, LoginView, SignupView) {

  var View = Backbone.View.extend({
    template: "layouts/users/auth_status",

    events: {
      'click .show-signin': 'show_signin',
      'click .signout': 'signout',
      'click .show-signup': 'show_signup',
    },

    initialize: function() {

      that = this;
      this.session = this.options.session;
      
      this.session.on('change:auth', function(session) {
        this.render();
      }, this)

    },

    serialize: function() {
      return {
        authenticated: this.session.authenticated(), 
        username: this.session.username
      };
    },

    show_signin: function() {
      var authView = new LoginView({session: this.session});
      authView.show();
    },

    signout: function() {
      return this.session.signout();
    },

    show_signup: function() {
      var authView = new SignupView({session: this.session});
      authView.show();
    }
  });

  return View;
});