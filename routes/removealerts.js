var alerts_json = require('../alerts.json');



exports.view = function(req, res){
	alert_to_remove = req.body['alert'];

	var indexToRemove = -1;
	for (var i = 0; i < alerts_json.length; i++) {
		var alert = alerts_json[i]['alert'];
		if (alert == alert_to_remove) {
			
			indexToRemove = i;
		}
	}
	// console.log(indexToRemove);
	alerts_json.splice(indexToRemove, 1); //remove 1 item
	console.log(alerts_json);
	res.send(req.body);
};
