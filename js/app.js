/*
 * Create a list that holds all of your cards
 */
// Selector for individual card
let card = document.getElementsByClassName('card');

// Spread HTMLCollection into an array
let cards = [...card];

// Selector for moves
let displayMoves = document.querySelector('span');

// Selector for restart button
let restartGame = document.querySelector('.fa-repeat');

// Selector for timer
let timerDisplay = document.querySelector('.timer-display');

// Spread star elements into an array
const starsRating = [...document.getElementsByClassName('fa-star')];

// Variable that stores number of moves
let moves = 0;

// Variable holding opened cards
let vs = [];

// Variable holding matched pairs
let pairs = 0;

// Variable for counter
let countup;

// Variable that holds all cards aka board
const board = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function gameInit() {

// Reset moves counter on page
displayMoves.innerHTML = 0;

// Reset moves counter in the counter(got that ?)
moves = 0;

// Reset matched pairs counter
pairs = 0;

// Empty opened cards array
vs = [];

// Stop counter
clearInterval(countup);

// Reset on page counter
timerDisplay.textContent = 'Timer 0:00';
document.title = 'Matching Game';

// Reset star rating to default icons
starsRating.forEach( function(element) {
	element.classList.remove('minus');
});

// Variable for shuffled cards
let mixCards = shuffle(cards);

// Append each mixed card to the board
// Set up the event listener for a card. If a card is clicked:
// - display the card's symbol
// - start the timer (is removed after timer starts)
for (let i = 0; i < mixCards.length; i++) {
	board.append(mixCards[i]);
	cards[i].classList.remove('open', 'show', 'wrong', 'match')
	cards[i].addEventListener('click', reveal);
	cards[i].addEventListener('click', check);
	cards[i].addEventListener('click', startTimer);
	};
}


// Timer
//----------
// Game session counter
function timer(seconds) {
	// Initial time
	const beginning = Date.now();
	// Starting time
	displayTimePassed(0);

	countup = setInterval(() => {
		const secondsPassed = Math.round((Date.now() - beginning ) / 1000);
		if (secondsPassed > 500) {
			clearInterval(countup);
			return;
		}
		displayTimePassed(secondsPassed);
	},1000);
}

