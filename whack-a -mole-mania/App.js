const game = { score: 0, gameover: true, last: 0, holes: 12, ender: 25 };

makeGameBoard(); // call the makeGameBoard function to create the game board.

function makeGameBoard() {
  for (let i = 0; i < game.holes; i++) {
    const $div = $("<div>"); // create a new div element.
    const holeId = `hole${i}`; // create a unique id for each hole.
    $div.addClass("hole").addClass(holeId).appendTo(".game"); // add the hole class and the unique id to the div element.
    $("<div>").addClass("dirt").html("🍂").appendTo($div); // add the dirt class to the div element.
    $("<div>").addClass("mole").html("🐹").appendTo($div); // add the mole class to the div element.
    $("<div>").addClass("hit").html("☠️").appendTo($div); // add the hit class to the div element.
  }
}

$("#start").click(startGame); // start game by clicking the button with the id of "start". This calls the startGame function.

function startGame() {
  $("#start").hide(); // hide the start button.
  game.gameover = false; // set the gameover property to false since the game has started.
  game.score = 0; // reset the score back to 0.
  game.ender = 25; // reset the ender back to 25.
  starter(); // start the process of showing the moles.
}

function message() {
  let html = `<div>Score: ${game.score}</div><div>Moles Left: ${game.ender}</div>`; // create the html for the message div.
  $(".message").html(html); // update the message div with the score and moles left.
}

function starter() {
  const $ele = $(".hole" + randomHole()); // get a random hole and store it in the $ele variable.
  console.log($ele); // log the $ele variable to the console. This is the mole.
  showMole($ele); // call the showMole function and pass the $ele variable to it.
}

function showMole($ele) {
  game.ender--; // decrement the ender property by 1.
  message(); // call the message function to show how many moles are left.
  if (game.ender <= 0) {
    game.gameover = true; // set the gameover property to true.
    $("#start").show(); // show the start button.
  }

  const timer = Math.round(Math.random() * 1000) + 200; // generate a random number between 200 and 1200.

  $ele.find(".dirt").hide(0, () => {
    $ele.find(".mole").show(); // hide the dirt and show the mole.
  });
  setTimeout(() => {
    $ele.find(".dirt").show(); // show the dirt.
    $ele.find(".mole").hide(); // hide the mole.
    $ele.find(".hit").hide(); // hide the hit.
    if (!game.gameover) {
      // if the game is not over, call the starter function again.
      starter();
    }
  }, timer);
}

function randomHole() {
  // generate a random value between 0 and the number of holes on the board.
  const randomVal = Math.floor(Math.random() * game.holes);

  if (randomVal === game.last) {
    // if the random value is the same as the last random value, call the function again.
    // This prevents the mole from appearing in the same hole twice in a row.
    return randomHole();
  }

  game.last = randomVal; // set the game.last property to the random value for the next iteration.

  return randomVal; // return the random value.
}

// Add click method to the game object with the on method.
// When the mole is clicked, call the hitMole function.
// We only want the moles to be clickable.
$(".game").on("click", ".mole", hitMole);

function hitMole() {
  // hide the mole and show the hit.
  $(this)
    .hide()
    .parent()
    .find(".hit")
    .show()
    .fadeOut(200, function () {
      $(this).parent().find(".dirt").show();
    }); // fade out the hit and show the dirt.
  game.score++; // increment the score by 1.
  message(); // call the message function.
}
