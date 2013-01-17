const TUMBLR_KEY = "9MFWwaN0dXvqXEfp8fXNFCW8b0DWczrTb7GadGwiFO4Du2WUIg";
const BLOGPOSTS_PER_PAGE = 12

Meteor.methods({
  checkTumblr: function()
  {
    this.unblock();
    Meteor.http.get("http://api.tumblr.com/v2/blog/blog.q42.nl/posts", {
      params: { api_key: TUMBLR_KEY, limit: 5 }
    }, function(error, result) {
      if (result.statusCode == 200 && result.data)
        for (var i = 0; i < count; i++)
          upsertPost(result.data.response.posts[i]);
    });
  },
  reimportTumblr: function(offset)
  {
    this.unblock();
    if (!offset)
    {
      Posts.remove({});
      offset = 0;
    }
    Meteor.http.get("http://api.tumblr.com/v2/blog/blog.q42.nl/posts", {
      params: { api_key: TUMBLR_KEY, limit: 20, offset: offset }
    }, function(error, result) {
      var count = result.data && result.data.response.posts.length;
      if (result.statusCode == 200 && count)
      {
        console.log("Importing " + count + " from Tumblr.")
        for (var i = 0; i < count; i++)
          upsertPost(result.data.response.posts[i]);
        Meteor.call("reimportTumblr", offset + 20);
      }
      else
        if (error)
          console.log("Error:", error);
    });
  }
})

function upsertPost(post)
{
  post.prettyDate = post.date.substr(8, 2) + "-" + post.date.substr(5, 2) + "-" + post.date.substr(0, 4);
  if (post.body)
  {
    var pos = post.body.indexOf("<!-- more -->");
    post.intro = pos > -1 ? post.body.substring(0, pos) : post.body;
  }
  if (!Posts.findOne({ id: post.id }))
    Posts.insert(post);
  else
    Posts.update({ id: post.id }, post);
}

Meteor.publish("blogpostIndex", function (page, tag) {
  page = page || 1;
  var filter = tag ? { tags: tag } : {};
  return Posts.find(filter, {
    limit: BLOGPOSTS_PER_PAGE,
    skip: (page - 1) * BLOGPOSTS_PER_PAGE,
    sort: { timestamp: -1 },
    fields: { body: false }
  });
});

Meteor.publish("blogpostFull", function (id) {
  return Posts.find({ id: id });
});

Meteor.publish("pagesByTag", function (tag) {
  var self = this;
  var uuid = Meteor.uuid();
  var count = 0;

  var filter = tag ? {tags: tag} : {};
  var handle = Posts.find(filter).observe({
    added: function (doc, idx) {
      count++;
      self.set("PageCounts", uuid, {tag: tag, count: Math.ceil(count / BLOGPOSTS_PER_PAGE)});
      self.flush();
    },
    removed: function (doc, idx) {
      count--;
      self.set("PageCounts", uuid, {tag: tag, count: Math.ceil(count / BLOGPOSTS_PER_PAGE)});
      self.flush();
    }
    // don't care about moved or changed
  });

  // Observe only returns after the initial added callbacks have
  // run.  Now mark the subscription as ready.
  self.complete();
  self.flush();

  // stop observing the cursor when client unsubs
  self.onStop(function () {
    handle.stop();
  });
});

if (Posts.find().count() == 0)
  Meteor.call("reimportTumblr");