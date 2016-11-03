import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

// Template.hero.onRendered(function() {
//   const client = new WebSocket('ws://q42-live-1.herokuapp.com/test');
//   const canvas = document.getElementById('bg-video');
//   try {
//     new jsmpeg(client, {canvas:canvas});
//   }
//   catch (e) {}
// });

Template.hero.events({
  'click #bg-video-pause'(evt, tmpl) {
    const videoEl = tmpl.find('#bg-video');
    const buttonEl = evt.target;
    let str = "";
    if (videoEl.paused) {
      videoEl.play();
      str = '&#9612;&#9612; Pause video';
      buttonEl.innerHTML = str;
    } else {
      videoEl.pause();
      str = '&#9612;&#9612; Play video';
      buttonEl.innerHTML = str;
    }
  }
})

Template.hero.helpers({
  show: function() {
    return (FlowRouter.getRouteName() === "home");
  }
});
