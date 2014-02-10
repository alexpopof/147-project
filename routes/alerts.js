exports.view = function(req, res){
  var venue = req.params.venue;
  res.render('alerts', {'venue': venue});
};