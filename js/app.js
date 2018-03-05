/*
 * Create a list that holds all of your cards
 */
// Spread HTMLCollection into an array
let cards = [...document.getElementsByClassName('card')];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function gameInit() {
// Constant that holds all cards aka board
const board = document.querySelector('.deck');

// Variable for shuffled cards
let mixCards = shuffle(cards);

// Append each mixed card to the board
// Set up the event listener for a card. If a card is clicked:
// - display the card's symbol
//
// Advanced version using map, recomended to use the 'for loop' instead by mentor
// mixCards.map(element => {
// return board.append(element);
// });
//
for (let i = 0; i < mixCards.length; i++) {
	board.append(mixCards[i]);
	cards[i].addEventListener('click', reveal);
	cards[i].addEventListener('click', check);
	};
}

// Global Variable holding opened cards
let vs = [];

// Cards checker that holds a maximum of 2 cards
function check() {
	// Push card into opened cards
	vs.push(this);
	// While opened cards length is 2 check:
	let len = vs.length;
	if (len == 2){
		// While cards have same id call match function
		if (vs[0].id === vs[1].id){
			match();
			// If not call noMatch function
		} else {
			noMatch();
		}
console.log(vs)
	}
}

// Opened cards match function add's match class, call reset match function with timer to allow card view for x ammount of ms
function match() {
	vs[0].classList.add('match');
	vs[1].classList.add('match');
  resetMatch();
}

// Opened cards noMatch function add's wrong class so you can view them (otherwise second card will not flip, it will for 1ms), call reset match function with timer to allow card view for x ammount of ms
function noMatch() {
	vs[0].classList.add('wrong');
	vs[1].classList.add('wrong');
	setTimeout(resetMatch, 450);
}

// Remove classes from the 2 cards and empty the 'vs' array
function resetMatch() {
	vs[0].classList.remove('open', 'show', 'wrong');
	vs[1].classList.remove('open', 'show', 'wrong');
	vs = [];
}

// Display symbol (Add or remove classes to card)
function reveal() {
	this.classList.toggle('open');
	this.classList.toggle('show');
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

document.addEventListener('DOMContentLoaded', gameInit());


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
