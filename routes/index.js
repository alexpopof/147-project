
/*
 * GET home page.
 */

var alerts_json = require('../alerts.json');
var alerts = {'alerts': alerts_json	}

exports.view = function(req, res){
	//if we are returning to the homepage from an added alert, must process form
	var venue = req.query.venue;
	var description = req.query.description;
	var severity = req.query.severity;
	var newAlert = {
			"venue": venue,
			"alert": description,
			"severity": severity					
		}
	if (typeof venue != "undefined"){ //form posted successfully		
		alerts["alerts"].unshift(newAlert); // add to front
	}
	console.log(alerts);

  	res.render('index', alerts);
};
