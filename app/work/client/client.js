import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Work, WorkTags } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'
import { Employees } from '../../employees/lib/shared'

Meteor.startup(() => {
  // XXX: get rid of this since it subscribes the whole site to everything
  Meteor.subscribe('work');
  Meteor.subscribe('things');
});

function currentWork() {
  return Work.findOne({ slug: FlowRouter.current().params.slug });
}

function luminance(color) {
  const c = color.substring(1);
  const red = parseInt(c.substr(0, 2), 16)/255;
  const green = parseInt(c.substr(2, 2), 16)/255;
  const blue = parseInt(c.substr(4, 2), 16)/255;
  return (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
}

function getPortfolioItemBgColor() {
  const color = new ReactiveVar("");
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    const slug = FlowRouter.current().params.slug;
    if (slug) {
      const work = Work.findOne();
      if (work && work.properties)
        color.set(work.properties.color);
    }
    else color.set("transparent");
  });
  return color.get();
};

Template.registerHelper("portfolioItemBgColor", getPortfolioItemBgColor);

$OnCreated("workDetail", function() {
  this.bgColor = new ReactiveVar("");
  this.autorun(() => {
    FlowRouter.watchPathChange();
    const color = getPortfolioItemBgColor();
    document.body.style.borderColor = color;
    this.bgColor.set(color);
  });
});

$Helpers({
  workDetail: {
    work: () => currentWork(),
    qers: () => Employees.find({ handle: { $in: currentWork().properties.qers } }),
    getThing: (thingId) => Things.findOne({ name: thingId }),
    prettifyDate: (date) => `${date.getMonth()+1}/${date.getFullYear()}`,
    invert: () => luminance(Template.instance().bgColor.get()) > 0.5
  },
  work: {
    allWork() {
      const work = Work.find({}, {
        // first the pinned items, then alphabetically
        sort: {"properties.pinned": -1, name: 1}
      }).fetch();
      let result = _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));

      // quick hack to make it easier to figure out how to show
      // the filters block as the first item of the second row
      if (result[1])
        result[1][0].showTagFiltersHere = true;
      else if (result[0])
        result[0][0].showTagFiltersHere = true;

      return result;
    }
  },
  portfolioItem: {
    isPinned(work) {
      return work.properties && work.properties.pinned ? "pinned" : "";
    }
  }
});

Template.workTagBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  isSelected(tag) {
    const selectedTag = Template.instance().selectedTag.get() || FlowRouter.current().params.tag;
    return selectedTag === tag;
  }
});

Template.workTagBlock.onCreated(function() {
  this.selectedTag = new ReactiveVar("");
});

Template.workTagBlock.events({
  "click aside a" (evt) {
    const tag = evt.target.innerHTML;
    Meteor.subscribe("work", null, tag);
    // FlowRouter.go($(evt.target).attr("href"));
    evt.preventDefault();
    Template.instance().selectedTag.set(tag);
  }
});
