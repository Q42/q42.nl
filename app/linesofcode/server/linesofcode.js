import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'

import { Employees } from '../../employees/lib/shared'

class Qer {
  constructor() {
    this.codeLinesPerDay = _.random(100, 600);
    this.hoursWorkPerDay = _.random(6, 8);

    this.startsAtMinutes = _.random(8 * 60, 11 * 60);
  }
  linesWritten(date) {
    const dateInMinutes = (date.getHours() * 60) + date.getMinutes();
    const timeWorkedInMinutes = Math.max(0, dateInMinutes - this.startsAtMinutes);
    const minutesWorkPerDay = this.hoursWorkPerDay * 60;
    const perc = Math.min(1, timeWorkedInMinutes / minutesWorkPerDay);
    return this.codeLinesPerDay * perc;
  }
}

let Qers = [];
const numQers = Employees.find({labels:'Software Engineer'}).count();
_.times(numQers, () => Qers.push(new Qer()));

function numLinesOfCode(date) {
  if (_.contains([0,6], date.getDay()))
    return 0;

  let counter = 0;
  let to = null;

  let lines = 0;
  _.times(numQers, (i) => lines += Qers[i].linesWritten(date));
  counter = Math.max(Math.round(lines), 0);

  console.log(`At ${date} we've written ${counter} lines of code.`);
  return counter;
}

Meteor.methods({
  linesOfCodeCounter() {
    return numLinesOfCode(new Date());
  }
});
