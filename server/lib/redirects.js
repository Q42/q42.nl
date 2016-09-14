import { Meteor } from 'meteor/meteor'
import { Picker } from 'meteor/meteorhacks:picker'

// Use Picker middleware to handle server-side routes
// per https://github.com/meteorhacks/picker/issues/22

const HTTP_REDIRECT_PERMANENT = 302;

redirect(["/meteor", "/swift", "/interaction-engineering", "/girlcode", "/jumpstarts"],
  "www.q42.nl", "www.q42.com");
redirect(["/games", "/vacatures"], "www.q42.com", "www.q42.nl");

redirect(["/accessibility", "/a11y"], null,
  "https://www.q42.com/interaction-engineering");
redirect(["/adventures"], null, "https://adventures.handcraft.com");

const demoUrls = ["/demos/colorblindnesssimulator", "/demos/contrastcheck"];
const seeChromeWebStore = "https://chrome.google.com/webstore/detail/see/" +
                          "dkihcccbkkakkbpikjmpnbamkgbjfdcn";
redirect(demoUrls, null, seeChromeWebStore);

redirect(["/products"], null, "https://www.q42.com/projects");
redirect(["/producten"], null, "https://www.q42.nl/projecten");

redirect(["/blog"], null, "https://medium.com/q42bv");

// XXX: redesign magic 'from' argument
// XXX2: this code is unreadable. wtf.
function redirect(urls, from, to) {
  Picker.middleware((req, res, next) => {
    const match = () => from ? req.headers.host === from : true;
    if (match() && urls.indexOf(req.url) !== -1) {
      const destination = from ? `https://${to}${req.url}` : to;
      console.log(`Redirect ${from} to ${destination}`);
      res.writeHead(HTTP_REDIRECT_PERMANENT, {
        Location: destination
      });
      res.end();
    } else {
      next();
    }
  });
}
