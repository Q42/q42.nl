IotApi = DDP.connect('https://iot-api.scalingo.io/');
@CoffeeCounter = new Meteor.Collection('coffeecups', IotApi);
