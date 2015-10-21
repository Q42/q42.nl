iot_api = DDP.connect('https://iot-api.scalingo.io/');
@CoffeeCounter = new Meteor.Collection('coffeecups', iot_api);
