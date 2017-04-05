import { Meteor } from 'meteor/meteor'
import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: 'https://iot-api.firebaseio.com',
});

const startOfDay = new Date(new Date().setHours(0,0,0,0)).toISOString();
var coffeeRef = firebase.database().ref('coffee');
var recentCoffee = coffeeRef.orderByChild('published_at').startAt(startOfDay);

Meteor.publish('coffeeCounter', function() {
  var counter = 0;
  var initializing = true;
  recentCoffee.on('child_added', (id) => {
    counter++;

    if(!initializing) {
      this.changed('coffeeCounter', 'main', { counter });
    }
  });

  initializing = false;
  this.added('coffeeCounter', 'main', { counter });
  this.ready();
});
