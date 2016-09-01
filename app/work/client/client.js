import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../../../lib/utils'
import { Work, WorkTags, Media } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'

const workSortOrder = {"properties.pinned": 1, "properties.date": -1, name: 1};

Template.listAllProjects.onCreated(function() {
  this.autorun(() => {
    this.subscribe("work", null, null);
  });
});
Template.listAllProjects.helpers({
  workItems() {
    const work = Work.find({}, { sort: workSortOrder }).fetch();
    const index = Template.currentData().index || 0;
    const pinned = work.filter(x => x.properties.pinned).slice(index);
    const unpinned = work.filter(x => !x.properties.pinned);
    const unpinnedGrouped = _.toArray(_.groupBy(unpinned, (el, i) => ~~(i/3)));
    return _.zip(pinned, unpinnedGrouped);
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
  }
});

Template.workFilterBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  isSelected(filter) {
    const selectedFilter =
      Template.instance().selectedFilter.get()
      || FlowRouter.current().params.tag;
    return selectedFilter === filter;
  }
});

Template.workFilterBlock.onCreated(function() {
  this.selectedFilter = new ReactiveVar("");
  this.autorun(() => {
    this.subscribe("work", null, null, this.selectedFilter.get());
  });
});

Template.workFilterBlock.events({
  "click aside a" (evt) {
    const type = evt.target.innerHTML;
    // FlowRouter.go($(evt.target).attr("href"));
    evt.preventDefault();
    Template.instance().selectedFilter.set(type);
  }
});

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
