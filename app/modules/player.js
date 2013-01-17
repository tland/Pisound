define([
  // Application.
  "app",

  "modules/photo/pinPlayer",

  "modules/post"
],

// Map dependencies from above array.
function(app, View, Post) {

  // Create a new module.
  var Player = app.module();

  // Default model.
  Player.Model = Backbone.Model.extend({
    defaults: {
      'state': 'stop'
    },
    
    initialize: function() {
      //this.set({'id': id + 1});
      this.createAudio();
      this.activeView = '';
      this.activeViewId = 0;
    },

    createAudio: function() {
      this.audio = new Audio();
    },

    setAudioUrl: function(url) {
      this.audio.src = url;
    },

    updateTrack: function(view, viewId, url) {
      if (this.activeViewId != viewId && this.activeView !== '' && this.activeView.isPlaying()) {
        // stop the current active view if it is playing 
        // the audio.
        this.activeView.toggleState();
      }    

      this.activeView = view;
      this.activeViewId = viewId;

      this.setAudioUrl(url);
      if (this.get('state') == 'play') {
        this.audio.play();
      } else {
        this.audio.pause();
      }      
    },
    
    play: function() {
      this.set({'state': 'play'});
    },
    
    pause: function() {
      this.set({'state': 'pause'});
    },
    
    isPlaying: function() {
      return (this.get('state') == 'play');
    },
    
    isStopped: function() {
      return (!this.isPlaying());
    },
    
    logCurrentTrack: function() {
      console.log("Player track is: " + this.get('currentTrackIndex'), this);
    }  
  });

  // Default collection.

  Player.View = View;

  // Return the module for AMD compliance.
  return Player;

});
