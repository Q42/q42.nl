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

Meteor.methods({
  addCoffee() {
    coffeeRef.push().set({
      coreid: 'q42.nl-test',
      data: 'espresso',
      event: 'store-coffee',
      location: 'q020',
      published_at: new Date().toISOString(),
    });
  }
});

Meteor.publish('coffeeCounter', function() {
  this.added('coffeeCounter', 'main', { counter: countCoffeeToday() });

  const onChildAdded = (data) => {
    this.changed('coffeeCounter', 'main', { counter: countCoffeeToday() });
  }

  recentCoffee.limitToLast(1).on('child_added', onChildAdded);
  this.onStop(() => {
    recentCoffee.limitToLast(1).off('child_added', onChildAdded);
  });

  this.ready();
});
