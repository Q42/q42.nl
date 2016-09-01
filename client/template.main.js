import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../lib/utils'

Template.main.helpers({
  header: () => Meteor.settings.public.siteVersion === "en" ? "en_header" : "header",
  footer: () => Meteor.settings.public.siteVersion === "en" ? "en_footer" : "footer",
  openChat: () => Session.equals("openChat", true),
  inverted() {
    return (FlowRouter.getRouteName() === 'home') ? 'inverted' : '';
  }
});
