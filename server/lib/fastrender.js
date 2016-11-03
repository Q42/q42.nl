import { FastRender } from 'meteor/meteorhacks:fast-render'

FastRender.route( "/", function() {
  this.subscribe("latestMediumPosts");
});
