var models = require('../models');

exports.view = function(req, res){
  var venues = {}
  var venue = req.params.venue;
  venues["venue"] = venue
  models.Venue.find({"category": "food"}).exec(afterFoodQuery);
  function afterFoodQuery(err, foodVens) {
  	if(err) {console.log(err); res.send(500); }
  	venues["food_venues"] = foodVens;
  	models.Venue.find({"category": "workout"}).exec(afterWorkoutQuery);
  	function afterWorkoutQuery(err, workoutVens) {
	  	if(err) {console.log(err); res.send(500); }
	  	venues["workout_venues"] = workoutVens;
	  	models.Venue.find({"category": "party"}).exec(afterPartyQuery);
	  	function afterPartyQuery(err, partyVens) {
		  	if(err) {console.log(err); res.send(500); }
		  	venues["party_venues"] = partyVens;
		  	res.render('addalerts', venues);
		}
	}
  }
};