var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

exports.view = function(req, res){
  	cats_list = ['Food', 'Workout', 'Party']

  	// check if just posted form in "edit favorites"
  	var faves = req.body.faves_list;
	var posted = false;
	if (typeof faves != "undefined"){
		var category = req.body.category.toLowerCase();
		//console.log(category);
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
		faves_list = faves.split('|');
		console.log(faves_list);
		for (var i = 0; i<data.length; i++) {
			var venue_name = data[i]["name"]
			//console.log(data[i]["name"]);
			//console.log(include(faves_list, venue_name));
			if (include(faves_list, venue_name))
				data[i]["favorited"] = true;
			else
				data[i]["favorited"] = false;				
		}

		posted=true;
	}
	

  	res.render('categories', {
    'cats': [
            {'name': cats_list[0], 'name_lower': cats_list[0].toLowerCase(), 'icon': 'glyphicon-cutlery' },
            {'name': cats_list[1], 'name_lower': cats_list[1].toLowerCase(), 'icon': 'glyphicon-flag'},
            {'name': cats_list[2], 'name_lower': cats_list[2].toLowerCase(), 'icon': 'glyphicon-bullhorn'},
        ],
    'posted': posted
  	});
};

