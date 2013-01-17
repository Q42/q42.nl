Meteor.startup(function () {
  $(window).bind('resize', resize);
  $(window).bind('resize', resizeFBwidget);
  $(window).bind("resize", resizeShowreel);
  $(window).bind('scroll', bounceBack);
  Backbone.history.start({pushState: true});
});

Template.body.content = function() {
  var page = Session.get("page") || "home";
  var template = Template[page] || Template["error404"];
  return template();
};
Template.body.rendered = function() {
  if (!Session.equals("page", undefined) && !Session.equals("page", "home"))
    document.title = $(this.find('h1')).text() + " - Q42";

  reattachBehavior();

  Meteor.setTimeout(function() {
    if (window.location.hash)
      var $el = $(window.location.hash);
      if ($el && $el[0]) $el[0].scrollIntoView();
  }, 1000);
}

Template.body.viewRendersHeader = function() {
  var page = Session.get("page") || "home";
  return page == "home";
};

Template.error404.url = function() {
  return document.location.pathname;
};

function handleLinkClicks() {
  $("a[href^='/']").click(function(evt) {
    Router.loadPage(this.getAttribute("href"));
    return false;
  });
}

function reattachBehavior() {

  if (!window._gaq) {
    window._gaq = [];
    _gaq.push(['_setAccount', 'UA-2714808-1']);
    _gaq.push(['_trackPageview']);
    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }

  resize();
  resizeShowreel();

  setReadmoreBouncers();
  handleLinkClicks();
  homepageShowreel();
  addPolaroidFunctionality();
  initQers();
  koffieteller();
  codeteller();

  // scroll to top of page
  window.scrollTo(0,0);

  // facebook widget
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=292443547438127";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

  resizeFBwidget();

  // Disqus widget
  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://q42.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
  
  // Twitter
  twttr.widgets.load();
  
  // fade in new page
  Meteor.defer(function() {
    $($("section")[0]).addClass("show");
    $("#homecontent").addClass("show");
  })
}