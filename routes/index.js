
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

	//Code to process amount of time left till closing or if venue is closed
	
	var closingTime;
	for (i = 0; i < all_favorited_info.length; i++) {
		if(all_favorited_info[i]["name"] == req.body.venue) {
			//instead of hours, I will wait for what kind of database we will have
			//to determine how to handle this feature
			closingTime = all_favorited_info[i]["hours"];
		}
	}
	var tempHours = currentTime.getHours() + 4;
	var tempMinutes = currentTime.getMinutes();
	var currTime = tempHours + ":" + tempMinutes;

	startTime = "8:01"; // still waiting for database
	endTime = "22:01"; // to determine parsing

	var status;
	var remainingTime;

	endTime.split(':');
	var endHour = endTime[0];
	var endMin = endTime[1];
	var endTotalMin = endMin + endHour * 60;

	startTime.split(':');
	var startHour = startTime[0];
	var startMin = startTime[1];
	var startTotalMin = startMin + startHour * 60;

	var currTotalMin = tempMinutes + tempHours * 60;

	if (startTotalMin < currTotalMin && currTotalMin < endTotalMin) {
		var newMin;
		var newHour;
		if (tempMinutes > endMin) {
			newMin = 60 - endMin;
			newHour = endHour - tempHours + 1;
		} else {
			newMin = endMin - tempMinutes;
			newHour = endHour - tempHours;
		}
		remainingTime = newHour + ":" + newMin;
		status = remainingTime + " remaining";
	} else {
		status = "Closed";
	}
	var blank;
	if(startTotalMin < currTotalMin) {
		blank = "yay";
	} else {
		blank = "boo" + currTotalMin + " " + startTotalMin + " " + endTotalMin;
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
			"status": blank
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


