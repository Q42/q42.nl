import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../../../lib/utils'
import { Work, WorkTags, Media } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'

Meteor.startup(() => {
  // XXX: get rid of this since it subscribes the whole site to everything
  Meteor.subscribe('things');
});

Template.workItems.helpers({
  workItems() {
    const work = Work.find({"properties.pinned": false}, {
      sort: {"properties.date": -1}
    }).fetch();
    return _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));
  }
});
Template.work.helpers({
  imageThumbnail(image) {
    if (!image) return;
    const size = Template.currentData().size;
    let imageId = size === "large" ? image.main : image.small;
    const media = Media.findOne(imageId);
    if (media) return media;
  }
});

Template.pinnedWork.onCreated(function() {
  this.index = Template.currentData().index;
});
Template.pinnedWork.helpers({
  item() {
    const index = Template.instance().index;
    return Work.findOne({"properties.pinned": true}, {skip: index});
  }
});

Template.workFilterBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  isSelected(filter) {
    const selectedFilter = Template.instance().selectedFilter.get() || FlowRouter.current().params.tag;
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
