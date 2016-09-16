import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'

const Utils = {

  getStaticAssetsUrl: () => {
    const url = "https://storage.googleapis.com/static.q42.nl";
    if (Meteor.isClient)
      return window.location.hostname === "localhost" ? "" : url;
    return url;
  },

  // if the page is reloaded with a hash in the url,
  // scroll to the correct position
  setScrollPosition: () => {
    if (window.location.hash){
      const $el = $(window.location.hash);
      if ($el[0]){
        Meteor.setTimeout( (() => $el[0].scrollIntoView()), 100);
      } else {
        Meteor.setTimeout( (() => Utils.setScrollPosition()), 1000);
      }
    } else {
      window.scrollTo(0,0);
    }
  },

  // set the correct <title> and meta info
  setTitleAndMeta: () => {
    const routeName = FlowRouter.getRouteName();
    document.title = "Q42";

    if (routeName !== "home" && routeName !== undefined) {
      let title = "";
      title = $('h1').first().text().trim();
      title = title.charAt(0).toUpperCase() + title.substring(1);
      if (title)
        document.title = `${title} - Q42`;
    }
    $("meta[property='og:title']").attr("content", document.title);

    let imgSrc = $(".block-large img:first-of-type").attr("src");
    $("meta[property='og:image']").attr("content", imgSrc);

    // fix url, since Facebook parses this into "localhost:20049"
    let currUrl = window.location.href;
    if (currUrl.indexOf("localhost") > -1)
      currUrl = currUrl.replace(/localhost:\d{4,5}/, "q42.nl");
    $("meta[property='og:url']").attr("content", currUrl);

    const desc = $("p:first-of-type").first().text();
    $("meta[property='og:description']").attr("content", desc);
    $("meta[name='description']").attr("content", desc);
  }

};

if (Meteor.isClient) {
  Meteor.startup(() => {
    _.each(_.keys(Template), (name) => {
      const tmpl = Template[name];
      if (tmpl && tmpl.onRendered)
        tmpl.onRendered(Utils.setTitleAndMeta);
    });
  });
}

export { Utils }
