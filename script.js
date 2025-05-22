'use strict';

const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//console.log(newBtn, rollBtn, holdBtn);

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//console.log(player0,player1);

const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');

//console.log(player0Score,player1Score);

const player0CurrentScore = document.getElementById('current--0');
const player1CurrentScore = document.getElementById('current--1');

//console.log(player0CurrentScore, player1CurrentScore);

const diceObj = document.querySelector('.dice');
let activePlayer, currentScore, gameEnd;
//Initial values
const init = function () {
player0Score.textContent = 0;
player1Score.textContent = 0;
player0CurrentScore.textContent = 0;
player1CurrentScore.textContent = 0;
activePlayer = 0
currentScore = 0
gameEnd = 0;
}
init();
//Step1: User rolles dice
rollBtn.addEventListener('click', function () {
    if (!gameEnd) {
    const dice = Math.trunc(Math.random()*6)+1;
    //console.log(dice);
    diceObj.src = `dice-${dice}.png`;
    diceObj.classList.remove('hidden');
    
    currentScore += dice;
    activePlayer === 0?player0CurrentScore.textContent = currentScore:player1CurrentScore.textContent = currentScore;
    if (dice === 1) {
        activePlayer === 0? player0CurrentScore.textContent = 0:player1CurrentScore.textContent = 0;

        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
        //console.log(player0.classList,player1.classList)
        activePlayer = activePlayer === 1 ? 0:1;
        
        currentScore = 0;
    }
    }
});

// User holdes score
holdBtn.addEventListener('click', function () {
    if (!gameEnd) {
    //add current score to the total score
    let p0score = Number (player0Score.textContent);
    let p1score = Number (player1Score.textContent);
    activePlayer === 0?p0score += Number (currentScore):p1score += Number (currentScore);
    player0Score.textContent = p0score;
    player1Score.textContent = p1score;

    // if score >= 100 declare winner else change player
    let activePlayerScore = activePlayer === 0?p0score:p1score;
    if (activePlayerScore >= 100) {
        //declare winner
        activePlayer === 0?player0.classList.add('player--winner'):player1.classList.add('player--winner');
        diceObj.classList.add('hidden');
        gameEnd = 1;

    } else {
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
        //console.log(player0.classList,player1.classList)
        activePlayer = activePlayer === 1 ? 0:1;
        
        currentScore = 0;
    }
    //console.log(activePlayerScore);
    }
});

newBtn.addEventListener('click', function () {
    init();
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');

});