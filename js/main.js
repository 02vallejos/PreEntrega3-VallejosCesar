let cells = document.querySelectorAll('[data-cell]');
let board = document.querySelector('.board');
let winningMessageElement = document.getElementById('winningMessage');
let winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let restartButton = document.getElementById('restartButton');
let textPlayerX = document.querySelector('.text-player-x');
let textPlayerO = document.querySelector('.text-player-o');
let playerX = localStorage.getItem('playerX');
let playerO = localStorage.getItem('playerO');


const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;

textPlayerX.innerText = `${playerX}`;
textPlayerO.innerText = `${playerO}`;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = '';  // Limpia el contenido de la celda
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        oTurn = !oTurn;
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} Gana!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();  // Añade la "X" o "O" a la celda
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    for (let combination of WINNING_COMBINATIONS) {
        // Verifica si todas las celdas en la combinación tienen la clase actual
        let win = true;
        for(let index of combination) {
            if(!cells[index].classList.contains(currentClass)) {
                win = false;
                break;
            }
        }
        // Si se encuentra una combinación ganadora, devuelve true
        if(win) {
            return true;
        }
    }
    // Si ninguna combinación es ganadora, devuelve false
    return false;
}

// Ir a la página de Jugadores
document.querySelector('.player').addEventListener('submit', (e) => {
    e.preventDefault();
        window.location.href = 'player.html';     
});