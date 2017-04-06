import { Meteor } from 'meteor/meteor'
import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: 'https://iot-api.firebaseio.com',
});

const startOfDay = new Date(new Date().setHours(0,0,0,0)).toISOString();
const coffeeRef = firebase.database().ref('coffee');
const recentCoffee = coffeeRef.orderByChild('published_at').startAt(startOfDay);

Meteor.publish('coffeeCounter', function() {
  let counter = 0;
  let initializing = true;
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
