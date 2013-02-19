Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostIndex", Session.get("blogpage"), Session.get("blogtag"));
  Meteor.subscribe("blogpostFull", Session.get("blogpostid"));
  Meteor.subscribe("pagesByTag", Session.get("blogtag") || "");
});

Template.blog.post = function() {
  var posts = Posts.find();
  if (posts.count() > 0)
  {
    Session.set("blogloading", false);
    Meteor.call("checkTumblr");
  }
  return posts;
}
Template.blog.rendered = function() {
  toggleLoadingState();
  syntaxHighlight();
}
Template.blog.pagination = function() {
  var item = PageCounts.findOne({ tag: Session.get("blogtag") || "" });
  var pages = item ? item.count : 1;
  if (pages == 1)
    return [];

  var items = [];
  var page = Session.get("blogpage") || 1;
  if (page > 1)
    items.push({ label: "nieuwer", page: page - 1 })
  var min = Math.max(1, page - 3);
  var max = Math.min(pages, page + 3);
  for (var i = min; i <= max; i++)
    items.push({ label: i, page: i, active: i == page });
  if (page < pages)
    items.push({ label: "ouder", page: page + 1 })
  return items;
}
Template.blog.tag = function() {
  return Session.get("blogtag");
}

Template.blogpost.post = function() {
  return Posts.findOne({ id: Session.get("blogpostid") });
}
Template.blogpost.rendered = function() {  
  toggleLoadingState();

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=292443547438127";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
  
  syntaxHighlight();

}

Template.postDate.prettyDate = function() {
  return moment(this.date).format('dddd D MMMM YYYY')
}

Template.otherPosts.post = function() {
  return Posts.find({id: {$ne: Session.get('blogpostid')}, title: {$exists: true}}, {limit: 12}).fetch();
}

Handlebars.registerHelper("ifWidthEquals", function(width, options) {
  return this.width == width ? options.fn(this) : "";
});
Handlebars.registerHelper("debug", function(obj) {
  // console.log(obj)
});
Handlebars.registerHelper("typeIs", function(type) {
  return this.type == type;
})

function toggleLoadingState() {
  $(".blog,.block-text,.subcontent,#pageNav").toggleClass("loading", Session.get("blogloading"));
}

function syntaxHighlight() {   
  if (typeof disableStyleCode != 'undefined') { return; }

  var a = false;

  $('code').each(function() {
    if (!$(this).parent().hasClass('prettyprint')) {
      $(this).wrap('<pre class="prettyprint" />');
      a = true;  
    }
    
    
  });

  if (a) { prettyPrint(); } 
}