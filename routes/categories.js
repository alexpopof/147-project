exports.view = function(req, res){
	cats_list = ['Food', 'Workout', 'Party']
  res.render('categories', {
    'cats': [
            {'name': cats_list[0], 'name_lower': cats_list[0].toLowerCase(), 'icon': 'glyphicon-cutlery' },
            {'name': cats_list[1], 'name_lower': cats_list[1].toLowerCase(), 'icon': 'glyphicon-flag'},
            {'name': cats_list[2], 'name_lower': cats_list[2].toLowerCase(), 'icon': 'glyphicon-bullhorn'},
        ],
  });
};

