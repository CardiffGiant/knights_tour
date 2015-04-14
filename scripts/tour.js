
var gameTable = {
   dimension: 8,
   table: document.getElementById("gameTable"),
   
   setBoard: function() {
      this.table.appendChild(this.buildBoard(this.dimension));
   },
   
   buildBoard: function(dimension) {
      var board = document.createElement("ul");
      board.setAttribute("id", "board");
      for (var j=0; j<dimension; j+=1) {
         var row = this.buildRow(dimension);
         if(j%2===0) {
            row.setAttribute("class", "even");
         } else {
            row.setAttribute("class", "odd");
         }
         board.appendChild(row);
      }
      return board;
   },
   
   buildRow: function(dimension) {
      var row = document.createElement("ul");
      for (var k=0; k < dimension; k+=1) {
         var square = document.createElement("li");
         gameTable.setEvent(square);
         row.appendChild(square);
      }
      return row;
   },
   setEvent: function(listItem) {
      listItem.addEventListener("click", function(){gameTable.visited(listItem);})
   },
   visited: function(listItem) {
      listItem.setAttribute("class", "visited");
   }
}

window.onload = function() {
   gameTable.setBoard();
};
