'use strict';
//selecting elements
//initializing the score to 0 for both the players
const score0EL = document.querySelector('#score--0');
//we can also use getElementById where the id is specified without the # symbol
const score1EL = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--1');
const player0 = document.querySelector('.player--0');
let currentScore1 = document.getElementById('current--1');
let currentScore0 = document.getElementById('current--0');
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; //this is the total score that gets accumulated when the player holds
  currentScore = 0;
  activePlayer = 0;
  playing = true; //to capture the state of the game
  //starting conditions
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  console.log(score0EL);
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden'); //hiding the dice image during the start of the game

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//Rolling Dice func

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate Random nmbr
    const randomNumber = Math.trunc(Math.random() * 6 + 1);

    //2.Display the number
    diceEl.classList.remove('hidden');
    // console.log(randomNumber);
    diceEl.src = `dice-${randomNumber}.png`;

    //3. If 1 switch user
    if (randomNumber !== 1) {
      //add dice to the current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //add score to the active player
    } else {
      switchUser();
    }
  }
});

//Hold button functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add the current score to the global score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if the players score is >=100
    if (scores[activePlayer] >= 10) {
      //finish the game
      diceEl.classList.add('hidden');

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else switchUser();
  }
});

btnNew.addEventListener('click', init);

function switchUser() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore; //add score to the active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //switching the background of the current player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}
