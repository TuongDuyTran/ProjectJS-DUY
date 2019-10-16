var player1 = [];
var player2 = [];

const characterX = 'X';
const characterO = 'O';

var wrap = document.querySelector('.wrapper');
var items = Array.from(wrap.querySelectorAll('.item'));
var button = document.querySelector('.styleButton');

var html = [];
var n = 3, m = 3;
var check = true;

var arrIntoRow = [];
var arrIntoColumn = [];

getRowAll(arrIntoRow, n);
getColumnAll(arrIntoColumn, n);

function resetAll() {
    reset();
    items.forEach(item => item.innerText = '');
}

function reset() {
    html = [];
    player1 = [];
    player2 = [];
    check = true;
}
function getRowAll(arrRow, n) {
    let arrTemp = [];
    let boiSo = 1;
    for (let i = 1; i <= n*n; i++) {
        arrTemp.push(i);
        if (i / n === boiSo) {
            boiSo++;
            arrRow.push(arrTemp);
            arrTemp = [];
        }
    }
}

function getColumnAll(arrColumn, n) {
    let arrTemp = [];
    for (let i = 1; i <= n; i++) {
        getColumn(arrTemp, i, n);
        arrColumn.push(arrTemp);
        arrTemp = [];
    }
}

function getColumn(arr, i, n) {
    let checkStop = 1;
    while (checkStop <= n) {
        arr.push(i)
        i += n;
        checkStop++;
    }
}

function changeValueCondition() {
    if (m > n) {
        m = 3;
        alert('Điều kiện thắng không lớn hơn hàng hoặc cột, về mặc định bằng 3');
        document.getElementById('input2').value = m;
    }
}

function getValue() {
    reset();
    document.getElementById('notification').innerHTML = '';

    var inputRowAndColumn = document.getElementById('input1');
    var condition = document.getElementById('input2');

    n = parseInt(inputRowAndColumn.value);
    m = parseInt(condition.value);
    changeValueCondition(m,n);
    addElement(n);
    wrap.innerHTML = html.join('');
    items = Array.from(wrap.querySelectorAll('.item'));
    items.forEach(item => item.addEventListener('click', playerGame));
}

function addElement(n) {
    if (n > 0) {
        wrap.style['grid-template-columns'] = `repeat(${n}, 120px)`;
        wrap.style['grid-template-rows'] = `repeat(${n}, 120px)`;
        let length = n*n;
        let data = 1;
        arrIntoRow = [];
        arrIntoColumn = [];
        getRowAll(arrIntoRow, n);
        getColumnAll(arrIntoColumn, n);
        while (length > 0) {
            html.push(`<div class="item" data-key="${data}"></div>`);
            data++;
            length--;
        }
    }
}

function checkIntoRow(arrIntoRow, temp) {
    for (let element in arrIntoRow) {
        let check = 0;
        for (let i = 0; i < arrIntoRow[element].length; i++) {
            if (temp.indexOf(arrIntoRow[element][i]) >= 0) {
            check++;
            }
        }
        if (check === m) {
            return true;
        }
    }
    return false;
}

function consecutiveIntoRow(player, m) {
    let count = 1;
    let temp = [];
    for (let i = 0; i < player.length - 1; i++) {
        for (let j = i + 1; j < player.length; j++) {
            if (player[i] + 1 === player[j]) {
                temp.push(player[i]);
                count++;
                if (count === m)
                    temp.push(player[j]);
                break;
            } else {
                count = 1;
                break;
            }
        }
        if (count === m) {
            if (checkIntoRow(arrIntoRow, temp)) 
                return true;
        }
    }
    return false;
}

function checkIntoColumn(arrIntoColumn, temp) {
    for (let element in arrIntoColumn) {
        let check = 0;
        for (let i = 0; i < arrIntoColumn[element].length; i++) {
            if (temp.indexOf(arrIntoColumn[element][i]) >= 0) {
            check++;
            }
        }
        if (check === m) {
            return true;
        }
    }
    return false;
}

function consecutiveIntoColumn(player, m) {
    let count = 1;
    let temp = [];
    for (let i = 0; i < player.length - 1; i++) {
        for (let j = i + 1; j < player.length; j++) {
            if (player[i] + n === player[j]) {
                temp.push(player[i]);
                count++;
                if (count === m)
                    temp.push(player[j]);
                break;
            } else {
                count = 1;
                break;
            }
        }
        if (count === m) {
            if (checkIntoColumn(arrIntoColumn, temp))
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

 function playerWin(player, m) {
    player = convertToNum(player);
    let personWinner = sortArr(player);
    if (consecutiveIntoRow(personWinner, m)) {
        return true;
    }
    if (consecutiveIntoColumn(personWinner, m)) {
        return true;
    }
    return false;
}

function playerGame(){
    let value = this.dataset.key;
    if (check === true) {
        if (player2.indexOf(value) < 0) {
            if (player1.indexOf(value) < 0) {
                player1.push(value);
                this.innerText = characterX;
                check = false;
            }
        }
    } else if (player1.indexOf(value) < 0) {
        if (player2.indexOf(value) < 0) {
            player2.push(value);
            this.innerText = characterO;
            check = true;
        }
    }

    if (player1.length >= 3) {
        Finally();
    }
}

function Finally() {
    if (playerWin(player1, m)) {
        document.getElementById('notification').innerHTML = 'Player 1 Win !!!';
    } else if (playerWin(player2, m)) {
        document.getElementById('notification').innerHTML = 'Player 2 Win !!!';
    }
}

Finally();
items.forEach(item => item.addEventListener('click', playerGame));


