import { Template } from 'meteor/templating'
import { Utils } from '../../../lib/utils'

Template.registerHelper("avatar_static", function() {
  const assetsUrl = Utils.getStaticAssetsUrl();
  if (this.imageStatic)
    return `https://robohash.org/${this.handle}@q42.nl?size=108x108`;

  return `${assetsUrl}/images/employees/${this.handle}.jpg`;
});

Template.registerHelper("avatar_animated", function() {
  const assetsUrl = Utils.getStaticAssetsUrl();
  if (this.imageAnimated)
    return `https://robohash.org/${this.handle}@q42.nl?size=108x108`;

  return `${assetsUrl}/images/employees/${this.handle}.gif`;
});
