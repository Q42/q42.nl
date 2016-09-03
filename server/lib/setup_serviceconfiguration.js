import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'

Meteor.startup(() => {
  _.each(Meteor.settings.private.serviceConfiguration, (settings) => {
    ServiceConfiguration.configurations.upsert(
      { service: settings.service },
      { ...settings, loginStyle: "popup" }
    );
  });
});
