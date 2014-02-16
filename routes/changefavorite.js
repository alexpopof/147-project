var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

exports.view = function(req, res){
	var venue_to_change = req.body['venue'].trim();
	var category = req.body['category'].trim();
	var newBool = req.body['newBoolean'];
	newBool = newBool == 'true';

	var data;
	if (category == "food") {
	    data = food;
	}
	if (category == "workout") {
	    data = workout;
	}
	if (category == "party") {
	    data = party;
	}

	for (var i = 0; i < data.length; i++) {
		venue = data[i];
		if (venue["name"]==venue_to_change) {
			
			venue["favorited"] = newBool;
			
		}
	}
	
	res.send(req.body);
};
