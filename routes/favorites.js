exports.view = function(req, res) {
  // controller code goes here
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
    ]  
   
  });


};