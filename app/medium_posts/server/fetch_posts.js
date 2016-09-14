import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { MediumPosts } from '../lib/shared'

const latestPostsUrl = 'https://medium.com/q42bv/tagged/news?format=json';

const MEDIUM_SCRIPT_EXECUTION_PREVENTION = '])}while(1);</x>';

const fetchFromMedium = () => {
  console.log('Start fetch from Medium...');
  HTTP.get(latestPostsUrl, (err, res) => {
    if (err) return;
    const json = JSON.parse(res.content.replace(MEDIUM_SCRIPT_EXECUTION_PREVENTION, ''));
    if (json.success) {
      MediumPosts.remove({});
      json.payload.posts.slice(0, 3).forEach(function(post) {
        const { title, virtuals, firstPublishedAt, uniqueSlug, displayAuthor } = post;
        MediumPosts.insert({
          title, firstPublishedAt, uniqueSlug, displayAuthor,
          imageId: virtuals.previewImage.imageId
        });
      });
    }
  });
};

Meteor.startup(function() {
  fetchFromMedium();

  // every 5 minutes, fetch new posts from Medium
  Meteor.setInterval(fetchFromMedium, 1000 * 60 * 5);
});

Meteor.publish("latestMediumPosts", function() {
  return MediumPosts.find();
});
