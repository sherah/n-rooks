(function(){
  var ButtonsView = Backbone.View.extend({
      tagName: "div",
      initialize: function (){
        this.nSize();
        this.nRooks();
        this.randomRooks();
        this.nQueens();

      },    
      render: function (){ 
        return this.$el;
      },

      nSize: function(){
        var size = 
            "<div>\
              <span class='goButton' id='setBoardSize'>Go</span>\
              <span> Size = <input type='text' id='nSizeInput' value='4'></input> </span>\
             </div>"
        this.$el.append(size);
        this.$el.on('click', '#setBoardSize', function(){
          createAnEmptyBoard($('#nSizeInput').val());
        });

      },
      nRooks: function(){
          var nRooksButton ="<span class='goButton' id='solveNRooks'>Go</span>";    
          var nRooksLabel = "<label>Generate rooks in a diagonal line</label>";
          this.$el.append(nRooksButton);
          this.$el.append(nRooksLabel);
          this.$el.on('click', '#solveNRooks', function(){
            
            solveNRooks($('#nSizeInput').val());
          });
      },
      randomRooks: function(){
        var randomRooksButton = "<p><span class='goButton' id='solveRandomRooks'>Go</span><label> Generate random rook solution</label></p>";  
        this.$el.append(randomRooksButton);
        this.$el.on('click', '#solveRandomRooks', function(){
          
          solveRandomRooks($('#nSizeInput').val());
        });
      },
      nQueens: function(){
        var nQueensButton = "<span class='goButton' id='solveNQueens'> Go </span><label> Generate a nQueens Solution</label>"
        this.$el.append(nQueensButton);
        this.$el.on('click', '#solveNQueens', function(){
          solveNQueens($('#nSizeInput').val());
        });

      }
  });
  this.ButtonsView = ButtonsView;
}());
