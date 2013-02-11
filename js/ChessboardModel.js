(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.setSimpleBoard(params.board);
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    setSimpleBoard: function(simpleBoard){
      this.set('board', this.makeBoardFromSimpleBoard(simpleBoard));
      this.set('n', this.get('board').length);
    },

    makeBoardFromSimpleBoard: function(simpleBoard){
      var that = this;
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: ((r+c)%2),
            inConflict: function(){
              //

              // todo: how expensive is this inConflict() to compute?
              return (
                that.hasRowConflictAt(r) ||
                that.hasColConflictAt(c) ||
                that.hasUpLeftConflictAt(r, c) ||
                that.hasUpRightConflictAt(r, c)

              );
            }
          };
        }, this);
      }, this);
    },

    makeEmptyBoard: function(){
      var board = [];
      _.times(this.get('n'), function(){
        var row = [];
        _.times(this.get('n'), function(){
          row.push(false);
        }, this);
        board.push(row);
      }, this);
      return this.makeBoardFromSimpleBoard(board);
    },

    // we want to see the first row at the bottom, but html renders things from top down
    // So we provide a reversing function to visualize better
    reversedRows: function(){
      return _.extend([], this.get('board')).reverse();
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    _getUpLeftIndex: function(r, c){
      return {
        row: r,
        col: c
      };
    },

    _getUpRightIndex: function(r, c){
      return {
        row: r,
        col: c
      }
    },


    hasRooksConflict: function(){
      return this.hasAnyRowConflict() || this.hasAnyColConflict();
    },

    hasQueensConflict: function(){
      return this.hasRooksConflict() || this.hasAnyUpLeftConflict() || this.hasAnyUpRightConflict();
    },

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){
      var chester = this.get('board'); 
      var n = this.get('n'); 

      var firstPiece = false;

      for(var row = 0; row < n; row ++)
      { 
        firstPiece = false; 
        for(var theColumn = 0; theColumn < n; theColumn++){ 
          if(chester[row][theColumn].piece){
            if(!firstPiece){
              firstPiece = true;
            }else {
              return true;
            }
          }
        }

      }
      return false;  
    },

    hasRowConflictAt: function(r){
      var chester = this.get('board'); 
      var n = this.get('n'); 

      var firstPiece = false;
      for(var theColumn = 0; theColumn < n; theColumn++){ 
          if(chester[r][theColumn].piece){
            if(!firstPiece){
              firstPiece = true;
            }else {
              return true;
            }
          }
        }

      return false; 
    
    },

    hasAnyColConflict: function(){
      var chester = this.get('board');
      var firstPiece = false;
      for(var c = 0; c < this.get('n'); c++){
        firstPiece = false;
        for(var i=0; i < this.get('n'); i++){
          if(chester[i][c].piece){
            if(!firstPiece){
              firstPiece = true;
            }else{
              return true;
            }
          }
        }
      }
      return false;
    },

    hasColConflictAt: function(c){
      var chester = this.get('board');
      var firstPiece = false;
      for(var i=0; i < this.get('n'); i++){
        if(chester[i][c].piece){
          if(!firstPiece){
            firstPiece = true;
          }else{
            return true;
          }
        }
      }
      return false;
    },

    hasAnyUpLeftConflict: function(){
      var chester = this.get('board');
      var length = this.get('n');
      conflictFound = false;
      for( var r = 0; r < length; r++){
        for(var c = 0; c < length; c++){
          if(!conflictFound){
            if(chester[r][c].piece){
              conflictFound = this.recursiveUpLeft(r, c);
            }
          }else{
            return conflictFound
          }    
        }
      }
      return conflictFound;
    },

    recursiveUpLeft: function(r, c){
      var chester = this.get('board');
      var length = this.get('n');
      if(c === 0 || r === (length - 1)) {
        return false;
      }
      var rNew = r + 1;
      var cNew = c - 1;
      if(chester[rNew][cNew].piece){
        return true;
      }else {
       return this.recursiveUpLeft(rNew, cNew);
      }
    },

    hasUpLeftConflictAt: function(rLoc, cLoc){
      var chester = this.get('board');
      var length = this.get('n');
      conflictFound = false;
      for( var r = rLoc; r < length; r++){
        for(var c = cLoc; c < length; c++){
          if(!conflictFound){
            if(chester[r][c].piece){
              conflictFound = this.recursiveUpLeft(r, c);
            }
          }else{
            return conflictFound
          }    
        }
      }
      return conflictFound;
    },

    hasAnyUpRightConflict: function(){
      var chester = this.get('board');
      var length = this.get('n');
      conflictFound = false;
      for( var r = 0; r < length; r++){
        for(var c = 0; c < length; c++){
          if(!conflictFound){
            if(chester[r][c].piece){
              conflictFound = this.recursiveUpRight(r, c);
            }
          }else{
            return conflictFound
          }    
        }
      }
      return conflictFound;
    },

    hasUpRightConflictAt: function(rLoc, cLoc){
      var chester = this.get('board');
      var length = this.get('n');
      conflictFound = false;
      for( var r = rLoc; r < length; r++){
        for(var c = cLoc; c < length; c++){
          if(!conflictFound){
            if(chester[r][c].piece){
              conflictFound = this.recursiveUpRight(r, c);
            }
          }else{
            return conflictFound
          }    
        }
      }
      return conflictFound;
    },
    recursiveUpRight: function(r,c){
      var chester = this.get('board');
      var length = this.get('n');
      if(c === (length -1) || r === (length - 1)) {
        return false;
      }
      var rNew = r + 1;
      var cNew = c + 1;
      if(chester[rNew][cNew].piece){
        return true;
      }else {
       return this.recursiveUpRight(rNew, cNew);
      }
    }

  });

  this.ChessboardModel = ChessboardModel;

}());
