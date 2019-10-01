/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If player rolls two 6's, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, isActive;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isActive){
        // Random Number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        // Display Result
        var diceOneDOM = document.getElementById('dice-0');
        var diceTwoDOM = document.getElementById('dice-1');
        diceOneDOM.style.display = 'block';
        diceOneDOM.src = 'dice-' + diceOne + '.png';
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';
        // Update Round Score   
        if(diceOne === 6 && diceTwo === 6)
                changePlayer();
        else if(diceOne !== 1 && diceTwo !== 1){
            roundScore+= diceOne + diceTwo;
            document.getElementById('current-' + activePlayer).textContent = roundScore;            
        } else 
            // Update UI
            changePlayer();
         
    }   
});

function changePlayer () {
    roundScore = 0;
    
    document.getElementById('current-' + activePlayer).textContent = 0;    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); 
}

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(isActive){
        // Update Global Score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won
        var finalScore = document.querySelector('.final-score').value;
        if(!finalScore) finalScore = 100;
        if(scores[activePlayer] >= finalScore){
            isActive = false;
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
        }
        else
            // Update UI
            changePlayer();
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function init (){
    // Initialize the game variables + UI
    scores = [0 , 0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    isActive = true;    
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}




