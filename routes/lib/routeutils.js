import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Utils } from '../../lib/utils'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// return the correct name of the template
// depending on the current language
const getTemplate = (name) => {
  const enName = `en_${name}`;
  const isEn = Meteor.settings.public.siteVersion === "en";

  if (isEn && Template[enName])
    return enName;

  if (!isEn && Template[name])
    return name;

  return null;
};

const customPage = (obj) => {
  FlowRouter.route(obj.path, {
    name: obj.routeName,
    action() {
      BlazeLayout.render("main", {
        header: "header",
        footer: "footer",
        body: getTemplate(obj.routeName) || "error404"
      });
    }
  });
}

export { getTemplate, customPage };
