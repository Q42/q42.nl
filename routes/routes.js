import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { Utils } from '../lib/utils'
import { RouteUtils } from './lib/routeutils'
import { reattachBehavior } from '../lib/attach'

const Triggers = {
  setupPage() {
    Meteor.setTimeout(() => {
      Utils.setScrollPosition();
      Utils.setTitleAndMeta();
      reattachBehavior();
    }, 300);
  },
  checkForNewPosts: () => Meteor.call("checkTumblr"),
  set404StatusCode: () => {
    const $meta = $("<meta>");
    $meta.attr('name', 'prerender-status-code');
    $meta.attr('content', '404');
    $("head").append($meta);
  }
};

FlowRouter.triggers.enter([Triggers.setupPage]);

const renderPage = (templateName) => {
  BlazeLayout.render("main", {
    header: "header",
    footer: "footer",
    body: templateName
  });
};

if (Meteor.isClient) {
  Template.registerHelper("subsReady", (name) => {
    return name ? FlowRouter.subsReady(name) : FlowRouter.subsReady();
  });
  Template.registerHelper("isBlog", () => {
    return FlowRouter.getRouteName() === "blog";
  });
}

/*****************************************************************************/
// HOMEPAGE                                                                   /
/*****************************************************************************/
FlowRouter.route("/", {
  name: "home",
  action() {
    renderPage(RouteUtils.getTemplate("home"));
  },
  subscriptions() {
    const englishOnly = Meteor.settings.public.siteVersion === "en";
    this.register("postsWithAuthors",
      Meteor.subscribe("postsWithAuthors", englishOnly));
    this.register("employeeCount", Meteor.subscribe("employeeCount"));
  }
});

/*****************************************************************************/
// BLOG                                                                       /
/*****************************************************************************/
const blogOverview = FlowRouter.group({
  prefix: "/blog",
  triggersEnter: [Triggers.checkForNewPosts]
});
blogOverview.route("/", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions() {
    this.register("allPosts", Meteor.subscribe("blogpostIndex", 1));
    this.register("pages", Meteor.subscribe("pagesByTag", ""));
  }
});
blogOverview.route("/page/:pageNum", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const pageNum = parseInt(params.pageNum);
    this.register("allPosts", Meteor.subscribe("blogpostIndex", pageNum));
    this.register("pages", Meteor.subscribe("pagesByTag", ""));
  }
});
blogOverview.route("/tagged/:tag",{
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const tag = params.tag;
    this.register("allPosts", Meteor.subscribe("blogpostIndex", 1, tag));
    this.register("pages", Meteor.subscribe("pagesByTag", tag || ""));
  }
});
blogOverview.route("/tagged/:tag/page/:pageNum",{
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const tag = params.tag;
    const pageNum = params.pageNum;
    this.register("allPosts", Meteor.subscribe("blogpostIndex", pageNum, tag));
    this.register("pages", Meteor.subscribe("pagesByTag", tag || ""));
  }
});
FlowRouter.route("/blog/post/:id/:title?", {
  name: "blogpost",
  action(){ renderPage("blogpost"); },
  triggersEnter: [Triggers.checkForNewPosts],
  subscriptions(params) {
    const id = parseInt(params.id);
    this.register("blogpost", Meteor.subscribe("blogpostFull", id));
    this.register("allTitles", Meteor.subscribe("blogpostTitles", 1));
  }
});

/*****************************************************************************/
// CUSTOM BLOG PAGES                                                          /
/*****************************************************************************/
customBlogPages(this);

/*****************************************************************************/
// ANY OTHER PAGE                                                             /
/*****************************************************************************/
FlowRouter.route("/:page", {
  name: "page",
  action(params) {
    const tmpl = RouteUtils.getTemplate(params.page);
    if (tmpl) {
      renderPage(tmpl);
    } else {
      Triggers.set404StatusCode();
      renderPage("error404");
    }
  },
  subscriptions(params) {
    if (_.contains(["over-q42", "about-q42"], params.page)){
      this.register("employees", Meteor.subscribe("employees"));
      this.register("coffeeCounter", Meteor.subscribe("coffeeCounter"));
      this.register("toilets", Meteor.subscribe("toilets"));
    }
    if (_.contains(["projecten", "projects"], params.page)){
      this.register("work", Meteor.subscribe("work"));
    }
  }
});

/*****************************************************************************/
// NOT FOUND                                                                  /
/*****************************************************************************/
FlowRouter.route("/(.*)", {
  name: "404",
  triggersEnter: [Triggers.set404StatusCode],
  action() { renderPage("error404"); }
});
