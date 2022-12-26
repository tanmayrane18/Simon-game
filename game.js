var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var gameStarted=false;


$(document).on("keypress",function(){
  if (!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted=true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function animatePress(currentColour){
    
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
    
}

function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]){
      // console.log("last index same");
      if (userClickedPattern.length ===  gamePattern.length){
        // console.log("success");
        setTimeout(function(){nextSequence();},1000);
      }
    }
      else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
      }
    
}

function startover(){
  level=0;
  gamePattern=[];
  gameStarted=false;
}
// var audio = new Audio("sounds/" + userChosenColour + ".mp3");
//     audio.play();

