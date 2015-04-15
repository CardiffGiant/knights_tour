var currentPosition;
var listOfMoves = [];
var curr = 0;
var tour;
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
         var row = this.buildRow(dimension, j);
         if(j%2===0) {
            row.setAttribute("class", "even");
         } else {
            row.setAttribute("class", "odd");
         }
         board.appendChild(row);
      }
      return board;
   },
   
   buildRow: function(dimension, rowIndex) {
      var row = document.createElement("ul");
      for (var k=0; k < dimension; k+=1) {
         var square = document.createElement("li");
         square.setAttribute("id",rowIndex +"_"+ k);
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
   },
   clear: function() {
      var squares = document.getElementsByTagName("li");
      for(var i=0; i<squares.length; i+=1) {
         squares[i].setAttribute("class","");
         squares[i].innerText = "";
      }
   }
}
function setCurrentPosition(x,y) {
   currentPosition = [x,y];
   console.log(currentPosition);
}
function setStart() {
   var startX, startY;
   startX = Math.floor(Math.random() * 8);
   startY = Math.floor(Math.random() * 8);
   gameTable.visited(document.getElementById(startX+"_"+startY));
   var start = "x: " + startX + "   " + "y: " + startY
   setCurrentPosition(startX, startY);
   listOfMoves[0] = currentPosition;
}
function isLegal(move) {
   var current = currentPosition, squareToCheck = [];
   squareToCheck = [current[0]+move[0],current[1]+move[1]];
   if (squareToCheck[0]<8 && squareToCheck[0]>=0 && squareToCheck[1]<8 && squareToCheck[1]>=0) {
      return (document.getElementById(squareToCheck[0]+"_"+squareToCheck[1]).className!=="visited");
   }
   return false;
}
function getMove() {
   var legalMoves = [], i, move;
   for (i=0; i<MOVES.length; i+=1) {
      if(isLegal(MOVES[i])) {
         legalMoves.push(MOVES[i]);
      }
   }
   if(legalMoves.length > 0) {
      console.log("legal moves: " + legalMoves);
      move = Math.floor(Math.random() * legalMoves.length);
      console.log("making move: " + MOVES[move]);
   } else {
      console.log("no more legal moves.");
      
      return false;
   }
   moveKnight(legalMoves[move]);
   return true;
}
function moveKnight(move) {
   var newX = currentPosition[0]+move[0];
   var newY = currentPosition[1]+move[1];
   currentPosition = [newX,newY];
   gameTable.visited(document.getElementById(currentPosition[0]+"_"+currentPosition[1]));
   listOfMoves.push(currentPosition);
   console.log("current position: " + currentPosition);
}
function runTour() {
   if (listOfMoves.length > 0) {
      listOfMoves = [];
      curr = 0;
      gameTable.clear();
      setStart();
   }
   var test = true;
   while(test) {
      test = getMove();
   }
   document.getElementById("move").innerText = "Clear and ReTour";
   document.getElementById("move").disabled = true;
   showTour();
}
function showTour() {
   console.log("current: " + curr);
   tour = setInterval(function(){setImage();},300);
}
function setImage() {
   console.log("in setImage, current is: " + curr);
   var target;
   
   if(curr < listOfMoves.length) {
      target = document.getElementById(listOfMoves[curr][0]+"_"+listOfMoves[curr][1]);
      if(curr === 0) {
         target.setAttribute("class","isStart");
         target.innerText = curr;
         curr +=1;
      } else if(curr === listOfMoves.length-1) {
         target.setAttribute("class","isLast");
         target.innerText = curr;
         curr +=1;
      } else {
         target.setAttribute("class","hasImage");
         target.innerText = curr;
         curr +=1;
      }
   } else {
      clearInterval(tour);
      document.getElementById("move").disabled = false;
      
   }
}
window.onload = function() {
   gameTable.setBoard();
   setStart();
   document.getElementById("move").addEventListener("click",runTour);
};

var MOVES = [[2,1],[1,2],[-1,2],[-1,-2],[-2,1],[-2,-1],[1,-2],[2,-1]];