// import { Meteor } from 'meteor/meteor'
// import { DDP } from 'meteor/ddp'
// import { Mongo } from 'meteor/mongo'
// import { Counts } from 'meteor/tmeasday:publish-counts'
// import { _ } from 'meteor/underscore'
//
// const iotApi = DDP.connect("https://iot-api.scalingo.io");
// const CoffeeCups = new Mongo.Collection("coffeecups", iotApi);
//
// Meteor.publish("coffeeCounter", function() {
//   const yesterday = new Date(new Date().setHours(0,0,0,0)).toISOString();
//   Counts.publish(this, "coffeeCups",
//     CoffeeCups.find({published_at: {$gt: yesterday}}));
// });
//
// Meteor.publish("coffeeCounterHistory", function() {
//   const threeWeeks = 1000 * 60 * 60 * 24 * 21;
//   let threeWeeksAgo = new Date().setHours(0,0,0,0) - threeWeeks;
//   threeWeeksAgo = new Date(threeWeeksAgo).toISOString();
//   const cups = CoffeeCups.find({published_at: {$gt: threeWeeksAgo}},
//     {fields: {published_at: 1}});
//
//   const grouped = _.groupBy(cups.fetch(), (doc) => {
//     return +new Date(doc.published_at).setHours(0,0,0,0);
//   });
//   const result = _.map(grouped, arr => arr.length).join(",");
//
//   // XXX: make this reactive to the above cursor if we want it to be live
//   this.added("coffeecups", null, { values: result });
//   this.ready();
// });
