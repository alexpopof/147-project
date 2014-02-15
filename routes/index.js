
/*
 * GET home page.
 */

var alerts_json = require('../alerts.json');


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');



exports.view = function(req, res){
	var favorited_venue_names = [];
	for (var i = 0; i < food.length; i++) {
		var ven = food[i];
		if (ven["favorited"])
			favorited_venue_names.push(food[i]['name']);
	}
	for (var i = 0; i < workout.length; i++) {
		var ven = workout[i];
		if (ven["favorited"])
			favorited_venue_names.push(workout[i]['name']);
	}

	for (var i = 0; i < party.length; i++) {
		var ven = party[i];
		if (ven["favorited"])
			favorited_venue_names.push(party[i]['name']);
	}

	function formatAMPM(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours-8; //PST fix?
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}

	
	//if we are returning to the homepage from an added alert, must process form
	var venue = req.body.venue;
	var description = req.body.description;
	var severity = req.body.severity;
	var currentTime = new Date();
	console.log(currentTime);
	var timeString = formatAMPM(currentTime);
	var newAlert = {
			"venue": venue,
			"alert": description,
			"severity": severity,
			"timestamp": timeString					
		}
	var alerts = {'alerts': alerts_json	}
	if (typeof venue != "undefined"){ //form posted successfully		
		alerts["alerts"].unshift(newAlert); // add to front
	}


	console.log(favorited_venue_names);
	var all_alerts_list = alerts["alerts"];
	var alerts_to_show = [];
	for (var i = 0; i<all_alerts_list.length; i++) {
		var venue = all_alerts_list[i]['venue'];
		//console.log(venue);
		if (include(favorited_venue_names, venue))
			alerts_to_show.push(all_alerts_list[i]);
	}

  	res.render('index', {'alerts':alerts_to_show});
};
