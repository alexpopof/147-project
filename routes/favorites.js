var food = require('../food_venues.json');
var workout = require('../athletics_venues.json');
var party = require('../party_venues.json');


exports.view = function(req, res) {
  // controller code goes here
  var category = req.params.category;
  var cap = function capitaliseFirstLetter(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
  //console.log(data);
  unselected = [];
  favorited = [];
  for (var i = 0; i<data.length; i++) {
    var ven_name = data[i]['name'];
    var favorited_bool = data[i]['favorited'];
    if (favorited_bool)
      favorited.push(data[i]);
    else
      unselected.push(data[i]);
  }

  category = cap(category);

    res.render('favorites', {
    'unselected': unselected,
    'favorites': favorited,
    'category': category
   
  });


};