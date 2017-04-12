import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import { Employees } from '../../employees/lib/shared'

let interval = null;

Template.numLinesOfCode.onCreated(function() {
  this.linesOfCode = new ReactiveVar(0);
  interval = Meteor.setInterval(() => {
    Meteor.call('linesOfCodeCounter', (err, res) => {
      this.linesOfCode.set(res);
    });
  }, 10000);
  Meteor.call('linesOfCodeCounter', (err, res) => {
    this.linesOfCode.set(res);
  });
});

Template.numLinesOfCode.onDestroyed(function() {
  Meteor.clearInterval(interval);
});

Template.numLinesOfCode.helpers({
  numLinesOfCode() {
    return Template.instance().linesOfCode.get();
  }
});
