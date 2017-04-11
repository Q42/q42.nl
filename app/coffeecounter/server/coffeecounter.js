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
  const coffee = counter.filter(c => c.published_at > new Date(new Date().setHours(0,0,0,0)).toISOString());
  console.log(`Returning coffee: ${coffee.length} of ${counter.length} are from today.`);
  return coffee.length;
}

Meteor.publish('coffeeCounter', function() {
  this.added('coffeeCounter', 'main', { counter: countCoffeeToday() });
  this.ready();
});
