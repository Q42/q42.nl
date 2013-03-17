var _kickAssQ42Folk = [
 { name: "Alexander Overvoorde", handle:"alexander", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"},
 { name: "Arian van Gend", handle:"arian"},
 { name: "Arjen van der Ende", handle: "arjen", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"},
 { name: "Bas Warmerdam", handle:"bas", phone: "070-4452364"},
 { name: "Benjamin de Jager", handle:"benjamin"},
 { name: "Bob van Oorschot", handle:"bob", phone: "070-4452352"},
 { name: "Chris Waalberg", handle:"chris" , phone: "070-4452353"},
 { name: "Christiaan Hees", handle:"christiaan"},
 { name: "Coen Bijpost", handle:"coen", phone: "070-4452359", imageAnimated: "coen-gr.jpg"},
 { name: "Cynthia Wijntje", handle:"cynthia", phone: "070-4452310" },
 { name: "Elaine Oliver", handle:"elaine"},
 { name: "Frank Raterink", handle:"frank", phone: "070-4452368", web: "http://www.frankraterink.nl"},
 { name: "Guus Goossens", handle:"guus", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"},
 { name: "Herman Banken", handle:"herman", web: "http://hermanbanken.nl/"},
 { name: "Ivo de Kler", handle:"ivo"},
 { name: "Jaap Taal", handle:"jaap"},
 { name: "Jan-Willem Maneschijn", handle:"janwillem"},
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

//Get an ACL going on, clients should not get to insert q folk.
Employees.allow({
	insert: function () {
		return false;
	}
});

//minimongo has no support for mongodb's upserts :(
console.log("trying to insert q42 peeps");
var inserts = 0, updates = 0;
_.each(_kickAssQ42Folk, function(e) {
	var count = Employees.find({handle: e.handle}).count()
	if (count === 0) {
		Employees.insert(e);
		inserts++;
	}
	else {
		Employees.update({handle: e.handle}, e, {set: e });
		updates++;
	}
});
console.log("Inserted " + inserts + " and updated " + updates + " q peeps");

var employeeHandles = _.map(_kickAssQ42Folk, function(e) { return e.handle;  });

//Delete employees whose handles are no longer there:
// handles are no longer there:
var employeeCountBefore = Employees.find({}).count();
Employees.remove({ handle: { $nin: employeeHandles } });

var employeeCountAfter = Employees.find({}).count();
console.log("Deleted " + Math.max(0, employeeCountBefore - employeeCountAfter) + " q peeps");

Meteor.publish("employees", function () {
	return Employees.find({}, { sort : { name: 1 } });
});

Meteor.publish("employeeHandles", function () {
	return employeeHandles;
});
