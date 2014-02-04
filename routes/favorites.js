exports.view = function(req, res) {
  // controller code goes here
  var category = req.params.category;
  var cap = function capitaliseFirstLetter(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  category = cap(category);
    res.render('favorites', {
    'unselected':
    [
      { 'name': 'Option #1',
      },
      { 'name': 'Option #2',
      },
      { 'name': 'Option #3',        
      },
      { 'name': 'Option #4',        
      },     
      { 'name': 'Option #5',        
      }
    ],
    'favorites':
    [
      { 'name': 'Favorite #1',         
      },
      { 'name': 'Favorite #2', 
      },
      { 'name': 'Favorite #3', 
      },      
      { 'name': 'Favorite #4', 
      },
      { 'name': 'Favorite #5', 
      }
    ],
    'category': category
   
  });


};