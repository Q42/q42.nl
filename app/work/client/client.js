import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../../../lib/utils'
import { Work, Media } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'

const workSortOrder = {"properties.pinned": 1, "properties.date": -1, name: 1};

Template.projects.onCreated(function() {
  const type = Template.currentData().type || null;
  const category = Template.currentData().category || null;
  this.autorun(() => {
    this.subscribe("work", type, category);
  });
});
Template.projects.helpers({
  workItems() {
    const index = Template.currentData().pinnedFirst ? 1 : 0;
    const group = (arr, n) => _.toArray(_.groupBy(arr, (el, i) => ~~(i/n)));
    const work = Work.find({}, { sort: workSortOrder }).fetch();
    const pinned = work.filter(x => x.properties.pinned).slice(index);
    const unpinned = work.filter(x => !x.properties.pinned);
    const unpinnedGrouped = group(unpinned, 3);
    const zipped = _.zip(pinned, unpinnedGrouped);
    const flat = _.compact(_.flatten(zipped));
    return group(flat, 4);
  }
});

Template.workItem.helpers({
  imageThumbnail(image) {
    if (!image) return;
    const size = Template.currentData().size;
    const imageId = size.match(/large/) ? image.main : image.small;
    const media = Media.findOne(imageId);
    if (media) return media;
  },
  time() {
    return +new Date();
  },
  positionClass() {
    const align = Template.currentData().align;
    const item = Template.currentData().item;
    if (item)
      return item.properties.pinnedPosition;
    return align;
  }
});

// Template.workFilterBlock.helpers({
//   workTags() {
//     const tags = WorkTags.findOne();
//     if (tags)
//       return tags.tags;
//   },
//   isSelected(filter) {
//     const selectedFilter =
//       Template.instance().selectedFilter.get()
//       || FlowRouter.current().params.tag;
//     return selectedFilter === filter;
//   }
// });
//
// Template.workFilterBlock.onCreated(function() {
//   this.selectedFilter = new ReactiveVar("");
//   this.autorun(() => {
//     this.subscribe("work", null, null, this.selectedFilter.get());
//   });
// });
//
// Template.workFilterBlock.events({
//   "click aside a" (evt) {
//     const type = evt.target.innerHTML;
//     // FlowRouter.go($(evt.target).attr("href"));
//     evt.preventDefault();
//     Template.instance().selectedFilter.set(type);
//   }
// });

Template.pinnedWork.helpers({
  item() {
    const index = Template.currentData().index;
    return Work.findOne(
      { "properties.pinned": true },
      {
        sort: workSortOrder,
        skip: index
      }
    );
  }
});

Template.specificWork.onCreated(function() {
  const name = Template.currentData().name;
  this.autorun(() => {
    this.subscribe("specificWork", name);
  });
});

Template.specificWork.helpers({
  item() {
    const name = Template.currentData().name;
    return Work.findOne({ $or: [ { en_name: name }, { name } ] });
  }
});
