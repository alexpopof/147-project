
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

    var currentTime = new Date();

  //Code to process amount of time left till closing or if venue is closed

  function getStatus(venue) {
  
        var closingTime = venue["closed"];
        var openingTime = venue["open"];
        var tempHours = currentTime.getHours() - 8;
        tempHours = tempHours < 0 ? tempHours + 24 : tempHours;
        var tempMinutes = currentTime.getMinutes();
        var currTime = tempHours + ":" + tempMinutes;


        var status;
        var remainingTime;
        var hourTest = 0;
        var minTest = 0;

        //openingTime = "8:00";
        startTotalMin = 0;
        endTotalMin = 0;
        //weird timing issue resolved with if statement
        if (openingTime != 1) {
          openingTime.split(":");
          if (openingTime[1] == ":") {
            startTotalMin = openingTime[0] * 60 + openingTime[2] * 10;
          } else {
            startTotalMin = openingTime[0] * 600 + openingTime[1] * 60
            + openingTime[3] * 10;
          }
        }
        if (closingTime != 1) {
          closingTime.split(":");
          if (closingTime[1] == ":") {
            endTotalMin = closingTime[0] * 60 + closingTime[2] * 10;
          } else {
            endTotalMin = closingTime[0] * 600 + closingTime[1] * 60
            + closingTime[3] * 10;
          }
        }
        
        var currTotalMin = tempMinutes + tempHours * 60;

        startTotalMin = parseInt(startTotalMin);
        currTotalMin = parseInt(currTotalMin);
        endTotalMin = parseInt(endTotalMin);

        if (endTotalMin < startTotalMin) endTotalMin += 1440;
        if (currTotalMin < startTotalMin) currTotalMin += 1440;

        var remainingTime;
        if (startTotalMin < currTotalMin && currTotalMin < endTotalMin) {
          remainingTime = endTotalMin - currTotalMin;
        }

        
        var status;
        if(remainingTime > 0) {
          if (remainingTime > 59) {
            var division = remainingTime / 60;
            statusHours = Math.floor(division);
            statusMinutes = remainingTime % 60;
            status = statusHours + " hours and " + statusMinutes + " minutes until closing";
          } else {
            status = remainingTime + " minutes until closing";
          }
        } else {
          status = "Closed";
        }
        return status;
      }


    models.Venue.find({"name": venue_param}).exec(afterVenueQuery);

    function afterVenueQuery(err, venues) {
      if(err) {console.log(err); res.send(500); }


      var ven_info = venues[0]; // 1 match
      var status = getStatus(ven_info);     
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
          'status': status,
          'category': cap(category)
        });
      }
    }


	 	
};