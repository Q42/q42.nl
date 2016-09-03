import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../lib/utils'

Template.main.helpers({
  header: () => Meteor.settings.public.siteVersion === "en" ? "en_header" : "header",
  footer: () => {
    const isHome = FlowRouter.getRouteName() === "home";
    if (!isHome) {
      return Meteor.settings.public.siteVersion === "en" ? "en_footer" : "footer"
    }
    return null;
  },
  openChat: () => Session.equals("openChat", true),
  inverted() {
    return (FlowRouter.getRouteName() === 'home') ? 'inverted' : '';
  }
});
