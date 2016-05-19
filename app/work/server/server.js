import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _ } from 'meteor/underscore'

import { Work } from '../lib/collections'

Meteor.publish("work", (slug, tag) => {
  if (slug)
    return Work.find({slug: slug});
  else if (tag)
    return Work.find({"properties.tags": {$in: [tag]}});
  else
    return Work.find();
});
Meteor.publish("workTags", function(){
  const work = Work.find({}, {fields: {_id: 1, "properties.tags": 1}});
  const tags = _.map(work.fetch(), (w) => w.properties.tags);
  this.added("work_tags", new Mongo.ObjectID(), {
    tags: _.compact(_.uniq(_.flatten(tags))).sort()
  });
  this.ready();
});

Meteor.startup(() => {
  if (Work.find().count() === 0) {
    Work.insert({
      slug: "klm-apple-watch",
      name: "KLM for Apple Watch",
      clientName: "KLM",
      slogan: "Check in from your watch",
      slogan_nl: "Check in vanaf je horloge",
      intro: `
        <p>Together with AKQA we made checking in with KLM even easier!
        Your Apple Watch gives you insight into your next flight, terminal,
        gate, seat and even how long it'll take to walk to your gate.</p>
        <p><a href="http://localhost/blog/post/125336396528/klms-apple-watch-app-catches-your-plane">Read how we did it</a></p>
      `,
      intro_nl: `
        <p>Samen met AKQA hebben we inchecken bij KLM nog makkelijker gemaakt!</p>
        <p><a href="http://localhost/blog/post/125336396528/klms-apple-watch-app-catches-your-plane">Lees hoe we het gedaan hebben</a></p>
      `,
      properties: {
        pinned: false,
        category: "project",
        qers: ["guus", "kamil", "jasper"],
        date: new Date("2015-09-01"),
        tags: ["travel", "apple-watch", "swift", "ios", "app", "wearable"]
      },
      image: {
        url: "https://storage.googleapis.com/static.q42.nl/images/projecten/klm-applewatch3.jpg",
        caption: "So much more convenient than a stack of paper",
        caption_nl: "Zoveel handiger dan een stapel papier"
      },
      things: [
        {
          size: 'large',
          thingId: 'tesloop',
          align: 'right'
        },
        {
          size: 'small',
          thingId: 'game-of-drones'
        },
        {
          size: 'large',
          thingId: 'shell'
        }
      ]
    });
  }
});
