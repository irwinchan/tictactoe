$(document).ready(function() {


  function Player (number, marker) {
    this.moves = [];
    this.number = number;
    this.marker = marker;

    this.move = function(square) {
      square.addClass("player" + this.number);
      square.removeClass("empty");
      square.html(this.marker);
    }
  }

  var winConditions = [
    ["1-1", "1-2", "1-3"],
    ["2-1", "2-2", "2-3"],
    ["3-1", "3-2", "3-3"],
    ["1-1", "2-1", "3-1"],
    ["1-2", "2-2", "3-2"],
    ["1-3", "2-3", "3-3"],
    ["1-1", "2-2", "3-3"],
    ["1-3", "2-2", "3-1"]
  ];

  checkWin = function (player){
    var playerNumber = "player" + player.number;

    win = false;
    for(i = 0; i < winConditions.length; i++) {
      for(j = 0; j < winConditions[i].length; j++) {
        var square = $("#" + winConditions[i][j]);

        if(square.hasClass(playerNumber)) {
          win = true;
        }else{
          win = false;
          break;
        }

        if(win == true && j == 2) {
          return true;
        }
      }
    }
    return false;
  }

  $(".board").on("click", ".grid-square", function(){
    if($(this).hasClass("empty")) {
      activePlayer.move($(this));

      if(checkWin(activePlayer) == true) {
        alert("WIN");
      }

      if (activePlayer == player1) {
        activePlayer = player2;
      }else{
        activePlayer = player1;
      }
    }
  });

  var player1 = new Player(1, "X");
  var player2 = new Player(2, "O");
  var activePlayer = player1;
});




