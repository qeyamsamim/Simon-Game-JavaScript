var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var title = $("#level-title");

var level = 0;

var isStarted = false;

// This part is used to start or restart the game by asking the user to press the Enter key.
$(document).keypress(function(event) {
    if (!isStarted && event.keyCode === 13) {
        title.text("Level " + level);
        nextSequence();
        isStarted = true;
    }
});

// It detects which button is pressed by the user. 
$(".btn").click(function() {
    if (isStarted) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

// This function calculates the next sequence for user. It is called at the beginning of the game and when the is over.
function nextSequence() {
    userClickedPattern = [];
    level++;
    title.text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(input) {
    var btnSound = new Audio("sounds/" + input + ".mp3");
    btnSound.play();
}

// This function animates the button.
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

/* This function checks the user answer with the random chosen color by the game. If correct, the nextSequence function is called.
The startOver function is called if the user answer is wrong.*/
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        title.text("Game Over, Press Enter to Restart");
        startOver();
    }
}

// This function restarts the game and resets the level, gamePattern, and isStarted.
function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
}