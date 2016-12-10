import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { Utils } from '../lib/utils'
import { getTemplate, customPage } from './lib/routeutils'
import { reattachBehavior } from '../lib/attach'

const Triggers = {
  setupPage() {
    Meteor.setTimeout(() => {
      Utils.setScrollPosition();
      Utils.setTitleAndMeta();
      reattachBehavior();
    }, 300);
  },
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
}

/*****************************************************************************/
// HOMEPAGE                                                                   /
/*****************************************************************************/
FlowRouter.route("/", {
  name: "home",
  action() {
    renderPage(getTemplate("home"));
  },
  subscriptions() {
    this.register("employeeCount", Meteor.subscribe("employeeCount"));
    this.register("latestMediumPosts", Meteor.subscribe("latestMediumPosts"));
  }
});

/*****************************************************************************/
// REDIRECT BLOG                                                              /
/*****************************************************************************/
FlowRouter.route("/blog/post/:id/:title", {
  name: "blogpostRedirect",
  action() {
    const title = encodeURIComponent(FlowRouter.getParam('title'));
    window.location.href = `https://medium.com/q42bv/search?q=${title}`;
  }
});
FlowRouter.route("/blog/tagged/:tag", {
  name: "blogTagRedirect",
  action() {
    const tag = FlowRouter.getParam('tag');
    window.location.href = `https://medium.com/q42bv/tagged/${tag}`;
  }
});
FlowRouter.route("/blog/:whatever*", {
  name: "blogRedirect",
  action() {
    window.location.href = 'https://medium.com/q42bv';
  }
})

/*****************************************************************************/
// CUSTOM PAGES                                                               /
/*****************************************************************************/

customPage({
  routeName: "meteor",
  path: "/meteor",
  tags: ["meteor"]
});

customPage({
  routeName: "swift",
  path: "/swift",
  tags: ["swift"]
});

customPage({
  routeName: "vacatures",
  path: "/vacatures",
  tags: ["vacature"]
});

/*****************************************************************************/
// ANY OTHER PAGE                                                             /
/*****************************************************************************/
FlowRouter.route("/:page", {
  name: "page",
  action(params) {
    const tmpl = getTemplate(params.page);
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
