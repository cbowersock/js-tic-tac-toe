const boardContainer = document.getElementById('board-container');
const resultsContainer = document.getElementById('results-container');

const gameController = (() => {
    let _playerTeam = 1;
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
                switchPlayer();
                gameBoard.board[cell.id - 1] = gameBoard.players[_playerTeam].team;
                cell.textContent = gameBoard.board[cell.id - 1];
                if (!checkWinner()) {
                    checkTie();
                }
            }
        })
    }

    const checkWinner = () => {
        if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[0] == gameBoard.board[2]) {
            endGame(gameBoard.board[0]);
            return true;
        }
        else if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[0] == gameBoard.board[6]) {
            endGame(gameBoard.board[0]);
            return true;
        }
        else if (gameBoard.board[0] != '' && gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[0] == gameBoard.board[8]) {
            endGame(gameBoard.board[0]);
            return true;
        }
        else if (gameBoard.board[1] != '' && gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[1] == gameBoard.board[7]) {
            endGame(gameBoard.board[1]);
            return true;
        }
        else if (gameBoard.board[2] != '' && gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[2] == gameBoard.board[6]) {
            endGame(gameBoard.board[2]);
            return true;
        }
        else if (gameBoard.board[2] != '' && gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[2] == gameBoard.board[8]) {
            endGame(gameBoard.board[2]);
            return true;
        }
        else if (gameBoard.board[3] != '' && gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[3] == gameBoard.board[5]) {
            endGame(gameBoard.board[3]);
            return true;
        }
        else if (gameBoard.board[6] != '' && gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[6] == gameBoard.board[8]) {
            endGame(gameBoard.board[6]);
            return true;
        }
    }

    const checkTie = () => {
        let _tieAmount = 0
        gameBoard.board.forEach(cell => {
            if (cell != '') {
                _tieAmount++;
            }
        })
        if (_tieAmount == 9) {
            endGame(`nobody! It's a tie! You both lose!`);
        } 
    }

    const resetGame = () => {
        location.reload();
    }

    const endGame = (winner) => {
        let button = document.createElement('button');
        let results = document.createElement('h2');
        button.id = 'reset-button';
        button.textContent = 'Play Again!';
        button.addEventListener('click', () => {
            resetGame();
        });
        results.id = 'game-results';
        results.textContent = `The Winner Is: ${winner}`;
        resultsContainer.appendChild(results);
        resultsContainer.appendChild(button);
    }

    const switchPlayer = () => {
        _playerTeam = 1 - _playerTeam;
    }

    const startGame = () => {
        const player1 = playerFactory('player1', 'X');
        const player2 = playerFactory('player2', 'O');
        gameBoard.players.push(player1);
        gameBoard.players.push(player2);
        buildBoard();
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