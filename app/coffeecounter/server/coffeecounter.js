import { Meteor } from 'meteor/meteor'
import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: "https://iot-api.firebaseio.com",
});

var coffeeRef = firebase.database().ref('coffee');

const startOfDay = new Date(new Date().setHours(0,0,0,0)).toISOString();
var recentCoffee = coffeeRef.orderByChild('published_at').startAt(startOfDay);

var counter = 0;
recentCoffee.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    counter++;
  });
});

Meteor.publish("coffeeCounter", function() {
    this.added("coffeeCounter", null, { counter });
    this.ready();
});
