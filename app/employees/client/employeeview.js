import { Template } from 'meteor/templating'

import { polaroidVisibility } from './lib/global'

Template.employeeView.helpers({
  firstname: function() {
    return this.name ? this.name.split(" ")[0] : "droid";
  },
  email: function() {
    return this.email || this.handle;
  },
  showPolaroid: function() {
    return polaroidVisibility.equals(this._id, true);
  }
});

Template.employeeView.events({
  "mouseenter .qer, click .qer": function() {
    polaroidVisibility.set(this._id, true);
  },
  "mouseleave .qer": function(evt) {
    polaroidVisibility.set(this._id, false);
  }
});
