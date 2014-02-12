var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

exports.view = function(req, res){

	var cap = function capitaliseFirstLetter(string)
  	{
    	return string.charAt(0).toUpperCase() + string.slice(1);
  	}

  	var category = req.params.category;
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
	

  	res.render('venues', {'data': data, 'category': cap(category)});
};

