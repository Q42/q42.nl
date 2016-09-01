import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _ } from 'meteor/underscore'

import { Work, Media } from '../lib/collections'

Meteor.publishComposite("work", (tag, type) => {
  const query = { draft: false };

  const langEn = Meteor.settings.public.siteVersion === "en";

  const alwaysPublishFields = {
    "properties.pinned": 1,
    "properties.secret": 1,
    "properties.date": 1
  };
  const fields = {
    name: 1, clientName: 1, image: 1,
    [langEn ? 'intro' : 'intro_nl']: 1,
    [langEn ? 'slogan' : 'slogan_nl']: 1,
    ...alwaysPublishFields
  };
  const secretFields = {
    clientName: 1,
    ...alwaysPublishFields
  };

  if (tag) {
    Object.assign(query, { "properties.tags": {$in: [tag]} });
  }
  else if (type) {
    Object.assign(query, { type: type });
  }

  const workQueryObject = (fields, secret) => ({
    find() {
      return Work.find(
        { ...query, "properties.secret": secret },
        { fields }
      );
    },
    children: [{
      find(workItem) {
        return workItem.image ?
          Media.find(
            { $or: [{_id: workItem.image.small},{_id: workItem.image.main}] },
            {
              fields: {
                file: 1, imageWidth: 1, imageHeight: 1,
                title: 1, description: 1
              },
              limit: 2
            }
          )
          : null;
      }
    }]
  });

  return [
    workQueryObject(fields, false),
    workQueryObject(secretFields, true)
  ];
});

Meteor.publish("workTags", function() {
  const work = Work.find({}, {fields: {"properties.tags": 1}}).fetch();
  const tags = _.map(work, w => w.properties.tags);
  this.added("work_tags", new Mongo.ObjectID(), {
    tags: _.compact(_.uniq(_.flatten(tags))).sort()
  });
  this.ready();
});
