//Starting Game//
var startGame = false;

//On every keyup currentLetter is becomes upper case and placed into allBoatGuesses array; game should start when any key is pressed, but need to press twice.
document.onkeyup = function(event) {
	gameLetter.currentLetter = String.fromCharCode(event.keyCode).toUpperCase();

	if (gameLetter.currentLetter == "" && startGame == false){

		gameLetter.generateWord();

		startGame = true;
	}

	gameLetter.allBoatGuesses.push(gameLetter.currentLetter);

	console.log("Current Letter: " + gameLetter.currentLetter + "\n" + "term Letters: " + gameLetter.termLetters + "\n" + "All BoatGuesses: " + gameLetter.allBoatGuesses);


	//Checking to see if the letter has been typed previously and if the letter matches with one in the term name.
	gameLetter.checkRepeat();
	gameLetter.checkMatch();


	//Which array to place the currentLetter into, depending its status.
	gameLetter.match_repeatComparison();

	console.log("Correct BoatGuesses:" + gameLetter.correctBoatGuesses);
	console.log("Incorrect BoatGuesses:" + gameLetter.incorrectBoatGuesses);
	console.log("BoatGuesses Remaining:" + gameLetter.remainingBoatGuesses);

	//Term name revealed as it is being guessed.
	gameLetter.revealTerm();
	console.log(gameLetter.correctOrderedBoatGuesses);

	//Checking game progress
	gameLetter.checkProgress();
}

var gameLetter = {
	currentLetter: "",

	allBoatGuesses: [],
	incorrectBoatGuesses: [],
	correctBoatGuesses: [],
	correctOrderedBoatGuesses: [],

    termsArray: ["BELFAST", "SOUTHAMPTON", "LIVERPOOL", "NEW  YORK", "BOW", "STERN", "PORT", "STARBOARD", 
    "ROBERT  BALLARD", "JAMES  CAMERON", "CAPTAIN  SMITH", "JOHN  JACOB  ASTOR", "BRUCE  ISMAY", "CUNARD", "QUEENSTOWN", "WALTER  LORD", "ICEBERG", 
    "RIVETS", "STEEL", "CROWS  NEST", "OCEAN  LINER", "PASSENGERS", "CREW", "RUDDER", "BRIDGE", "KNOTS", "VIOLET  JESSOP", 
    "MILLVINA  DEAN", "IDA  STRAUS", "A  NIGHT  TO  REMEMBER", "DECKS","FIRST  CLASS", "SECOND  CLASS", "THIRD  CLASS", 
    "SMOKESTACK", "MAST", "PROPELLOR", "HARLAND  AND  WOLFF", "HULL", "MOLLY  BROWN", "LIFEBOATS",
    "CHERBOURG", "TITANIC", "WHITE  STAR  LINE", "MARCONI", "CARPATHIA", "NORTH  ATLANTIC", "OLYMPIC", "BRITANNIC", "THOMAS  ANDREWS"],
	randomWord: "",
    termLetters:[],

	isMatch: null,
	isRepeat: null,

	remainingBoatGuesses: 21,
	wordsLost: 0,
	wordsWon:0,

	generateWord: function(){
		//Random number from 0-50 for the 50 terms in the termsArray
		var randomNum = Math.random() * 51;
		randomNum = Math.floor(randomNum);

		//randomWord is a randomly chosen word from the array and an array is created containing the individual letters of the randomly chosen words
		this.randomWord = this.termsArray[randomNum];
		this.termLetters = this.randomWord.split("");

		//Letters of random words scrambled and made into array 
		console.log(this.randomWord + " " + this.termLetters);

		//Guess arrays are reset with every win or loss
		this.allBoatGuesses = [];
		this.incorrectBoatGuesses = [];
		this.correctBoatGuesses = [];
		this.correctOrderedBoatGuesses = [];
		this.remainingBoatGuesses = 21;
	},

	checkRepeat: function(){
		var repeatCount = -1;

		//Looping the number of attempted BoatGuesses; if the current letter equals one from the allBoatGuesses array, the Count variable counts up one.
		for (var i=0; i < this.allBoatGuesses.length; i++){
			if (this.currentLetter == this.allBoatGuesses[i]){
				repeatCount++;
			}
		}
		//If no match is found, the Count is zero, and the isRepeat variable becomes false, but if a match was found, isRepeat becomes true.
		if (repeatCount == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},
	checkMatch: function(){
		var matchCount = 0;

		//Looping the number of terms; if the guessed letter equals the terms letter at a given index, the Count variable counts up one.
		for (var i=0; i < this.termLetters.length; i++){
			if (this.currentLetter == this.termLetters[i]){
				matchCount++;
			}
		}
		//If no match is found, Count is zero, and the isMatch variable becomes false, but if a match was found, isMatch becomes true.
		if (matchCount == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function(){
		//Remove keys from allBoatGuesses if pressed more than once
		if (this.isRepeat == true){
			this.allBoatGuesses.pop(this.currentLetter);
		}
		//If letter has not been guessed and was wrong, the currentLetter is placed in incorrectBoatGuesses.
		if (this.isRepeat == false && this.isMatch == false){
			this.incorrectBoatGuesses.push(this.currentLetter);
			this.remainingBoatGuesses--;
		}
		//If letter has not been guessed and was correct, the currentLetter is placed in correctBoatGuesses.
		if (this.isRepeat == false && this.isMatch == true){
			this.correctBoatGuesses.push(this.currentLetter);
			this.remainingBoatGuesses--;
		}
	},
	revealTerm: function(){
		//If there are no correctBoatGuesses, fill the displayed BoatGuesses with an underscore.
		if (this.correctBoatGuesses.length == 0){
			for (var i =0; i<this.termLetters.length; i++){
				this.correctOrderedBoatGuesses[i] = "_";
			}
		}
		else {
            //For the length of the terms name, if the displayed guess is not the same as termLetters at index i

			for (var i=0; i<this.termLetters.length; i++){
				if (this.correctOrderedBoatGuesses[i] != this.termLetters[i]){

					//Looping for correctBoatGuesses, if the correctBoatGuesses at t is equal to termLetters at i, the displayedGuess becomes the termletter at index i
					for (var t=0; t<this.correctBoatGuesses.length; t++){
						
						if (this.correctBoatGuesses[t] == this.termLetters[i]){
							this.correctOrderedBoatGuesses[i] = this.termLetters[i];
						}
						//Otherwise the displayedGuess at index i becomes an underscore.
						else {
							this.correctOrderedBoatGuesses[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctOrderedBoatGuesses.join(" ");
		document.getElementById("wins-losses").innerHTML = ("Wins: " + this.wordsWon + "  " + "Losses: " + this.wordsLost);
		document.getElementById("letters-guessed").innerHTML = this.incorrectBoatGuesses;
		document.getElementById("remaining-guesses").innerHTML = this.remainingBoatGuesses;
	},
	checkProgress: function(){
		var Count = 0;

		//Looping a number of times equal to the length of the term name; if a guess is equal to the term letter at the same index, Count variable counts up one.
		for (var i=0; i<this.termLetters.length; i++){
			if (this.correctOrderedBoatGuesses[i] == this.termLetters[i]){
				Count++;
			}
		}

		//The game is won if the Count is the same length as the term name.
		if (Count == this.termLetters.length){
			alert("You win");
			this.wordsWon++;
			this.generateWord();
		}
		//The game is lost if remainingBoatGuesses remains at zero.
		if (this.remainingBoatGuesses == 0){
			alert("You lost");
			this.wordsLost++;
			this.generateWord();
		}
	}
}