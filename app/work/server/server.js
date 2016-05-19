import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _ } from 'meteor/underscore'

import { Work, Media } from '../lib/collections'

Meteor.publishComposite("work", function(tag, type) {
  const alwaysFilter = {draft: false};
  let fields = {
    name: 1, clientName: 1, intro_nl: 1, image: 1,
    "properties.pinned": 1, slogan_nl: 1
  };
  let query = {};
  if (tag) {
    query = {"properties.tags": {$in: [tag]}};
  }
  else if (type) {
    query = {type: type};
  }

  return [
    {
      find: function() {
        return Work.find(_.extend(alwaysFilter, query), {fields: fields});
      },
      children: [
        {
          find: function(workItem) {
            // XXX: only the small image for now
            return workItem.image ?
              Media.find(
                {$or: [{_id: workItem.image.small},{_id: workItem.image.main}]},
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
        }
      ]
    }
  ];

  return Work.find(_.extend(alwaysFilter, query), {fields: fields});
});

Meteor.publish("workTags", function() {
  const work = Work.find({}, {fields: {_id: 1, "properties.tags": 1}}).fetch();
  const tags = _.map(work, w => w.properties.tags);
  this.added("work_tags", new Mongo.ObjectID(), {
    tags: _.compact(_.uniq(_.flatten(tags))).sort()
  });
  this.ready();
});
