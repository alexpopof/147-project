
/*
 * GET home page.
 */
var models = require('../models');


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}




exports.view = function(req, res){
	var allBool = req.query.all == "true";
	

	function formatAMPM(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  
	  //GMT->PST
	  hours = hours - 8;
	  hours = hours < 0 ? hours + 24 : hours;

	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return "Today @ " + strTime;
	}

	
	//if we are returning to the homepage from an added alert, must process form
	var venue = req.body.venue;
	var description = req.body.description;
	var severity = req.body.severity;
	var currentTime = new Date();
	//console.log(currentTime);
	
	var newAlert = new models.Alert({
			"venue": venue,
			"alert": description,
			"severity": severity,
			"timestamp": currentTime,
			"pretty_timestamp": formatAMPM(currentTime),
			"status": ""
		});

	var favorited_venues;
	var favorite_names = [];

	models.Venue.find({"favorited":true}).exec(showFaves);

	function showFaves(err, faves) {
		if(err) {console.log(err); res.send(500); }
		favorited_venues = faves;
		for (var i = 0; i< favorited_venues.length; i++)
			favorite_names.push(favorited_venues[i]["name"]);
	}

	if (typeof venue != "undefined"){ //form posted successfully
		newAlert.save(afterSave);
		console.log(newAlert);
	}



	else {
		models.Alert.find().sort('severity').exec(renderIndex);
	}

	function afterSave(err) {

		if(err) {console.log(err); res.send(500); }
		console.log('getting alerts from db');
		models.Alert.find().sort('severity').exec(renderIndex);
	}


	function renderIndex(err, alerts_db) {
		if(err) {console.log(err); res.send(500); }
		console.log(favorite_names);
		var alerts_to_show = [];
		for (var i = 0; i < alerts_db.length; i++) {
			var venue_db = alerts_db[i]["venue"];
			if (include(favorite_names, venue_db) || allBool)
				alerts_to_show.push(alerts_db[i]);
		}
		alerts_severe = [];
		alerts_minor = [];
		alerts_fyi = [];
		alerts_kudos = [];
		for (var i = 0; i < alerts_to_show.length; i++) {
			var a = alerts_to_show[i]
			var severity = a["severity"];
			if (severity == "danger")
				alerts_severe.push(a);
			if (severity == "warning")
				alerts_minor.push(a);
			if (severity == "info")
				alerts_fyi.push(a);
			if (severity == "success")
				alerts_kudos.push(a);
		}

		var alerts_by_servity = alerts_severe.concat(alerts_kudos).concat(alerts_minor).concat(alerts_fyi);


		res.render('index', {'alerts':alerts_by_servity, 'all': allBool});
	}
 	
};


