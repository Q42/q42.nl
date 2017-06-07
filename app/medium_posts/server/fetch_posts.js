import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { MediumPosts } from '../lib/shared'

const langEn = Meteor.settings.public.siteVersion === "en";
// Since we can't filter by multiple tags, just grab English stories for q42.com
const tag = langEn ? "en" : "news";
const latestPostsUrl = `https://medium.com/q42bv/tagged/${tag}?format=json`;

const MEDIUM_SCRIPT_EXECUTION_PREVENTION = '])}while(1);</x>';

const fetchFromMedium = () => {
  HTTP.get(latestPostsUrl, (err, res) => {
    if (err) {
      console.error('Unable to fetch medium posts', err);
    }
    const json = JSON.parse(res.content.replace(MEDIUM_SCRIPT_EXECUTION_PREVENTION, ''));
    if (json.success && json.payload.references.Post) {
      MediumPosts.remove({
        lang: Meteor.settings.public.siteVersion
      });
      Object.keys(json.payload.references.Post).slice(0, 3).forEach(function(postId) {
        const post = json.payload.references.Post[postId];
        const { title, virtuals, firstPublishedAt, uniqueSlug, displayAuthor } = post;
        console.log('Inserting medium post ' + title);
        MediumPosts.insert({
          lang: Meteor.settings.public.siteVersion,
          title, firstPublishedAt, uniqueSlug, displayAuthor,
          imageId: virtuals.previewImage.imageId
        });
      });
    } else {
      console.error('Got payload without posts from medium', json);
    }
  });
};

Meteor.startup(function() {
  fetchFromMedium();

  // every 5 minutes, fetch new posts from Medium
  Meteor.setInterval(fetchFromMedium, 1000 * 60 * 5);
});

Meteor.publish("latestMediumPosts", function() {
  return MediumPosts.find({
    lang: Meteor.settings.public.siteVersion
  });
});
