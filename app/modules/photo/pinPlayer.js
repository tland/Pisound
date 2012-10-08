define([
  "jquery",
  
  "modules/pin"
],

function($, Pin) {

  var View = Pin.View.extend({

    template: "photo/player",

    events: _.extend({
      'click .play': 'play',
      'click .pause': 'pause'
    }, Pin.View.prototype.events),

    initialize: function() {
      _.bindAll(this, 'updateState'); 

      this.post = this.options.post;
      this.player = this.options.player;
      this.state = 'stop';

      this.bind('change:state', this.updateState);    
    },

    serialize: function() {
      return {
        title: this.post.get("title"), 
        imageUrl: this.post.getImage(),
        audioUrl: this.post.getAudio()
      };
    },

    toggleState: function() {
      if (this.state == 'play') {
        this.state = 'pause';
      } else {
        this.state = 'play';
      }

      this.$("button.play").toggle(this.isStopped());
      this.$('button.pause').toggle(this.isPlaying());
    },

    updateState: function() {
      this.updateTrack();
      this.$("button.play").toggle(this.isStopped());
      this.$('button.pause').toggle(this.isPlaying());
    },
    
    updateTrack: function() {
      this.player.updateTrack(
        this,
        this.post.cid,
        this.post.getAudio()
      );
    },

    play: function() {
      this.state = 'play';
      this.player.play();
      this.updateState();
    },
    
    pause: function() {
      this.state = 'pause';
      this.player.pause();
      this.updateState();
    },

    isPlaying: function() {
      return (this.state == 'play');
    },
    
    isStopped: function() {
      return (!this.isPlaying());
    },    

    beforeRender: function() {
    },

    afterRender: function() {
      this.$("button.play").toggle(this.isStopped());
      this.$('button.pause').toggle(this.isPlaying());
    }
  });

  return View;
});