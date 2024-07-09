// For testing purposes  
//var wordSet = ["dog", "harmu", "crocodile", "joj"]

let word = '';
let lettersGuessed = [];
let displayedWord = null;
let wrongGuessLimit = 7;
let wrongGuessCount = 0;
var gamesWon = 0;
var gamesLost = 0;
var gamesPlayed = 0;
var gamesWonInARow = 0;
var fastestTime = null;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function loadWord(){
	
	var http = new XMLHttpRequest();
	http.open("GET", "http://192.168.33.10:5000/api/randoword")
	http.send()

	http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText);
      word = this.responseText;
      word = word.slice(1, -1);
      word = word.slice(0, -1);
      updateDisplay();
    }
  };

}

function makeAlphabetInputs() {
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
		`
			<button
				class = "btn btn-lg btn-primary m-2"
				id = '` + letter + `'
				onClick = "updateFromGuess('` + letter + `')"
			>
			` + letter + `
			</button>
		`

	).join('');
	document.getElementById('alphabet').innerHTML = buttonsHTML;
}

function updateFromGuess(guessLetter) {
	lettersGuessed.indexOf(guessLetter) == -1 ? lettersGuessed.push(guessLetter) : null;
	document.getElementById(guessLetter).setAttribute('disabled', true);

	if (word.indexOf(guessLetter) >= 0) {
		updateDisplay()
		checkIfFullyGuessed();
	}
	else if (word.indexOf(guessLetter) === -1) {
		wrongGuessCount++;
		updateWrongGuessCount();
		checkIfGuessLimit();
		updateHangmanPicture();
	}
}


function updateDisplay(){
	displayedWord = word.split('').map(letter => (lettersGuessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
	document.getElementById('wordDisplay').innerHTML = displayedWord;
}

function updateWrongGuessCount() {
	document.getElementById('wrongGuessCount').innerHTML = wrongGuessCount;
}

function updateHangmanPicture() {
	document.getElementById('hangmanImg').src = './images/' + (wrongGuessCount+1) +'.jpg';
}

function checkIfFullyGuessed(){
	if (displayedWord === word) {
		document.getElementById('alphabet').innerHTML = 'Congragulations you guessed correctly!!!';
	}
}

function checkIfGuessLimit(){
	if (wrongGuessCount === wrongGuessLimit) {
		document.getElementById('wordDisplay').innerHTML = 'The word was: ' + word;
		document.getElementById('alphabet').innerHTML = 'You Lose better luck next time!!!';
	}
}

function restart() {
	wrongGuessCount = 0;
	updateWrongGuessCount();
	lettersGuessed = [];
	displayedWord = null;
	loadWord();
	document.getElementById('hangmanImg').src = "images/1.jpg";
	makeAlphabetInputs();
	totalSeconds = -1;

}

document.getElementById('wrongGuessLimit').innerHTML = wrongGuessLimit;
loadWord();
makeAlphabetInputs();

