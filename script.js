$(document).ready(function() {

  var playerTurn = 1;
  var player1Moves = [];
  var player2Moves = [];
  var winner = false;
  var winningSquares = [];
  var moveCount = 0;

  function diagWin(player) {
    var winner = false;
    var diagLeftRight = ["1-1", "2-2", "3-3"];
    var diagRightLeft = ["1-3", "2-2", "3-1"];

    if (checkDiag(diagLeftRight)) {
      return true;
    }else if (checkDiag(diagRightLeft)) {
      return true;
    }else{
      return false;
    }

    function checkDiag(direction) {
      var winner = false;
      for(var i = 0; i < direction.length; i++) {
        if(player.indexOf(direction[i]) <  0) {
          winner = false;
          break;
        }else{
          winner = true;
        }
      }
      return winner;
    }
  }

  function rowWin(player) {
    for(var row = 1; row <= 3; row++) {
      for(var col = 1; col <= 3; col++) {
        if(player.indexOf(row + "-" + col) >= 0) {
          winningSquares.push(row + "-" + col);
        }else{
          winningSquares = [];
          break;
        }
      }
      if (winningSquares.length == 3) {
        return true;
      }
    }
  }

  function colWin(player) {
    for(var col = 1; col <= 3; col++) {
      for(var row = 1; row <= 3; row++) {
        if(player.indexOf(row + "-" + col) >= 0) {
          winningSquares.push(row + "-" + col);
        }else{
          winningSquares = [];
          break;
        }
      }
      if (winningSquares.length == 3) {
        return true;
      }
    }
  }

  function checkWin(player){
    if (rowWin(player) || colWin(player) || diagWin(player)) {
      alert("Player " + playerTurn + " is the winner!");
      winner = true;
    }
  }

  function isCatsGame() {
    if(moveCount >= 9) {
      alert("Cats Game, that means nobody wins!");
    }

  }

  // change the color of grid-square when clicked
  $(".board").on("click", ".grid-square", function(){
    if($(this).css("background-color") == "rgb(255, 255, 255)" && winner == false) {
      if (playerTurn == 1) {
        $(this).css('background-color', 'red');
        this.innerHTML = "O";
        player1Moves.push(this.id);
        checkWin(player1Moves);
        playerTurn = 2;
      }else{
        $(this).css('background-color', 'blue');
        this.innerHTML = "X";
        player2Moves.push(this.id);
        checkWin(player2Moves);
        playerTurn = 1;
      }
      moveCount++;
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
    playerTurn = 1;
    player1Moves = [];
    player2Moves = [];
    winner = "";
    winningSquares = [];
    moveCount = 0;
  });
});