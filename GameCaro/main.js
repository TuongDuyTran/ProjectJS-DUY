var player1 = [];
var player2 = [];

const characterX = 'X';
const characterO = 'O';

var wrap = document.querySelector('.wrapper');
var items = Array.from(wrap.querySelectorAll('.item'));
var html = [];
var n = 3, m = 3;
var check = true;

function getValue() {
    var inputRowAndColumn = document.getElementById('input1');
    var condition = document.getElementById('input2');

    n = inputRowAndColumn.value;
    m = condition.value;

    addElement(n);
    wrap.innerHTML = html.join('');
    items = Array.from(wrap.querySelectorAll('.item'));
    html = [];
    player1 = [];
    player2 = [];
    check = true;
}

function addElement(n) {
    if (n > 0) {
        wrap.style['grid-template-columns'] = `repeat(${n}, 120px)`;
        wrap.style['grid-template-rows'] = `repeat(${n}, 120px)`;
        let length = n*n;
        let data = 1;
        while (length > 0) {
            html.push(`<div class="item" data-key="${data}"></div>`);
            data++;
            length--;
        }
    }
}

function consecutiveIntoRow(player, m) {
    let count = 1;
    for (let i = 0; i < player.length - 1; i++) {
        for (let j = i + 1; j < player.length; j++) {
            if (player[i] + 1 === player[j]) {
                count++;
                break;
            } else {
                count = 1;
                break;
            }
        }
        if (count === m) {
            return true;
        }
    }
    return false;
}

function convertToNum(player) {
    var temp = [];
    for (let i = 0; i < player.length; i++) {
        temp.push(parseInt(player[i]));
    }
    return temp;
}

function sortArr(player) {
    return player.sort((a,b) => a - b);
}

 function playerWin(personWinner, m) {
    if (consecutiveIntoRow(personWinner, m)) {
        return true;
    }
    return false;
}

function playerGame(){
    if (player1.length >= 3 || player2.length >= 3) {
        Finally();
    }
    let value = this.dataset.key;
    if (check === true) {
        //console.log('player1: ' + player1.indexOf(value), 'player2: ' + player2.indexOf(value));
        if (player2.indexOf(value) < 0) {
            if (player1.indexOf(value) < 0) {
                player1.push(value);
                this.innerText = characterX;
                check = false;
            }
        }
    } else if (player1.indexOf(value) < 0) {
        //console.log('player2: ' + player2.indexOf(value), 'player1: ' + player1.indexOf(value));
        if (player2.indexOf(value) < 0) {
            player2.push(value);
            this.innerText = characterO;
            check = true;
        }
    }
}

function Finally() {
    player1 = sortArr(player1);
    player2 = sortArr(player2);
    player1 = convertToNum(player1);
    player2 = convertToNum(player2);
    if (playerWin(player1, m)) {
        document.getElementById('notification').innerHTML = 'Player 1 Win !!!';
    } else if (playerWin(player2, m)) {
        document.getElementById('notification').innerHTML = 'Player 2 Win !!!';
    }
}

Finally();
items.forEach(item => item.addEventListener('click', playerGame));

