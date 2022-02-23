var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function(event){
        if(event.key == "a" && !gameStarted)
        {
            nextSequence();
            gameStarted = true;
        }    
});

function nextSequence()
{
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    userPattern = [];
}

function playSound(name)
{
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },
    100);
}

$(".btn").click(function(event){
    var userChosenColor = this.getAttribute("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor);
});

function checkAnswer(answer)
{
    if(answer == gamePattern[userPattern.length - 1])
    {
        if(userPattern.length == level) //go on to next level
        {
            setTimeout(nextSequence,1000);
        }
    }
    else
    {
        gameOver();
        startOver();
    }
}

function gameOver()
{
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, press A to try again.");
}

function startOver()
{
    gamePattern = [];
    userPattern = [];
    gameStarted = false;
    level = 0;
}
