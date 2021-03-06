define([
  "jquery",

  "backbone",

  // Plugins
  //"plugins/backbone-forms"
],

function($, Backbone) {

  var View = Backbone.View.extend({
    template: "layouts/users/signin",
    className: 'auth',

    urlRoot: "/users/session",

    events: {
      'click': 'stopPropagation',
      'submit form.signin': 'signin', // On form submission
      'click .show-signup': 'signin'
    },

    initialize: function() {
      $('#lightbox').click(_.bind(this.hide, this));
      $(document).on('keydown.lightbox', _.bind(this.onKeyDown, this));
      
      that = this;
      this.session = this.options.session;
      
      this.session.on('change:auth', function(session) {
        this.hide();
      }, this);

      // This snipper should usually be loaded elsewhere
      // It simply takes a <form> and converts its values to an object
      $.fn.serializeObject = function() {
          var o = {};
          var a = this.serializeArray();
          $.each(a, function() {
              if (o[this.name] !== undefined) {
                  if (!o[this.name].push) {
                      o[this.name] = [o[this.name]];
                  }
                  o[this.name].push(this.value || '');
              } else {
                  o[this.name] = this.value || '';
              }
          });
          return o;
      };
    },

    serialize: function() {
      return { authenticated: this.session.authenticated() };
    },

    signin: function(ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Signing in..').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var creds = $(ev.currentTarget).serializeObject();
      this.session.signin(creds);
      return false;
    },

    show: function() {
      this.render().done(function() {
        $('#lightbox').empty().append(this.$el).show();
      });

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