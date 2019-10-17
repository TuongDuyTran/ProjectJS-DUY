var player1 = [];
var player2 = [];

const characterX = 'X';
const characterO = 'O';

var isWin = false;
var wrap = document.querySelector('.wrapper');
var items = Array.from(wrap.querySelectorAll('.item'));
var button = document.querySelector('.styleButton');

var html = [];
var n = 3, m = 3;
var check = true;

var arrIntoRow = [];
var arrIntoColumn = [];
var arrIntoDiagonalRight = [];
var arrIntoDiagonalLeft = [];

getRowAll(arrIntoRow, n);
getColumnAll(arrIntoColumn, n);
getDiagonalRightAll(arrIntoDiagonalRight, m);
getDiagonalLeftAll(arrIntoDiagonalLeft, m);

function resetAll() {
    html = [];
    player1 = [];
    player2 = [];
    check = true;
    isWin = false;
    items.forEach(item => item.innerHTML = '');
    document.getElementById('notification').innerHTML = '';
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

function changeValueCondition(conditionWin, number) {
    let valueDefault = 3;
    if (conditionWin > number) {
        alert('Điều kiện thắng không lớn hơn hàng hoặc cột, về mặc định bằng 3');
        document.getElementById('input2').value = valueDefault;
        m = valueDefault;
    } else if (conditionWin < 3 || isNaN(conditionWin) === true) {
        alert('Điều kiện thắng không để trống hoặc nhỏ hơn 2, về mặc định bằng 3');
        document.getElementById('input2').value = valueDefault;
        m = valueDefault;
    } else {
        m = conditionWin;
    }
}

function getValue() {
    resetAll();
    document.getElementById('notification').innerHTML = '';

    var inputRowAndColumn = document.getElementById('input1');
    var condition = document.getElementById('input2');

    let number = parseInt(inputRowAndColumn.value);
    let conditionWin = parseInt(condition.value);
    changeValueCondition(conditionWin, number);
    n = number;
    addElement(n);
    wrap.innerHTML = html.join('');
    items = Array.from(wrap.querySelectorAll('.item'));

    if (isWin === false) {
        items.forEach(item => item.addEventListener('click', playerGame));
    }
}

function addElement(n) {
    if (n > 0) {
        wrap.style['grid-template-columns'] = `repeat(${n}, 120px)`;
        wrap.style['grid-template-rows'] = `repeat(${n}, 120px)`;
        let length = n*n;
        let data = 1;
        arrIntoRow = [];
        arrIntoColumn = [];
        arrIntoDiagonalRight = [];
        arrIntoDiagonalLeft = [];
        getRowAll(arrIntoRow, n);
        getColumnAll(arrIntoColumn, n);
        getDiagonalRightAll(arrIntoDiagonalRight, m);
        getDiagonalLeftAll(arrIntoDiagonalLeft, m);
        while (length > 0) {
            html.push(`<div class="item" data-key="${data}"></div>`);
            data++;
            length--;
        }
    }
}

function checkArrayIndex(arr, temp) {
    for (let element in arr) {
        let check = 0;
        for (let i = 0; i < arr[element].length; i++) {
            if (temp.indexOf(arr[element][i]) >= 0) {
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
    // let count = 1;
    // let temp = [];
    // for (let i = 0; i < player.length - 1; i++) {
    //     for (let j = i + 1; j < player.length; j++) {
    //         if (player[i] + 1 === player[j]) {
    //             temp.push(player[i]);
    //             count++;
    //             if (count === m)
    //                 temp.push(player[j]);
    //             break;
    //         } else {
    //             count = 1;
    //             break;
    //         }
    //     }
    //     if (count === m) {
    //         if (checkArrayIndex(arrIntoRow, temp)) 
    //             return true;
    //     }
    // }
    // return false;
    if (checkArrayIndex(arrIntoRow, player)) {
        return true;
    } else {
        return false;
    }
}

function consecutiveIntoColumn(player, m) {
    // let count = 1;
    // let temp = [];
    // for (let i = 0; i < player.length - 1; i++) {
    //     for (let j = i + 1; j < player.length; j++) {
    //         if (player[i] + n === player[j]) {
    //             temp.push(player[i]);
    //             count++;
    //             if (count === m)
    //                 temp.push(player[j]);
    //             break;
    //         } else {
    //             count = 1;
    //             break;
    //         }
    //     }
    //     if (count === m) {
    //         if (checkArrayIndex(arrIntoColumn, temp))
    //             return true;
    //     }
    // }
    // return false;
    if (checkArrayIndex(arrIntoColumn, player)) {
        return true;
    } else {
        return false;
    }
}

function getArrayDiagonalRight(arrTemp , i, stop) {
    let countStop = stop;
    let j = i;
    while (countStop <= n) {
        arrTemp.push(j);
        j += n + 1;
        countStop++;
    }
    return arrTemp;
}

function getDiagonalRightAll(arrIntoDiagonalRight, m) {
    let length = n - m + 1; // 3
    let stop = length;
    let row = n;
    arrIntoDiagonalRight.push(getArrayDiagonalRight([], 1, 1));
    while (length > 1) {
        arrIntoDiagonalRight.push(getArrayDiagonalRight([], length, stop));
        arrIntoDiagonalRight.push(getArrayDiagonalRight([], row*(length - 1) + 1, stop));
        length--;
        stop--;
    }
}

function getArrayDiagonalLeft(arrTemp, i, stop) {
    let countStop = stop;
    let j = i;
    while (countStop >= 1) {
        arrTemp.push(j);
        j += n - 1;
        countStop--;
    }
    return arrTemp;
}

function getDiagonalLeftAll(arrIntoDiagonalLeft, m) {
    let length = m;
    let stop = length;
    let index = length - 1;
    let row = n;
    let rowAndColumn = n*n;
    arrIntoDiagonalLeft.push(getArrayDiagonalLeft([], n, n));
    while (length < n) {
        arrIntoDiagonalLeft.push(getArrayDiagonalLeft([], length, stop));
        arrIntoDiagonalLeft.push(getArrayDiagonalLeft([], rowAndColumn - (row*index), stop));
        length++;
        stop++;
        index++;
    }
}

function diagonalToRight(player, m) {
    // let count = 1;
    // let arrTemp = [];
    // for (let i = 0; i < player.length - 1; i++) {
    //     for (let j = i + 1; j < player.length; j++) {
    //         if (player[i] + n + 1 === player[j]) {
    //             arrTemp.push(player[i]);
    //             count++;
    //             if (count === m)
    //                 arrTemp.push(player[j]);
    //             break;
    //         } else {
    //             count = 1;
    //             break;
    //         }
    //     }
    //     if (count === m) {
    //         if (checkArrayIndex(arrIntoDiagonalRight, arrTemp))
    //             return true;
    //     }
    // }
    // return false;
    if (checkArrayIndex(arrIntoDiagonalRight, player)) {
        return true;
    } else {
        return false;
    }
}

function diagonalToLeft(player, m) {
    // let arrTemp = [];
    // let count = 1;
    // for (let i = 1; i < player.length - 1; i++) { // should start index = 1;
    //     for (let j = i + 1; j < player.length; j++) {
    //         if (player[i] + n - 1 === player[j]) {
    //             arrTemp.push(player[i]);
    //             count++;
    //             if (count === m)
    //                 arrTemp.push(player[j]);
    //             break;
    //         } else {
    //             count = 1;
    //             break;
    //         }
    //     }
    //     if (count === m) {
    //         if (checkArrayIndex(arrIntoDiagonalLeft, arrTemp))
    //             return true;
    //     }
    // }
    // return false;
    if (checkArrayIndex(arrIntoDiagonalLeft, player)) {
        return true;
    } else {
        return false;
    }
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
    //player = convertToNum(player);
    let personWinner = sortArr(player);
    if (consecutiveIntoRow(personWinner, m)) {
        return true;
    }
    if (consecutiveIntoColumn(personWinner, m)) {
        return true;
    }
    if (diagonalToRight(personWinner, m)) {
        return true;
    }
    if (diagonalToLeft(personWinner, m)) {
        return true;
    }
    return false;
}

function playerGame(){
    if (!isWin) {
        let value = parseInt(this.dataset.key);
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
}

function Finally() {
    if (playerWin(player1, m)) {
        document.getElementById('notification').innerHTML = 'Player 1 Win !!!';
        isWin = true;
    } else if (playerWin(player2, m)) {
        document.getElementById('notification').innerHTML = 'Player 2 Win !!!';
        isWin = true;
    }
}

items.forEach(item => item.addEventListener('click', playerGame));




