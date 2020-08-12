const boardContainer = document.getElementById('board-container');
let playerTeam = 1;

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
                playerTeam = 1 - playerTeam;
                gameBoard.board[cell.id - 1] = gameBoard.players[playerTeam].team;
                cell.textContent = gameBoard.board[cell.id - 1];
                checkWinner();
            }
        })
    }

    const checkWinner = () => {
        if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[0] == gameBoard.board[2]) {
            endGame();
        }
        else if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[0] == gameBoard.board[6]) {
            endGame();
        }
        else if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[0] == gameBoard.board[8]) {
            endGame();
        }
        else if (gameBoard.board[1] != '' && gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[1] == gameBoard.board[7]) {
            endGame();
        }
        else if (gameBoard.board[2] != '' && gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[2] == gameBoard.board[6]) {
            endGame();
        }
        else if (gameBoard.board[2] != '' && gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[2] == gameBoard.board[8]) {
            endGame();
        }
        else if (gameBoard.board[3] != '' && gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[3] == gameBoard.board[5]) {
            endGame();
        }
        else if (gameBoard.board[6] != '' && gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[6] == gameBoard.board[8]) {
            endGame();
        }
    }
    const declareWinner = () => {

    }

    const startGame = () => {
        const player1 = playerFactory('player1', 'X');
        const player2 = playerFactory('player2', 'O');
        gameBoard.players.push(player1);
        gameBoard.players.push(player2);
        buildBoard();
    }

    const resetGame = () => {

    }

    const endGame = () => {
        console.log('game over');
    }

    const switchPlayer = () => {

    }

    return {
        startGame,
    }
})();

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const players = [];
    return {
        board,
        players
    }
})();

const playerFactory = (name, team) => {
    this.team = team;
    this.name = name;
    let isWinner = false;
    return {name, team, isWinner};
};

gameController.startGame();