// import { Mongo } from 'meteor/mongo'
// import { Template } from 'meteor/templating'
// import { Counts } from 'meteor/tmeasday:publish-counts'
//
// const CoffeeCups = new Mongo.Collection("coffeecups");
//
// Template.numCupsOfCoffee.helpers({
//   numCupsOfCoffee: () => Counts.get("coffeeCups")
// });
//
// Template.numCupsOfCoffeeSparkline.helpers({
//   sparklineData() {
//     const cups = CoffeeCups.findOne();
//     if (cups)
//       return cups.values;
//   }
// });
// 
// Template.numCupsOfCoffeeSparkline.onCreated(function() {
//   this.subscribe("coffeeCounterHistory");
// });
