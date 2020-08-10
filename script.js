const boardContainer = document.getElementById('board-container');

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {
        board,
    }
})();

const gameController = (() => {
    const buildBoard = () => {
        let _counter = 1
        gameBoard.board.forEach(() => {
            let cell = document.createElement('div');
            cell.classList.add('game-square');
            cell.id = _counter;
            _counter++;
            assignCell(cell);
            boardContainer.appendChild(cell);
        })
    }
    const assignCell = (cell) => {
        cell.addEventListener('click', () => {
            if(cell.textContent != 'X' && cell.textContent != 'O') {
                gameBoard.board[cell.id - 1] = 'X';
                cell.textContent = gameBoard.board[cell.id - 1];
            }
        })
    }
    return {
        buildBoard,
        assignCell
    }
})();

const playerFactory = (name) => {
    let _team;
    let isWinner = false;
    return {name};
};

const clint = playerFactory('clint');
clint.name = 'bob';
console.log(clint.name);
gameController.buildBoard();