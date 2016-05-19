import { Meteor } from 'meteor/meteor'

// Modification of the standard Meteor publish method
// This one also includes observeChanges handlers
export const publishWithObserveChanges = function (name, fn) {
  Meteor.publish(name, function() {
    var self = this;
    var handle = fn.apply(this, arguments).observeChanges({
      added: function (id, fields) {
        self.added(name, id, fields);
      },
      changed: function (id, fields) {
        self.changed(name, id, fields);
      },
      removed: function (id) {
        self.removed(name, id);
      }
    });
    self.ready();
    self.onStop(function () {
      handle.stop();
    });
  });
};
