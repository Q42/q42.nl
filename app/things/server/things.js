import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'

import { Things } from '../lib/collections'

Meteor.publish("things", (thingIds) => {
  check(thingIds, Match.Optional(Array));
  // if we specify IDs, we get the content too
  if (thingIds)
    return Things.find({name: {$in: thingIds}});
  else
    return Things.find({}, {fields: {name: 1}});
});

Meteor.startup(() => {

  // XXX: loop over everything in the /things/ folder and insert it rather
  // than doing this manually
  for (let thingId of [
    "benbenet", "game-of-drones",
    "jumpstarts-header", "jumpstarts-intro",
    "livelearn", "nannii", "paper", "shell",
    "spinn", "swisscom", "taxi-electric", "tesloop",
    "umuntu-media", "moti", "nexi", "locali",
    "printr", "stockit", "kazoo", "nl-projecten-intro"
  ]) {
    let $set = {
      name: thingId
    };
    try {
      if (thingId.indexOf("en-") === 0)
        $set.content_en = Assets.getText(`things/${thingId}.html`);
      if (thingId.indexOf("nl-") === 0)
        $set.content_nl = Assets.getText(`things/${thingId}.html`);

      Things.upsert({name: thingId}, {$set: $set});
    } catch (e) {
      console.log("Couldn't upsert Thing:", e);
    }
  }
});
