$(document).ready(function() {

  function Player (number) {
    this.number = number;

    this.move = function(square) {
      square.addClass("player" + this.number);
      square.removeClass("empty");
    }
  }


  function setGame(){
    moveCounter = 0;
    activePlayer = player1;

    $(".game-status h1").hide();

    var squares = $(".grid-square")
    for(i = 0; i < squares.length; i++){
      $(squares[i]).removeClass("player1 player2 highlight");
      if(!$(squares[i]).hasClass("empty")){
        $(squares[i]).addClass("empty");
      }
    }

    $(".board").on("click", ".grid-square", function(){
      if($(this).hasClass("empty")) {
        activePlayer.move($(this));
        moveCounter++;

        if(checkWin(activePlayer) == true) {
          $(".board").off();
        }else if(moveCounter == 9) {
          alert("Cats game no one wins!");
        }

        if (activePlayer == player1) {
          activePlayer = player2;
        }else{
          activePlayer = player1;
        }
      }
    });
  }

  function checkWin (player) {

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

    var playerNumber = "player" + player.number;
    var win = false;

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
          highlightSquares(winConditions[i]);
          displayWinner(player);

          return true;
        }
      }
    }

    return false;
  }

  function highlightSquares(squares){
    for(i = 0; i < squares.length; i++) {
      $("#" + squares[i]).addClass("highlight");
    }
  }

  function displayWinner(winner) {
    $(".game-status .player" + winner.number).show();
  }

  $(".main").on("click", ".button.reset", function(){
    setGame();
  });

  var moveCounter = 0;
  var player1 = new Player(1);
  var player2 = new Player(2);
  var activePlayer = player1;

  setGame();
});




