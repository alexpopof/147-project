
/*
 * GET home page.
 */
var models = require('../models');


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');


exports.view = function(req, res){
	var favorited_venue_names = [];
	var all_favorited_info = [];
	for (var i = 0; i < food.length; i++) {
		var ven = food[i];
		if (ven["favorited"]) {
			favorited_venue_names.push(food[i]['name']);
			all_favorited_info.push(food[i]);
		}
	}
	for (var i = 0; i < workout.length; i++) {
		var ven = workout[i];
		if (ven["favorited"]) {
			favorited_venue_names.push(workout[i]['name']);
			all_favorited_info.push(workout[i]);
		}
	}

	for (var i = 0; i < party.length; i++) {
		var ven = party[i];
		if (ven["favorited"]) {
			favorited_venue_names.push(party[i]['name']);
			all_favorited_info.push(party[i]);
		}
	}

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

	var currentTime = new Date();

	//Code to process amount of time left till closing or if venue is closed duh
	
	var closingTime = 1;
	var openingTime = 1;
	for (i = 0; i < all_favorited_info.length; i++) {
		if(all_favorited_info[i]["name"] == req.body.venue) {
			//instead of hours, I will wait for what kind of database we will have
			//to determine how to handle this feature
			closingTime = all_favorited_info[i]["closed"];
			openingTime = all_favorited_info[i]["open"];
		}
	}
	var tempHours = currentTime.getHours() - 8;
	tempHours = tempHours < 0 ? tempHours + 24 : tempHours;
	var tempMinutes = currentTime.getMinutes();
	var currTime = tempHours + ":" + tempMinutes;


	var status;
	var remainingTime;
	var hourTest = 0;
	var minTest = 0;

	//openingTime = "8:00";
	startTotalMin = 0;
	endTotalMin = 0;
	//weird timing issue resolved with if statement
	if (openingTime != 1) {
		openingTime.split(":");
		if (openingTime[1] == ":") {
			startTotalMin = openingTime[0] * 60 + openingTime[2] * 10;
		} else {
			startTotalMin = openingTime[0] * 600 + openingTime[1] * 60
			+ openingTime[3] * 10;
		}
	}
	if (closingTime != 1) {
		closingTime.split(":");
		if (closingTime[1] == ":") {
			endTotalMin = closingTime[0] * 60 + closingTime[2] * 10;
		} else {
			endTotalMin = closingTime[0] * 600 + closingTime[1] * 60
			+ closingTime[3] * 10;
		}
	}
	
	var currTotalMin = tempMinutes + tempHours * 60;

	startTotalMin = parseInt(startTotalMin);
	currTotalMin = parseInt(currTotalMin);
	endTotalMin = parseInt(endTotalMin);

	if (endTotalMin < startTotalMin) endTotalMin += 1440;
	if (currTotalMin < startTotalMin) currTotalMin += 1440;

	var remainingTime;
	if (startTotalMin < currTotalMin && currTotalMin < endTotalMin) {
		remainingTime = endTotalMin - currTotalMin;
	}

	
	var status;
	if(remainingTime > 0) {
		if (remainingTime > 59) {
			var division = remainingTime / 60;
			statusHours = Math.floor(division);
			statusMinutes = remainingTime % 60;
			status = statusHours + " hours and " + statusMinutes + " minutes until closing";
		} else {
			status = remainingTime + " minutes until closing";
		}
	} else {
		status = "Closed";
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
			"status": status
		});
	if (typeof venue != "undefined"){ //form posted successfully
		newAlert.save(afterSave);
		console.log(newAlert);
	}

	else {
		models.Alert.find().exec(renderIndex);
	}

	function afterSave(err) {
		if(err) {console.log(err); res.send(500); }
		console.log('getting alerts from db');
		models.Alert.find().exec(renderIndex);
	}


	//TODO: see if venue is favorited

	function renderIndex(err, alerts_db) {
		res.render('index', {'alerts':alerts_db,});
	}
 	
};


