import { Template } from 'meteor/templating'

import { polaroidVisibility } from './lib/global'

Template.polaroid.onRendered(function(){
  this.autorun( () => {
    if ( !(polaroidVisibility.equals(Template.currentData()._id)) ){
      $polaroid = this.$(".polaroid");
      rotate = (Math.floor(Math.random() * 21) - 10);
      rotateValue = `translate(-30px, -30px) rotateZ(${rotate}deg)`;
      _.each(["webkit", "moz", "ms", "o"], (type) =>
        $polaroid.css(`-${type}-transform`, rotateValue));
      $polaroid.css("transform", rotateValue);

      if (this.find("video")) this.find("video").play();
    }
  });
});

Template.polaroid.onDestroyed(function(){
  this.find("video") && this.find("video").pause();
});

Template.polaroid.helpers({
  email: function(){
    return this.email || this.handle;
  },
  supportsWebm: () => {
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp8, vorbis"') === "probably";
  }
});

Template.polaroid.events({
  "click .closePolaroid": (evt) => {
    polaroidVisibility.set(Template.currentData()._id, false);
    // prevent the mouseenter listener on employeeView from firing
    evt.stopPropagation();
  }
});
