# Memory Game Project

## Table of Contents
* [Info](#info)
* [How To Play](#how-to-play)
* [The Game Logic](#the-game-logic)
* [Resources](#resources)
* [Contributing](#contributing)


## Live Demo
[You can try your skills or have peek here](https://gabrielcmoraru.github.io/memory-game/ "Concentration")



## Info
This project is part of the FEND(Front-end Nano Degree) Udacity scholarship, to show our JavaScript and Css Knowledge



## How-To-Play
A classic game to sharpen the player focus and test your memory. 
The goal of the game is to match every card with it's hidden twin using as few moves possible and as fast you can.


## The-Game-Logic
- game timer is started uppon clicking a card and `function reveal()` is called
- moves counter(`function countMoves()`) keeps track of the number of paires you've tried to match and NOT card clicks and is called in `function match()`
- cards are checked for matching id two by two in a separate array with `function check()` AND also checking that is not the same card if true `function match()` is triggered if false `function nomatch()` is triggered
  * in testing to disable the check for clicking the same card just remove `&& vs[0] !== vs[1]` from `function check()` 
- cards that match have they're event listeners removed and receive a *match* class
  * every matched pair is counted when counter hits 8 the `function winner()` is triggered with a 200ms delay
- cards that DON'T match receive the *wrong* class
- every time 2 cards are "matched" or "not matched" a `function resetCheck()` is triggered, EXCEPT when matched pairs is 8 and there is no need for a reset
- stars(`function stars()`) on the board change upon reaching a certain number of moves and update every star with a *minus* class
- when calling `function winner()` the modal display changes from *none* to *block* and the end game information is generated
  * generates the data for the current match
  * add curent highscore to local storage `function addScore()`
  * loads saved highscores from local storage `function populateList()`
  * erases the data saved on local storage `scoreReset.onclick`


## Resources
- Shuffle function: http://stackoverflow.com/a/2450976



## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
