
/*
 * GET home page.
 */

var alerts_json = require('../alerts.json');
var alerts = {'alerts': alerts_json	}

exports.view = function(req, res){
  res.render('index', alerts);
};
