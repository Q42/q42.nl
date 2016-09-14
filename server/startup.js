import { WebApp } from 'meteor/webapp'
import { Meteor } from 'meteor/meteor'

Meteor.startup(function() {
  const lang = Meteor.settings.public.siteVersion;
  WebApp.addHtmlAttributeHook((req) => ({ lang: lang }));
});
