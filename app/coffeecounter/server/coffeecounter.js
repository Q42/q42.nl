import { Meteor } from 'meteor/meteor'
import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: 'https://iot-api.firebaseio.com',
});

const startOfDay = new Date(new Date().setHours(0,0,0,0)).toISOString();
const coffeeRef = firebase.database().ref('coffee');
const recentCoffee = coffeeRef.orderByChild('published_at').startAt(startOfDay);

let counter = [];
recentCoffee.on('child_added', (data) => {
  counter.push(data.val());
});

function countCoffeeToday() {
  counter = counter.filter(c => c.published_at > new Date(new Date().setHours(0,0,0,0)).toISOString());
  return counter.length;
}

Meteor.publish('coffeeCounter', function() {
  this.added('coffeeCounter', 'main', { counter: countCoffeeToday() });

  const interval = Meteor.setInterval(() => {
    this.changed('coffeeCounter', 'main', { counter: countCoffeeToday() });
  }, 1000);
  this.onStop(() => {
    Meteor.clearInterval(interval);
  });

  this.ready();
});
