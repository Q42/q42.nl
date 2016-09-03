import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Utils } from '../../lib/utils'

export const RouteUtils = {

  // return the correct name of the template
  // depending on the current language
  getTemplate(name) {
    const enName = `en_${name}`;
    const isEn = Meteor.settings.public.siteVersion === "en";

    if (isEn && Template[enName])
      return enName;

    if (!isEn && Template[name])
      return name;

    return null;
  }
};
