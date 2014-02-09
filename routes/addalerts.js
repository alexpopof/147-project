var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

var venues = {
	'food_venues': food,
	'workout_venues': workout,
	'party_venues': party
};

exports.view = function(req, res){
  res.render('addalerts', venues);
};