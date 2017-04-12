import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import { Employees } from '../../employees/lib/shared'

const interval = null;

Template.numLinesOfCode.onCreated(function() {
  this.linesOfCode = new ReactiveVar(0);
  if (interval) {
    Meteor.clearInterval(interval);
  }
  Meteor.setInterval(() => {
    Meteor.call('linesOfCodeCounter', (err, res) => {
      this.linesOfCode.set(res);
    });
  }, 10000);
  Meteor.call('linesOfCodeCounter', (err, res) => {
    this.linesOfCode.set(res);
  });
});

Template.numLinesOfCode.helpers({
  numLinesOfCode() {
    return Template.instance().linesOfCode.get();
  }
});
