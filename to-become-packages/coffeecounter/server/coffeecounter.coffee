Meteor.startup ->
  Meteor.publish "coffeeCounter", -> CoffeeCounter.find()
