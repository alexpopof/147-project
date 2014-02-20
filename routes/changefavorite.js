var models = require('../models');

exports.view = function(req, res){
	var venue_to_change = req.body['venue'].trim();
	var category = req.body['category'].trim();
	var newBool = req.body['newBoolean'];
	newBool = newBool == 'true';

	models.Venue.find({"category": category}).exec(afterData); 
	function afterData(err, data) {   
    	if(err) {console.log(err); res.send(500); }
		
		models.Venue.update({"name": venue_to_change},{"favorited": newBool}, afterUpdating);
		
		function afterUpdating(err, affected) {
			if(err) {console.log(err); res.send(500);}
			res.send(req.body);
		}
				
	}

};
