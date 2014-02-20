var models = require('../models');

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

exports.view = function(req, res){

	var cap = function capitaliseFirstLetter(string)
  	{
    	return string.charAt(0).toUpperCase() + string.slice(1);
  	}

  var category = req.params.category;
	models.Venue.find({"category": category}).exec(afterData); 
  function afterData(err, data) {   
    res.render('venues', {'data': data, 'category': cap(category)}); 
        
  }

  	
};

