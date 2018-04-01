# Memory Game Project

## Table of Contents
* [Info](#info)
* [The-Game](#the-game)
* [Resources](#resources)
* [Contributing](#contributing)

## Info
This project is part for the FEND(Front-end Nano Degree) Udacity scholarship, to test our html, css and js skills 

## The-Game
A classic game to sharpen the player focus and test your memory. 
- game timer is started uppon clicking a card.
- moves counter keeps track of the number paires you've tried to match and NOT card clicks
- cards are checked for matching id two by two in a separate array with `function check()` AND also checking that is not the same card if true `function match()` is triggered if not `function nomatch()` is triggered
  * in testing to disable the check for clicking the same card just remove `&& vs[0] !== vs[1]` from `function check()` 
- cards that match have they're event listeners removed and receive a *match class* that comes with a animation
  * every matched pair is counted when counter hits 8 the `function winner()` is triggered with a 200ms delay 


## Resources
- Shuffle function: http://stackoverflow.com/a/2450976
- Local Storage and more: http://wesbos.com/
- Modal: https://www.w3schools.com/


## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
