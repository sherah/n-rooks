$(function(){

  window.chessboardView = new ChessboardView();
  window.buttonsView = new ButtonsView();
  $("body").append(buttonsView.render());
  $("body").append(chessboardView.render());

  // note: you can switch this out for solveNQueens when you're ready!
  //solveNRooks(4);
});
