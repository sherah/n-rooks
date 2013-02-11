var solveNQueens = function(n){
  var chester = buildChester(n);

  // this line hooks into the visualizer
  window.chessboardView.model.setSimpleBoard(chester);

  
  placeQueens(chester, chester.length);
 
};

var placeQueens = function (chester, n){ 
  var queensLeft = n;
  var queenLocations = [];
  var recursivePlacement = function (r,c, chester){
    if((queensLeft !== 0)  && (r === chester.length || c === chester.length) ){
      //Lets Try again
      queensLeft = n;
      queenLocations = [];
      r = 0;
      c = 1;
    }

    while(queensLeft > 0){
      chester[r][c].piece = true;
      window.chessboardView.model.setSimpleBoard(chester);
      if(window.chessboardView.model.hasQueensConflict()){
        chester[r][c].piece = false;
        recursivePlacement(r, c +1 , chester)
      } else{
        queenLocations.push([r,c]);
        queensLeft = queensLeft -1;
        recursivePlacement(r+1 , 0, chester);
      }
    }
    return;
  }

  recursivePlacement(0,0, chester)
};
