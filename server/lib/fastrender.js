import { FastRender } from 'meteor/staringatlights:fast-render'

FastRender.onAllRoutes(function() {
  this.subscribe("employeeCount");
});

FastRender.route( "/", function() {
  this.subscribe("employeeCount");
  this.subscribe("latestMediumPosts");
});
