var solveNRooks = function(n){
  var chester = buildChester(n);
  placeaRook(chester);
  window.chessboardView.model.setSimpleBoard(chester);
}

var createAnEmptyBoard = function(n){
  window.chessboardView.model.setSimpleBoard(buildChester(n));
}
var placeaRook = function(chester){
  _.each(chester, function(value, parentKey, object){
    var parentArray = object;
    _.each(chester, function(value, key, object){
      //place first object
      if(parentKey === key){
        value[key] = true;
      }
      //place subsequent rooks
    });
  });
}
var buildChester = function(n){
    var chester = [];
    for(var r = 0; r < n; r++){
      chester.push([]);
      for(var c = 0; c < n; c++){
        chester[r].push(false);
      }
    }
    return chester;
}
var placeRandomRook = function(chester, n){
  var r = Math.floor(Math.random() * n);
  var c = Math.floor(Math.random() * n);
  chester[r][c] = true;

  placeMoreRooks(r, c, chester, n);
}
var solveRandomRooks = function(n){
  var chester = buildChester(n);

  placeRandomRook(chester, n);

  window.chessboardView.model.setSimpleBoard(chester);
}
//random rook solutions
var placeMoreRooks = function(row, column, chester, n){
  usedRow = [];
  usedColumn = [];

  usedRow.push(row);
  usedColumn.push(column);

  for(var i = 0; i < n; i++){
    //row
    if(!_.contains(usedRow, i)){
      for(var j = 0; j < n; j++){
        if(!_.contains(usedColumn, j)){
            if(!_.contains(usedRow, i)){
              usedRow.push(i);
              usedColumn.push(j);
              chester[i][j] = true;
              window.chessboardView.model.setSimpleBoard(chester);
          }
        }
      }
    }
  }
}









