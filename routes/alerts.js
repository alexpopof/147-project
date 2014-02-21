
var models = require('../models');


exports.view = function(req, res){
  	var venue_param = req.params.venue; // name of venue

    var backURL=req.header('Referer') || '/';
    var indexOfRelative = backURL.indexOf('/venues');
    if (indexOfRelative < 0)
      backURL = '/';
    else
      backURL = backURL.substring(indexOfRelative);

    var cap = function capitaliseFirstLetter(string)
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    models.Venue.find({"name": venue_param}).exec(afterVenueQuery);

    function afterVenueQuery(err, venues) {
      if(err) {console.log(err); res.send(500); }
      var ven_info = venues[0]; // 1 match
      var favorited = ven_info["favorited"];
      var description = ven_info["description"];
      var imageURL = ven_info["imageURL"];
      var address = ven_info["address"];
      var telephone = ven_info["telephone"];
      var hours = ven_info["hours"];
      var website = ven_info["website"];
      var latitude = ven_info["latitude"];
      var longitude = ven_info["longitude"];
      var category = ven_info["category"];
      models.Alert.find({"venue": venue_param}).sort('-timestamp').exec(afterAlertQuery); // find alerts for this venue
      function afterAlertQuery(err, venue_specific_alerts) {
        if(err) {console.log(err); res.send(500); }
          res.render('alerts', {
          'venue': venue_param,
          'favorited': favorited,
          'description': description,
          'imageURL': imageURL,
          'address': address,
          'telephone': telephone,
          'hours': hours,
          'website': website,
          'specific_alert': venue_specific_alerts,
          'latitude': latitude,
          'longitude': longitude,
          'backURL': backURL,
          'category': cap(category)
        });
      }
    }


	 	
};