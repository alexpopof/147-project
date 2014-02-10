var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

var venues = {
	'food_venues': food,
	'workout_venues': workout,
	'party_venues': party
};

exports.view = function(req, res){
  var venue = req.params.venue;
  venues["venue"] = venue  
  res.render('addalerts', venues);
};