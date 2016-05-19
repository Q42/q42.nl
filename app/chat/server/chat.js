import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { HTTP } from 'meteor/http'
import { ChatMessages } from '../lib/shared'
import { Utils } from '../../../lib/utils'

Meteor.publish("chat", () => {
  const lang = Meteor.settings.public.siteVersion;
  return ChatMessages.find({lang}, {
    sort: { date: -1 },
    limit: 20
  });
});

Meteor.methods({
  setupChatDefaults(lang: string) {
    let user = Meteor.users.findOne(this.userId);
    if (!user.isAdmin) return;
    ChatMessages.remove({});
    ChatMessages.insert({
      lang,
      userId: this.userId,
      msg: lang === "nl" ? "Hoi! Alles goed?" : "Hello! How are you?",
      date: new Date(),
      path: null
    });
  }
});

// This runs when someone on the site talks to us using the Chat widget
ChatMessages.allow({
  insert(userId, doc) {
    check(userId, String);
    check(doc.msg, String);

    const url = Meteor.settings.private.chatConfig.incomingUrl;
    if (!url) return;

    const path = doc.path;
    const pathWithoutHttp = path.replace(/http(s?):\/\//, "");
    const user = Meteor.users.findOne(userId);
    let res;

    try {
      res = HTTP.post(url, {
        params: {
          payload: JSON.stringify({
            text: [
              `${user.profile.name} (<${path}|${pathWithoutHttp}>) zegt:`,
              doc.msg
            ].join("\n"),
            icon_emoji: ":earth_africa:"
          })
        }
      });
    }
    catch(e) {
      return false;
    }

    return (res && res.content === 'ok');
  }
});

// This runs when someone in Slack responds to a message
Picker.route("/api/chat", (params, req, res, next) => {
  console.log("Route: /api/chat");

  const lang = Meteor.settings.public.siteVersion;
  const token = Meteor.settings.private.chatConfig.outgoingToken;
  const body = req.body;
  if (!req.body || req.body.token !== token) return;

  const msg = req.body.text.replace("@q42nl", "").replace("@q42com", "").trim();
  const username = req.body.user_name + " (Q42)";
  ChatMessages.insert({
    userId: null,
    lang,
    username,
    msg,
    date: new Date(),
    path: "/api/chat"
  });
  res.end();
});
