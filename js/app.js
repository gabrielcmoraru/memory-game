/*
 * Create a list that holds all of your cards
 */
// Spread HTMLCollection into an array
let cards = [...document.getElementsByClassName('card')];

// Selector for moves
let displayMoves = document.querySelector('span');

// Selector for restart button
let restartGame = document.querySelector('.fa-repeat');

// Spread star elements into an array
const starsRating = [...document.getElementsByClassName('fa-star')];

// Variable that stores number of moves
let moves = 0;

// Variable holding opened cards
let vs = [];

// Variable holding matched pairs
let pairs = 0;

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

// Reset star rating to default icons
starsRating.forEach( function(element) {
	element.classList.remove('fa-question-circle', 'fa-exclamation', 'minus');
	element.classList.add('fa-star')
});

// Variable that holds all cards aka board
const board = document.querySelector('.deck');

// Variable for shuffled cards
let mixCards = shuffle(cards);

// Append each mixed card to the board
// Set up the event listener for a card. If a card is clicked:
// - display the card's symbol
for (let i = 0; i < mixCards.length; i++) {
	board.append(mixCards[i]);
	cards[i].classList.remove('open', 'show', 'wrong', 'match')
	cards[i].addEventListener('click', reveal);
	cards[i].addEventListener('click', check);
	};
}

// Cards checker that holds a maximum of 2 cards
function check() {
	// Push card into opened cards
	vs.push(this);
	// While opened cards length is 2 check:
	let len = vs.length;
	if (len === 2) {
		// While cards have same id call match function
		if (vs[0].id === vs[1].id) {
			match();
			// If not call noMatch function
		} else {
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
		setTimeout(winner, 200);
	} else {
		vs[0].classList.add('match');
		vs[1].classList.add('match');
		countMoves();
		resetCheck();
	};
}


// Display the modal
function winner() {
 modal.style.display = 'block';
}

// Opened cards noMatch function add's 'wrong' class so you can view them (otherwise second card will not flip, it will for 1ms), call reset match function with timer to allow card view for x ammount of ms, and the moves counter
function noMatch() {
	vs[0].classList.add('wrong');
	vs[1].classList.add('wrong');
	countMoves();
	setTimeout(resetCheck, 450);
}

// Remove classes from the 2 cards and empty the 'vs' array
function resetCheck() {
	vs[0].classList.remove('open', 'show', 'wrong');
	vs[1].classList.remove('open', 'show', 'wrong');
	vs = [];
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

// Rates the current player according to the number of moves made, replacing stars with circles and different colours for different scoring systems
function stars() {
	switch (moves) {
		case 9:
		starsRating[0].classList.remove('fa-star');
		starsRating[0].classList.add('fa-question-circle', 'minus');
			break;
		case 13:
		starsRating[1].classList.remove('fa-star');
		starsRating[1].classList.add('fa-question-circle', 'minus');
			break;
		case 18:
		starsRating[2].classList.remove('fa-star');
		starsRating[2].classList.add('fa-question-circle', 'minus');
			break;
		case 22:
		starsRating[0].classList.remove('fa-question-circle');
		starsRating[0].classList.add('fa-exclamation');
			break;
		case 25:
		starsRating[1].classList.remove('fa-question-circle');
		starsRating[1].classList.add('fa-exclamation');
			break;
		case 28:
		starsRating[2].classList.remove('fa-question-circle');
		starsRating[2].classList.add('fa-exclamation');
			break;
	};
}


// Modal system
//----------------
// Variables for modal and modal buttons
let modal = document.getElementById('endGame');
let close = document.getElementsByClassName('modal-buttons')[0];
let reset = document.getElementsByClassName('modal-buttons')[1];

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
