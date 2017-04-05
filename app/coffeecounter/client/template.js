import { Template } from 'meteor/templating'

const CoffeeCounter = new Mongo.Collection("coffeeCounter");

Template.numCupsOfCoffee.onCreated(function() {
  this.subscribe("coffeeCounter");
});

Template.numCupsOfCoffee.helpers({
  numCupsOfCoffee() {
    const coffeeCounter = CoffeeCounter.findOne();
    if (coffeeCounter)
      return coffeeCounter.counter;
  }
});
