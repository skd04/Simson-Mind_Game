// Create a Array to store colors.
var buttonColours = ["red", "blue", "green", "yellow"];

// Set a empty array for store computer patterns.
var gamePattern = [];

// Set a empty array for store user patterns.
var userClickedPattern = [];

// Set a level variable to count.
var level = 0;

// Let a variable to run the code.
var gameStarted = false;

// Create a function for playing the sound.
function playeSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Create a function for animation of pressing the buttons.
function animatePress(selector, className, timer) {
 
    $(selector).addClass(className); // Add class to start the animation.
  
    // Run setTimeout function to set a timer.
    setTimeout(function () { 
    
        $(selector).removeClass(className); // Remove class to end the animation.
    
    }, timer); // Give a duration that sets the time.
}

// Create a function for tracking the computer pattern using random module.
function nextSequence() {
     
    // Level increase by 1.
     level++;

    // Change the h1 text to level 1.
    $("#level-title").text("Level " + level);

    // Generate a random number from 0 to 3.
    var randomNumber = Math.floor(Math.random() * 4);

    // Use the random number as a index number.
    var randomChosenColour = buttonColours[randomNumber]; 
    
    // Push those random colours on computers empty array.
    gamePattern.push(randomChosenColour); 

    // Set a command which gives an animation to show which button is pressed.
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // Call the playSound function to play the sounds.
    playeSound(randomChosenColour);

    // Call the animatePress function to animate all buttons.
    animatePress("." + randomChosenColour, "pressed", 100);

    // Reset User Clicks.
    userClickedPattern = [];
    
}

// Create a function to restart the game.
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

// Create a function to check the user's selection.
function checkAnswer(currentLevel) {

    // Check user's current level and games current level matching or not.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // Check the length of those two arrays.
        if (gamePattern.length === userClickedPattern.length) {

            // Set a time to run a delay for the nextsquence.
            setTimeout(function() {

                // Call the next sequence at 1000 miliseconds delay.
                nextSequence();
            },1000);
        }
    } else {
        
        // Play the wrong buzzer sound.
        playeSound("wrong");

        // Animate background when it user is wrong.
        animatePress("body", "game-over", 200);

        // Change the heading to Game Over.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call the restart function.
        startOver();
    }
}

// Give a code to read the clicks of the user.
$(".btn").click(function () {
    
    // Set a variable to store the user's clicks.        
    var userChosenColour = $(this).attr("id");
    
    // Push all choices to the empty array.
    userClickedPattern.push(userChosenColour);

    console.log(userChosenColour); //Testing purpose.

    // Call the playSound function to play the sounds.
    playeSound(userChosenColour);

    // Call the animatePress function to animate all buttons.
    animatePress("." + userChosenColour, "pressed", 100);

    // Check the answer.
    checkAnswer(userClickedPattern.length - 1);
});

// Check the key press and then run the nextSequence function.
$(document).keydown(function() {
    if (!gameStarted) {

        // Change the h1 text to level 1.
        $("#level-title").text("Level " + level);

        // Call the function to pre define the choice.
        nextSequence();

        // Make gameStarted true that not accepting any other keypress.
        gameStarted = true;
    }
});


