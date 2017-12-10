var gameObject = {
	currentLetter: "",

	allGuesses: [],
	incorrectGuesses: [],
	correctGuesses: [],
	correctGuessesInOrder: [],

    termsArray: ["BELFAST", "SOUTHAMPTON", "LIVERPOOL", "NEW  YORK", "BOW", "STERN", "PORT", "STARBOARD", "ROBERT  BALLARD", "JAMES  CAMERON", "CAPTAIN  SMITH", 
    "JOHN  JACOB  ASTOR", "BRUCE  ISMAY", "CUNARD", "QUEENSTOWN", "WALTER LORD", "CHERBOURG", "TITANIC", "WHITE  STAR  LINE", "MARCONI", "CARPATHIA", "NORTH  ATLANTIC", "OLYMPIC", "BRITANNIC", "THOMAS  ANDREWS"],
	randomWord: "",
    termLetters:[],

	isMatch: null,
	isRepeat: null,

	guessesRemaining: 21,
	loseCount: 0,
	winCount:0,

	generateWord: function(){
		//Random number from 0-25 for the 25 terms in the termsArray
		var randomNum = Math.random() * 26;
		randomNum = Math.floor(randomNum);

		//randomWord is a randomly chosen word from the array and an array is created containing the individual letters of the randomly chosen words
		this.randomWord = this.termsArray[randomNum];
		this.termLetters = this.randomWord.split("");

		//Letters of random words scrambled and made into array 
		console.log(this.randomWord + " " + this.termLetters);

		//Guess arrays are reset with every win or loss
		this.allGuesses = [];
		this.incorrectGuesses = [];
		this.correctGuesses = [];
		this.correctGuessesInOrder = [];
		this.guessesRemaining = 21;
	},

	checkRepeat: function(){
		var repeatCounter = -1;

		//Looping the number of attempted guesses; if the current letter equals one from the allGuesses array, the counter variable counts up one.
		for (var i=0; i < this.allGuesses.length; i++){
			if (this.currentLetter == this.allGuesses[i]){
				repeatCounter++;
			}
		}
		//If no match is found, the counter is zero, and the isRepeat variable becomes false, but if a match was found, isRepeat becomes true.
		if (repeatCounter == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},
	checkMatch: function(){
		var matchCounter = 0;

		//Looping the number of terms; if the guessed letter equals the terms letter at a given index, the counter variable counts up one.
		for (var i=0; i < this.termLetters.length; i++){
			if (this.currentLetter == this.termLetters[i]){
				matchCounter++;
			}
		}
		//If no match is found, counter is zero, and the isMatch variable becomes false, but if a match was found, isMatch becomes true.
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function(){
		//Remove keys from allGuesses if pressed more than once
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
		//If letter has not been guessed and was wrong, the currentLetter is placed in incorrectGuesses.
		if (this.isRepeat == false && this.isMatch == false){
			this.incorrectGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
		//If letter has not been guessed and was correct, the currentLetter is placed in correctGuesses.
		if (this.isRepeat == false && this.isMatch == true){
			this.correctGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
	},
	revealterm: function(){
		//If there are no correctGuesses, fill the displayed guesses with an underscore.
		if (this.correctGuesses.length == 0){
			for (var i =0; i<this.termLetters.length; i++){
				this.correctGuessesInOrder[i] = "_";
			}
		}
		else {
            //For the length of the terms name, if the displayed guess is not the same as termLetters at index i

			for (var i=0; i<this.termLetters.length; i++){
				if (this.correctGuessesInOrder[i] != this.termLetters[i]){

					//Looping for correctGuesses, if the correctGuesses at j is equal to termLetters at i, the displayedGuess becomes the termletter at index i
					for (var j=0; j<this.correctGuesses.length; j++){
						
						if (this.correctGuesses[j] == this.termLetters[i]){
							this.correctGuessesInOrder[i] = this.termLetters[i];
						}
						//Otherwise the displayedGuess at index i becomes an underscore.
						else {
							this.correctGuessesInOrder[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	},
	checkProgress: function(){
		var counter = 0;

		//Looping a number of times equal to the length of the term name; if a guess is equal to the term letter at the same index, counter variable counts up one.
		for (var i=0; i<this.termLetters.length; i++){
			if (this.correctGuessesInOrder[i] == this.termLetters[i]){
				counter++;
			}
		}

		//The game is won if the counter is the same length as the term name.
		if (counter == this.termLetters.length){
			alert("You win");
			this.winCount++;
			this.generateWord();
		}
		//The game is lost if guessesRemaining remains at zero.
		if (this.guessesRemaining == 0){
			alert("You lose!");
			this.loseCount++;
			this.generateWord();
		}
	}
}

var userStartedGameOnce = false;

//On every keyup currentLetter is converted to upper case and placed into allGuesses array; game should start when any key is pressed, but need to press twice.
document.onkeyup = function(event) {
	gameObject.currentLetter = String.fromCharCode(event.keyCode).toUpperCase();

	if (gameObject.currentLetter == "" && userStartedGameOnce == false){

		gameObject.generateWord();

		userStartedGameOnce = true;
	}

	gameObject.allGuesses.push(gameObject.currentLetter);

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "term Letters: " + gameObject.termLetters + "\n" + "All Guesses: " + gameObject.allGuesses);


	//Checking to see if the letter has been typed previously and if the letter matches with one in the term name.
	gameObject.checkRepeat();
	gameObject.checkMatch();


	//Which array to place the currentLetter into, depending its status.
	gameObject.match_repeatComparison();

	console.log("Correct Guesses:" + gameObject.correctGuesses);
	console.log("Incorrect Guesses:" + gameObject.incorrectGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesRemaining);

	//Term name revealed as it is being guessed.
	gameObject.revealterm();
	console.log(gameObject.correctGuessesInOrder);

	//Checking game progress
	gameObject.checkProgress();
}