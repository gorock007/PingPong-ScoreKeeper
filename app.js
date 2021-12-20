
const p1 ={
    score:0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    name: document.querySelector('#inputName1')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    name: document.querySelector('#inputName2')
}

const name1Button = document.querySelector('#name1');
const name2Button = document.querySelector('#name2');

name1Button.addEventListener('click', function(e){
    p1.button.textContent = p1.name.value;
})

name2Button.addEventListener('click', function(e){
    p2.button.textContent = p2.name.value;
})

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let winningScore = 5;
let isGameOver = false;
let numMatches = 0;

function updateScore(player, opponent){
    if(!isGameOver){    
        player.score +=1;
        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            // opponent2.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            // opponent2.button.disabled = true;

            //Table textContent
            numMatches +=1;
            const table = document.querySelector('#table');
            const tbRow = document.createElement('tr');
            const matchNumData = document.createElement('td');
            const winnerData = document.createElement('td');
            const scoreData = document.createElement('td');
            table.append(tbRow);
            tbRow.append(matchNumData,winnerData,scoreData);
            matchNumData.append(numMatches);
            if(p1.name.value==='' && p2.name.value ===''){
                if(p1.score === winningScore){
                    winnerData.append("Name1");

                }else{
                    window.append("Name2");
                }
            }else{
                winnerData.append(player.name.value);
            }
            if(p1.score===winningScore){
                scoreData.append(`${player.score} - ${opponent.score}`);
            }else{
                scoreData.append(`${opponent.score} - ${player.score}`);
            }
            if(player.score===opponent.score && player.score==winningScore-1){
                winningScore++;
            }
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function(){
    updateScore(p1,p2)
})

p2.button.addEventListener('click', function(){
   updateScore(p2,p1)
})

winningScoreSelect.addEventListener('change', function(){
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click',reset);

function reset(){
    isGameOver = false;
    for(let p of [p1,p2]){
        p.score =0;
        p.display.textContent =0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

