import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// import { blogpostIndex } from '../app/blog/client/lib/collections'
import { RouteUtils } from './lib/routeutils'

customBlogPages = (router) => {

  customPageWithBlogTags = (obj) => {
    if (Meteor.isClient) {
      const templateName = RouteUtils.getTemplate(obj.routeName);
      const tmpl = Template[templateName];
      const blogpostIndex = require('../app/blog/client/lib/collections').blogpostIndex;
      if (tmpl) {
        tmpl.helpers({
          post: () => blogpostIndex.find({}, {limit: 5})
        });
      }
    }
    FlowRouter.route(obj.path, {
      name: obj.routeName,
      triggersEnter: [() => Meteor.call("checkTumblr")],
      action() {
        BlazeLayout.render("main", {
          header: "header",
          footer: "footer",
          body: RouteUtils.getTemplate(obj.routeName) || "error404"
        });
      },
      subscriptions() {
        this.register("posts",
          Meteor.subscribe("blogpostIndex", 1, obj.tags[0]));
      }
    });
  };

  customPageWithBlogTags({
    routeName: "meteor",
    path: "/meteor",
    tags: ["meteor"]
  });

  customPageWithBlogTags({
    routeName: "swift",
    path: "/swift",
    tags: ["swift"]
  });

  customPageWithBlogTags({
    routeName: "vacatures",
    path: "/vacatures",
    tags: ["vacature"]
  });

  customPageWithBlogTags({
    routeName: "io",
    path: "/io",
    tags: ["io"]
  });

  customPageWithBlogTags({
    routeName: "girlcode",
    path: "/girlcode",
    tags: ["girlcode"]
  });

};
