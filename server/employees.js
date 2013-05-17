var _kickAssQ42Folk = [
 { name: "Alexander Overvoorde", handle:"alexander", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"},
 { name: "Arian van Gend", handle:"arian"},
 { name: "Arjen van der Ende", handle: "arjen"},
 { name: "Bas Warmerdam", handle:"bas", phone: "070-4452364"},
 { name: "Benjamin de Jager", handle:"benjamin"},
 { name: "Bob van Oorschot", handle:"bob", phone: "070-4452352"},
 { name: "Chris Waalberg", handle:"chris" , phone: "070-4452353"},
 { name: "Christiaan Hees", handle:"christiaan"},
 { name: "Coen Bijpost", handle:"coen", phone: "070-4452359", imageAnimated: "coen-gr.jpg"},
 { name: "Cynthia Wijntje", handle:"cynthia", phone: "070-4452310" },
 { name: "Elaine Oliver", handle:"elaine"},
 { name: "Frank Raterink", handle:"frank", phone: "070-4452368", web: "http://www.frankraterink.nl"},
 { name: "Gerard Dorst", handle:"gerard"},
 { name: "Guus Goossens", handle:"guus"},
 { name: "Herman Banken", handle:"herman", web: "http://hermanbanken.nl/"},
 { name: "Jaap Taal", handle:"jaap"},
 { name: "Jan-Willem Maneschijn", handle:"janwillem"},
 { name: "Jasper Haggenburg", handle:"jasperh", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg", web: "http://jpunt.nl"},
 { name: "Jasper Kaizer", handle:"jasper"},
 { name: "Jelle Visser", handle:"jelle", web: "http://www.jhelle.com/", imageAnimated: "jelle-gr.jpg"},
 { name: "Jeroen Gijsman", handle:"jeroen", phone: "070-4452367"},
 { name: "Johan Huijkman", handle:"johan", phone: "070-4452379"},
 { name: "Kamil Afsar", handle:"kamil", phone: "070-4452357"},
 { name: "Kars Veling", handle:"kars", phone: "070-4452350"},
 { name: "Katja Hollaar", handle:"katja"},
 { name: "Korjan van Wieringen", handle:"korjan"},
 { name: "Laurens van den Oever", handle:"laurens", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"},
 { name: "Leonard Punt", handle:"leonard"},
 { name: "Lukas van Driel", handle:"lukas", phone: "070-4452366", web: "http://developer.3l.nl/"},
 { name: "Marcel Duin", handle:"marcel", imageAnimated: "marcel-gr.jpg", web: "http://webglmarcel.q42.net/"},
 { name: "Mark van Straten", handle:"mark", phone: "070-4452347"},
 { name: "Martijn Laarman", handle:"martijnl"},
 { name: "Martijn van Steenbergen", handle:"martijn", phone: "070-4452342", web: "http://martijn.van.steenbergen.nl"},
 { name: "Martin Kool", handle:"martin", phone: "070-4452362", web: "http://martinkool.com/"},
 { name: "Matthijs van der Meulen", handle:"matthijs"},
 { name: "Michiel Post", handle:"michiel", web: "http://michielpost.nl/"},
 { name: "Rahul Choudhury", handle:"rahul", phone: "070-4452362"},
 { name: "Remco Veldkamp", handle:"remco", phone: "070-4452356", web: "http://realstuffforabstractpeople.com/"},
 { name: "Richard Lems", handle:"richard"},
 { name: "Rik van der Kroon", handle:"rik"},
 { name: "Roelf-Jan de Vries", handle:"roelfjan", web: "http://www.roelf-jandevries.nl"},
 { name: "Sander de Vos", handle:"sander", phone: "070-4452354"},
 { name: "Sjoerd Visscher", handle:"sjoerd", web: "http://w3future.com/"},
 { name: "Stef Brooijmans", handle:"stef", phone: "070-4452351"},
 { name: "Suzanne Waalberg", handle:"suzanne"},
 { name: "Tim Logtenberg", handle:"timl", phone: "070-4452360", email: "tim"},
 { name: "Tim van Deursen", handle:"timd", phone: "070-4452361"},
 { name: "Tim van Steenis", handle:"tims", phone: "070-4452369", web:"http://www.vansteenis-photography.nl/"},
 { name: "Tom Lokhorst", handle:"tom", web: "http://tom.lokhorst.eu/"},
 { name: "Wilbert Mekenkamp", handle:"wilbert"}
];






Employees.allow({
  insert: function () {
    return false;
  }
});

var inserts = 0, updates = 0;
_.each(_kickAssQ42Folk, function(e) {
  var qer = Employees.findOne({handle: e.handle});
  if (!qer) {
    Employees.insert(e);
    inserts++;
  }
  else {
    Employees.update({handle: e.handle}, e, {set: e});
    updates++;
  }
});


var allQers = _.pluck(Employees.find().fetch(), "handle");
addLabel("Rijksmuseum",                   ["remco", "jasper", "jaap", "martijnl", "elaine"]);
addLabel("9292",                          ["mark", "timd", "elaine", "johan", "michiel", "christiaan"]);
addLabel("Staatsloterij",                 ["timd", "arjen", "gerard", "leonard", "bas", "kars", "martin",
                                           "katja", "elaine", "bob", "jelle", "sjoerd", "wilbert"]);
addLabel("Schooltas",                     ["kars", "martin", "tims", "benjamin"]);
addLabel("Philips Hue",                   ["christiaan", "lukas", "korjan", "roelfjan", "johan", "arian"]);
addLabel("TADC",                          ["lukas"]);
addLabel("MENDO",                         ["chris", "jeroen", "elaine"]);
addLabel("Iamsterdam",                    ["stef", "timd", "lukas"]);
addLabel("Pepper",                        ["bas", "gerard", "timd", "elaine"]);
addLabel("D-reizen",                      ["jaap"]);
addLabel("Greetz",                        ["martin", "arian", "roelfjan", "marcel", "timd"]);
addLabel("Malmberg",                      ["laurens", "kamil", "jeroen", "bob", "coen", "michiel", "martin", "marcel", "jasper"])

addLabel("Handcraft",                     ["rahul", "kars", "sjoerd", "remco", "kamil", "martin"]);

addLabel("Cat Quest",                     ["martin", "jelle", "richard", "benjamin", "tom", "sjoerd"]);
addLabel("Quento",                        ["martin", "richard", "benjamin", "michiel", "christiaan"]);
addLabel("Carrrrds",                      ["martin", "richard", "benjamin"]);
addLabel("Spaceventure",                  ["martin", "rahul", "richard"]);

addLabel("Projectleider",                 ["jasper", "korjan", "timd", "gerard", "laurens"]);
addLabel("Software Engineer",             allQers);
addLabel("Interaction Engineer",          ["rahul", "elaine", "johan", "roelfjan", "frank"]);
addLabel("Q'er",                          allQers);
addLabel("De sjaak",                      [allQers[_.random(0, allQers.length)]]);
addLabel("Oprichter",                     ["kars"]);
addLabel("Student",                       ["alexander", "herman", "janwillem", "arian", "christiaan"]);
addLabel("Ex-stagiair",                   ["jeroen", "lukas", "chris", "bob", "katja", "tim", "tims", "kamil"]);
addLabel("Ex-klant",                      ["gerard", "matthijs", "stef"]);
addLabel("Ex-concullega",                 ["arjen", "sander", "bas", "coen", "jaap", "jasper", "jasperh", "johan", "roelfjan", "marcel",
                                           "mark", "rik", "martijnl", "michiel", "stef", "timd"]);
addLabel("Ex-ex-q'er",                    ["sjoerd", "laurens", "wilbert", "suzanne", "jelle"]);

addLabel("Speelt nog World of Warcraft",  ["rahul", "christiaan", "benjamin", "richard", "martijn", "coen"]);
addLabel("Weet wat Spiffy is",            []); // LOL!
//addLabel("1/42e",                         ["kars", "stef", "chris", "martin", "lukas", ""]);
//addLabel("Team Wintersport",              []);
//addLabel("w00tcamp winnaar",              []);
addLabel("Heeft een baard",               ["rahul", "richard", "martijn", "arian", "coen", "christiaan", "kamil"])
addLabel("Stokoud",                       ["stef", "johan"]);
addLabel("Tatoeage",                      ["chris", "jeroen", "jasperh", "elaine"]);
addLabel("Voortgeplant",                  ["martin", "chris", "mark", "kars", "bas", "coen", "cynthia",
                                           "gerard", "jasper", "johan", "korjan", "michiel", "remco", "sander", "stef", "suzanne", "timd"]);
addLabel("Rijdt soms op een motor",       ["stef", "jeroen", "arian"]);
addLabel("Wordt binnenkort aangenomen door Microsoft", ["michiel"]);
//addLabel("Blauwe ogen",                   []);
addLabel("Vroeger stewardess geweest",    ["cynthia", "wilbert"]);
addLabel("Heeft bij Fabrique gewerkt",    ["sander"]);
//addLabel("Meer dan 42 maanden in dienst", []);
//addLabel("Verdient minder dan Jasper", []);
addLabel("Google IO alumni",              ["kars", "rahul", "martin", "jaap", "mark", "kamil", "christiaan", "chris", "arian"]);
addLabel("WWDC kaartje kwijtgeraakt",     ["tims"]);
//addLabel("Heeft Max Raabe live gezien",   []);
addLabel("Schoenmaat 42",                 ["rahul", "chris"]);
addLabel("IQ boven de 200",               ["sjoerd"]);
addLabel("Blessure tijdens werktijd",     ["rahul", "matthijs"]);

function addLabel(label, handles) {
  _.each(handles, function(handle) {
    Employees.update({handle: handle}, {$addToSet: {labels: label}});
  });
}




var employeeHandles = _.map(_kickAssQ42Folk, function(e) { return e.handle;  });

//Delete employees whose handles are no longer there:
// handles are no longer there:
var employeeCountBefore = Employees.find({}).count();
Employees.remove({ handle: { $nin: employeeHandles } });

var employeeCountAfter = Employees.find({}).count();
var deletes = Math.max(0, employeeCountBefore - employeeCountAfter);

console.log("Employee update complete. Inserts: " + inserts + ". Updates: " + updates + ". Deletes: " + deletes);

Meteor.publish("employees", function () {
  return Employees.find({}, { sort : { name: 1 } });
});

Meteor.publish("employeeHandles", function () {
  return employeeHandles;
});

Meteor.methods({
  addQer: function(record) {
    Employees.insert(record);
  }
});