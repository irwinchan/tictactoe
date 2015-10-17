$(document).ready(function() {
  var playerTurn = 1;
  var player1Moves = [];
  var player2Moves = [];
  var winner = false;
  var winningSquares = [];
  var moveCount = 0;


  function setupGame (){
    playerTurn = 1;
    player1Moves = [];
    player2Moves = [];
    winner = false;
    winningSquares = [];
    moveCount = 0;
  }

  function checkWin(player) {
    var winConditions = [
      ["1-1", "1-2", "1-3"],
      ["2-1", "2-2", "2-3"],
      ["3-1", "3-2", "3-3"],
      ["1-1", "2-1", "3-1"],
      ["1-2", "2-2", "3-2"],
      ["1-3", "2-3", "3-3"],
      ["1-1", "2-2", "3-3"],
      ["1-3", "2-2", "3-1"],
    ];

    for(i = 0; i < winConditions.length; i++ ) {
      for(j = 0; j < winConditions[i].length; j++) {
        if(player.indexOf(winConditions[i][j]) < 0) {
          winningSquares = [];
          break;
        }else{
          winningSquares.push(winConditions[i][j]);
        }
      }
      if(winningSquares.length == 3) {
        winner = true;
        highlightSquares();
        $(".board").off("click");
        alert("Player " + playerTurn + " is the winner!");
        break;
      }
    }
  }

  function highlightSquares() {
    for(i = 0; i < winningSquares.length; i++) {
      $("#" + winningSquares[i]).css("background-color", "yellow");
    }
  }

  function isCatsGame() {
    if(moveCount >= 9) {
      alert("Cats Game, that means nobody wins!");
    }
  }

  function playerMove(player, color, marker, square) {
    square.css('background-color', color);
    square.innerHTML = marker;
    player.push(square.id);
    moveCount++;
  }

  $(".board").on("click", ".grid-square", function(){
    if($(this).css("background-color") == "rgb(255, 255, 255)") {
      if (playerTurn == 1) {
        // $(this).css('background-color', 'red');
        // this.innerHTML = "O";
        // player1Moves.push(this.id);
        playerMove(player1Moves, "red", "O", $(this));
        checkWin(player1Moves);
        playerTurn = 2;
      }else{
        // $(this).css('background-color', 'blue');
        // this.innerHTML = "X";
        // player2Moves.push(this.id);
        playerMove(player2Moves, "blue", "X", $(this));
        checkWin(player2Moves);
        playerTurn = 1;
      }
      isCatsGame();
    }
  });

  $(".main").on("click", ".button.reset", function(){
    //reset square colors and text
    for(var col = 1; col <= 3; col++) {
      for(var row = 1; row <= 3; row++) {
        $("#" + col + "-" + row).css("background-color", "rgb(255, 255, 255)");
        $("#" + col + "-" + row).empty();
      }
    }

    setupGame();
  });

  setupGame();

});