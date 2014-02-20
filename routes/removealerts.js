var models = require('../models');


exports.view = function(req, res){
	alert_to_remove = req.body['alert'];

	models.Alert.find({"alert": alert_to_remove}).remove().exec(after);
	function after (err) {
		if(err) {console.log(err); res.send(500); }
		res.send(req.body);
	}
};
