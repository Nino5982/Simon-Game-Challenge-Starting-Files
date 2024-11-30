const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = []; //randomChosenColour
const userClickedPattern = []; //userChosenColour
let level = 0;
let gameHasStarted = false;
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  //   console.log(randomChosenColour);
  //   playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);

  let flashedbtn = $("#" + randomChosenColour);
  flashedbtn.fadeOut(100).fadeIn(100);
  level += 1;
  $("#level-title").text("Level " + level);
  console.log("gamePattern " + gamePattern + " level=" + (level - 1));
  userClickedPattern.length = 0;
}

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  return audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(() => {
    $(currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(gamestart);

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  //   console.log(userChosenColour);
  animatePress(this);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  //   playSound(userChosenColour);
  console.log(userClickedPattern.length - 1);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    gameOver();
  }
}

// const gamePattern = []; //randomChosenColour
// const userClickedPattern = []; //userChosenColour

function gameOver() {
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern.length = 0; // თამაშის პატერნის განულება
  gameHasStarted = false; // თამაშის თავიდან დაწყების ნიშანი

  $(document).keydown(gamestart);
}

function gamestart() {
  if (!gameHasStarted) {
    nextSequence();
    $("#level-title").text("level " + level);
    gameHasStarted = true;
  }
}
