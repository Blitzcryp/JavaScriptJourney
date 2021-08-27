'use strict';

const roll = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

let currentPlayer = 0;

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const gameReset = function () {
  const scores = document.querySelectorAll('.score');
  const currents = document.querySelectorAll('.current-score');

  for (let i = 0; i < currents.length; i++) {
    currents[i].innerHTML = "0";
  }

  for (let i = 0; i < scores.length; i++) {
    scores[i].innerHTML = "0";
  }
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

roll.addEventListener('click', function () {
  const playerRoll = document.querySelector("#current--" + currentPlayer);

  let randomValue = Math.floor(Math.random() * 6) + 1;

  document.querySelector('.dice').src = "dice-" + randomValue + ".png";
  const value = Number(playerRoll.innerHTML);
  playerRoll.innerHTML = value + randomValue;

  if (randomValue === 1) {
    playerRoll.innerHTML = "0";
    currentPlayer = Math.abs(currentPlayer - 1);
  }
});

hold.addEventListener('click', function () {
  const playerRoll = document.querySelector("#current--" + currentPlayer);
  const playerScore = document.querySelector("#score--" + currentPlayer);

  playerScore.innerHTML = Number(playerScore.innerHTML) + Number(playerRoll.innerHTML);

  if (Number(playerScore.innerHTML) >= 100) {
    currentPlayer += 1;
    document.querySelector('.player-won').innerHTML = "🎲Player " + currentPlayer + " has won!🎲";
    gameReset();
    openModal();
  }

  playerRoll.innerHTML = "0";
  currentPlayer = Math.abs(currentPlayer - 1);
})

newGame.addEventListener('click', gameReset);