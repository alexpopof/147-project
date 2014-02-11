var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

var all_venues = [];
all_venues = all_venues.concat(food).concat(workout).concat(party);


var alerts_json = require('../alerts.json');


exports.view = function(req, res){
  	var venue_param = req.params.venue; // name of venue
  	var favorited = false; // if the venue is a fave already
  	var description; // venue description
  	var image_url;
  	for (var i = 0; i<all_venues.length; i++) {
		var ven_info = all_venues[i];
		if (ven_info["name"] == venue_param) {
			favorited = ven_info["favorited"];
			description = ven_info["description"]
			imageURL = ven_info["imageURL"]
		}
			
	}
	// eventually we will use a DB, but here you can loop through the alerts
	// to find the ones that correspond with this venue.

  	res.render('alerts', {
  		'venue': venue_param,
  		'favorited': favorited,
  		'description': description,
  		'image_url': image_url

  	});
	
};