// Display session counter
function displayTimePassed(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `Timer ${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	document.title = display.slice(5);
	timerDisplay.textContent = display;
}

// Start counter and remove event listeners from all other cards
function startTimer() {
	timer();
	cards.forEach(card => card.removeEventListener('click', startTimer))
}


// Cards checker that holds a maximum of 2 cards
function check() {
	// Push card into opened cards
	vs.push(this);
	// While opened cards length is 2 check:
	let len = vs.length;
	if (len == 2) {
		// While cards have same id and are different cards call match function
		if (vs[0].id === vs[1].id && vs[0] !== vs[1]) {
			match();
			// If not call noMatch function
		} else {
			board.classList.add('kill-click');
			noMatch();
		}
console.log(vs)
	}
}

// Opened cards match function add's 'match' class and add's them to matched pairs, if matched pairs is 8 call's winner function with a delay of 200ms, if matched pairs is smaller then 8 calls moves counter and reset checker
function match() {
	pairs++;
	if (pairs === 8) {
		vs[0].classList.add('match');
		vs[1].classList.add('match');
		clearInterval(countup);
		setTimeout(winner, 200);
		board.classList.remove('kill-click');
	} else {
		vs[0].classList.add('match');
		vs[1].classList.add('match');
		vs[0].removeEventListener('click', check);
		vs[1].removeEventListener('click', check);
		vs[0].removeEventListener('click', reveal);
		vs[1].removeEventListener('click', reveal);
		countMoves();
		resetCheck();
	};
}

// Opened cards noMatch function add's 'wrong' class so you can view them (otherwise second card will not flip, it will for 1ms), call reset match function with timer to allow card view for x ammount of ms, and the moves counter
function noMatch() {
	vs[0].classList.add('wrong');
	vs[1].classList.add('wrong');
	countMoves();
	setTimeout(resetCheck, 300);
}

// Remove classes from the 2 cards and empty the 'vs' array
function resetCheck() {
	vs[0].classList.remove('open', 'show', 'wrong');
	vs[1].classList.remove('open', 'show', 'wrong');
	vs = [];
	board.classList.remove('kill-click');
}

// Display symbol (Add or remove classes to card)
function reveal() {
	this.classList.toggle('open');
	this.classList.toggle('show');
}

// Moves counter that updates the score panel and calls the star rating function
function countMoves() {
	moves++;
	displayMoves.innerHTML = moves;
	stars();
}

// Rates the current player according to the number of moves made
function stars() {
	switch (moves) {
		case 16:
		starsRating[0].classList.add('minus');
			break;
		case 18:
		starsRating[1].classList.add('minus');
			break;
		case 22:
		starsRating[2].classList.add('minus');
			break;
	};
}

// Display a modal for completing the game
//---------------------------
function winner() {
	const rating = `${
		moves < 16 ? "<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>" :
		moves < 18 ? "<i class='fa fa-star'></i><i class='fa fa-star'></i>" :
		moves < 22 ? "<i class='fa fa-star'></i>" : "...Not Rated"}`;
	modal.style.display = 'block';
	winnerText.innerHTML = `
	<div>
		<h1>You Win !!!</h1>
		<form class='add-highscore'>
			<input type='text' name='item' maxlength='14' placeholder='Enter Your Name' required>
			<br>
			<input type='submit' value='Submit'>
		</form>
		<p>Moves used: ${moves} <br>
		Time: ${timerDisplay.innerHTML.slice(5)}<br>
		Rating: ${rating}</p>
	</div>
	<div>
		<h2 class='header-score-reset'>Highscores<span class='score-reset'><i class='fa fa-database'></i> Erase Highscores</span></h2>
		<ul class='highscore'>
		<li>Loading...</li>
		</ul>
	</div>
	`;

// Scoreboard functionality
//----------------
//Selectors for the modal fields
const addHighscore = document.querySelector('.add-highscore');
const highscoreList = document.querySelector('.highscore');
const scoreReset = document.querySelector('.score-reset');

//Call local storage for data or initiate an empty object
const getHighscores = JSON.parse(localStorage.getItem('getHighscores')) || [];

//Delete local storage data and update highscore display
scoreReset.onclick = function() {
	getHighscores.splice(0, getHighscores.length);
	localStorage.setItem('getHighscores', JSON.stringify(getHighscores));
	populateList(getHighscores, highscoreList);
	highscoreList.innerHTML = `
		<li>
			<label>No data recorded</label>
		</li>
	`;
}

//Save score to local storage
function addScore(x) {
	x.preventDefault();
	//Variables for data saved
	const storedName = (this.querySelector('[name=item]')).value.toUpperCase();
	const storedTime = timerDisplay.innerHTML.slice(5);
	const storedRating = rating;

	const item = {
		storedName,
		storedTime,
		storedRating
	};

	//Push data to local storage
	getHighscores.push(item);

	//Remove elements from array only keeping the last 8 highscores recorded
	getHighscores.splice(0, getHighscores.length - 8);

	//Retrieve data from local storage and append to highscore
	localStorage.setItem('getHighscores', JSON.stringify(getHighscores));
	populateList(getHighscores, highscoreList);
}

//Map an empty aray with the values stored in the localstorage an join them
function populateList(highscore = [], highscorePrint) {
			highscorePrint.innerHTML = highscore.map((highscore, i) =>{
				return `
					<li>
						<label for='item${i}'>${highscore.storedName.toUpperCase()} | Time ${highscore.storedTime} | Rating ${highscore.storedRating}</label>
					</li>
				`}).join('');}

//Event listener for submit name input
addHighscore.addEventListener('submit', addScore);

//Retrieve data from local storage and append to highscore
populateList(getHighscores, highscoreList);

//Remove form after submit
const form = document.querySelector('form');
form.addEventListener('submit', function() {
	addScore;
	this.remove();
}, false);
}


// Modal system
//----------------
// Variables for modal and modal buttons
let modal = document.getElementById('endGame');
let close = document.getElementsByClassName('modal-buttons')[0];
let reset = document.getElementsByClassName('modal-buttons')[1];
let winnerText = document.getElementsByClassName('winner-text')[0];

// Close button hides display by removing class
close.onclick = function() {
	modal.style.display = 'none';
}

// Reset button hides display by removing class and call's game restart function
reset.onclick = function() {
	modal.style.display = 'none';
	gameInit();
}

// Clicking on the modal hides display by removing class
window.onclick = function(click) {
	if (click.target == modal) {
		modal.style.display = 'none';
		gameInit();
	};
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
		}

		return array;
}

// After content is loaded game reset function is called
document.addEventListener('DOMContentLoaded', gameInit());

// Reset button
restartGame.onclick = gameInit;







/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
