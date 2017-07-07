import { _ } from 'meteor/underscore'
import { Employees } from '../lib/shared'

const addLabel = function(label, handles) {
  handles = _.isString(handles) ? handles.split(" ") : handles;
  for (let handle of handles) {
    Employees.update(
      {handle: handle},
      {$addToSet: {labels: label}}
    );
  }
};

const allHandles = _.pluck(Employees.find().fetch(), "handle");

// Roles
const roles = {
  "Projectleider": "jasper korjan timd gerard laurens taco silvy braml janjouke",
  "Software Engineer": _.without(
    allHandles,
    "stef", "cynthia", "suzanne", "corina", "silvy", "karlijn"
  ),
  "Interaction Engineer": "johan roelfjan frank guido richard",
  "Q'er": allHandles,
  "Oprichter": "kars",
  "Student": "herman tomas jimmy tobias sanderp",
  "Ex-stagiair": "jeroen chris bob timl tims kamil roan",
  "Ex-klant": "gerard stef taco",
  "Ex-concullega": [
    "arjen", "sander", "bas", "guido", "jaap", "jasper", "jasperh", "johan",
    "roelfjan", "marcel", "mark", "mathijs", "michiel", "stef", "timd", "taco",
    "wouter", "corina", "silvy", "bram", "roos"
  ],
  "Ex-ex-q'er": "sjoerd laurens suzanne roan",
  "Ex-Fabriquer": "sander bram",
  "Mr. Sarien.net": "martin",
  "Google Expert": "kars christiaan",
  "Hack the Planet": "timd floris karlijn",
  "Turtleblaze": "benjamin richard",
  "LessonUp": "kars martin bram",
};

// Arbitrary selections
const arbitrary = {
  "Codeuur": "lukas thijs kars johan",
  "Speelt nog World of Warcraft": "richard benjamin tims ricardo",
  "Weet wat Spiffy is": "bob timl martin remco lukas sjoerd kars laurens" /* LOL! */,
  "Team Wintersport": [
    "lukas", "bob", "chris", "mark", "jeroen", "stef", "roelfjan",
    "sjoerd", "jaapm", "kars", "timd", "guido", "arjen", "tomas",
    "leonard", "thijs"
  ],
  "Heeft een baard": "richard arian christiaan kamil jasperh marcel braml jeroen",
  ">= 42": "stef johan kars jasper",
  "Broers": "tom rob",
  "Tatoeage": "chris jeroen jasperh marcel tomas sahan",
  "Voortgeplant": [
    "martin", "chris", "mark", "kars", "bas", "cynthia", "gerard", "jaap",
    "jasper", "johan", "korjan", "michiel", "remco", "sander", "stef",
    "suzanne", "timd", "laurens", "taco", "bart", "kamil", "braml",
    "lukas", "kristin"
  ],
  "Rijdt soms op een motor": "stef jeroen arian tom lukas bob jasperh chris",
  "Gaat binnenkort naar Microsoft": "michiel",
  "Voormalig stewardess": "cynthia",
  "Verdient minder dan Jasper": _.without(allHandles, "jasper"),
  "Google IO alumni": [
    "kars", "martin", "jaap", "mark", "remco", "kamil", "christiaan",
    "chris", "arian", "guus", "stef", "lukas", "taco", "wouter"
  ],
  "Politicoloog": "sahan",
  "WWDC kaartje kwijtgeraakt": "tims",
  "Heeft Max Raabe live gezien": "kars martin laurens bob lukas",
  "Schoenmaat 42": "chris arian guus christiaan mark taco sebastian",
  "IQ boven de 200": "sjoerd",
  "Blessure tijdens werktijd": "guus",
  "Kan stiekem best programmeren": "chris",
  "Namespace collision": [
    "jaap", "jaapm", "jasper", "jasperh", "timl", "tims",
    "timd", "sander", "sanderp",
    "bram", "braml"
  ],
  "Gewerkt met de Two Guys": "martin richard",
  "Troll": "benjamin",
  "Emojinaam": "taco roos",
  "Heeft the Wire gezien": "jaapm jasperk chris braml jeroen wouter christiaan johan corina sahan",
  "Tomas en de Raketten": "tomas chris tobias korjan sjoerd jimmy",
};

_.each(_.extend(roles, arbitrary),
  (handles, label) => addLabel(label, handles));
