var Q42Router = Backbone.Router.extend({
  routes: {
    "": "main",
    "blog": "blog",
    "blog/page/:page": "blog",
    "blog/tagged/:tag": "blogtagged",
    "blog/tagged/:tag/page/:page": "blogtagged",
    "blog/post/:id/:slug": "blogpost",
    ":page": "main"
  },
  main: function (page) {
    if (page && page.indexOf("#") > -1)
      page = page.split("#")[0];

    if (page && page.indexOf("?") > -1)
      page = page.split("?")[0];

    Session.set("page", page);

    if (page) {
      var pageTitle = page[0].toUpperCase() + page.substring(1).replace("-", " ");

      document.title =  pageTitle || "Q42";

      if (document.title != "Q42")
        document.title += " - Q42";
    }
  },
  blog: function (page, tag)
  {
    Session.set("blogpage", 1*page || 0);
    Session.set("blogtag", tag || "");
    Session.set("blogpostid", -1);
    this.main("blog");
  },
  blogpost: function (id)
  {
    Session.set("blogpostid", 1*id);
    this.main("blogpost");
  },
  blogtagged: function (tag, page)
  {
    this.blog(page, tag.replace(/[\-\+]/g, ' '));
  },
  loadPage: function (page) {
    this.navigate(page, {trigger: true});
  }
});
Router = new Q42Router;