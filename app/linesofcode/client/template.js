import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'

import { Employees } from '../../employees/lib/shared'

Template.numLinesOfCode.helpers({
  numLinesOfCode() {
    const numQers = Employees.find({labels:'Software Engineer'}).count();
    let counter = 0;
    let to = null;

    if (_.contains([0,6], new Date().getDay()))
      return counter;

    class Qer {
      constructor() {
        this.codeLinesPerDay = _.random(100, 600);
        this.hoursWorkPerDay = _.random(6, 8);

        this.startsAt = new Date();
        this.startsAt.setHours(_.random(8, 11));
        this.startsAt.setMinutes(_.random(60));

        this.workLength = new Date(0);
        this.workLength.setHours(Math.round(this.hoursWorkPerDay));
      }
      linesWritten(date) {
        const timeWorked = new Date(date.getTime() - this.startsAt.getTime());
        const perc = Math.min(1, timeWorked.getTime() / this.workLength.getTime());
        return this.codeLinesPerDay * perc;
      }
    }

    let Qers = [];
    _.times(numQers, () => Qers.push(new Qer()));

    cycle = function() {
      Meteor.clearTimeout(to);
      let lines = 0;
      _.times(numQers, (i) => lines += Qers[i].linesWritten(new Date()));
      counter = Math.max(Math.round(lines), 0);
      to = Meteor.setTimeout(cycle, 1000);
    };
    cycle();

    return counter;
  }
});
