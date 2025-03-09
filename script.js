'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');
const winnerModal = document.querySelector('.modal');
const winnerModalBtn = document.querySelector('.btn--close');
const winnerModalOverlay = document.querySelector('.overlay');
const modalText = document.querySelector('.winner-text');
const playerNameModal = document.querySelector('.modal-name');
const playerNameBtn = document.querySelector('.btn--start');
const playerNameModalOverlay = document.querySelector('.overlay');

//Variables:
let scores, currentScore, activePlayer, playing;

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

//Player names:
const names = function () {
  let player0P = document.getElementById('player0-name').value.trim();
  player0Name.textContent = player0P;
  let player1P = document.getElementById('player1-name').value.trim();
  player1Name.textContent = player1P;
};

//Switching players logic:
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Winner modal:
const modalWinner = function () {
  if (activePlayer === 0) {
    modalText.textContent = `🎉${player0Name.textContent} IS WINNER !!!🎉`;
  } else {
    modalText.textContent = `🎉${player1Name.textContent} IS WINNER !!!🎉`;
  }
  winnerModal.classList.remove('hidden');
  winnerModalOverlay.classList.remove('hidden');
  winnerModalBtn.addEventListener('click', function () {
    winnerModal.classList.add('hidden');
    winnerModalOverlay.classList.add('hidden');
  });
};

//Rolling dice functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a rnd dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Setting player names and starting game:
playerNameBtn.addEventListener('click', function () {
  playerNameModal.classList.add('hidden');
  playerNameModalOverlay.classList.add('hidden');
  names();
});

//ROLL button logic:
buttonHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players score is 100
    //Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      modalWinner();
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//Starting new game:
buttonNew.addEventListener('click', init);
