// Alphabet array
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Variables for wins, losses, remaining guesses, and an array for used letters
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var usedLetters = [];

// Variable for generating a random letter
var randomGameLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
console.log(randomGameLetter);

// Function for resetting the game
function reset() {
	guessesRemaining = 10;
    usedLetters = [];
    randomGameLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    console.log(randomGameLetter);
};

// Function for operating the game by pressing a key to start it
document.onkeyup = function(event) {

    // Counting down the remaining guesses after each attempt by -1
    guessesRemaining--;
    
    // Variable for guessed letter
    var guessedLetter = event.key;

	usedLetters.push(guessedLetter);
	document.querySelector("#guessesRemaining").innerHTML = guessesRemaining;
    document.querySelector("#usedLetters").innerHTML = usedLetters.join(' , ');
    
    // "if" statement dictating what happens when a guessed letter matches the random letter (win count up by one)
    // and when the remaining guesses reaches zero without a match (lose count up by one).

    if(guessedLetter === randomGameLetter){
        wins++;
        document.querySelector("#wins").innerHTML = wins;
        reset();
    }else if(guessesRemaining === 0){
        losses++;
        document.querySelector("#losses").innerHTML = losses;
        reset();
    };

    // document.getElementById('#wins').innerHTML = "Wins: " + wins;
    // document.getElementById('#losses').innerHTML = "losses: " + losses;
    // document.getElementById('#guesses').innerHTML = "Guesses left: " + guesses;

};