const boardContainer = document.getElementById('board-container');
const resultsContainer = document.getElementById('results-container');
const startButton = document.getElementById('start-button');

const gameController = (() => {
    let _playerTeam = 1;
    
    const buildBoard = () => {
        let _counter = 1
        gameBoard.board.forEach(() => {
            const cell = document.createElement('div');
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

    const makeResetButton = () => {
        const button = document.createElement('button');
        button.id = 'reset-button';
        button.textContent = 'Play Again!';
        button.addEventListener('click', () => {
            resetGame();
        });
        return button;
    }

    const makeResultsDisplay = (winner) => {
        const results = document.createElement('h2');
        results.id = 'game-results';
        results.textContent = `The Winner Is: ${winner}`;
        return results;
    }

    const endGame = (winner) => {

        if (winner == 'X') {
            winner = gameBoard.players.find(player => player.team === 'X');
            winner = winner.name;
        }
        else if (winner == 'O') {
            winner = gameBoard.players.find(player => player.team === 'O');
            winner = winner.name;
        }

        resultsContainer.appendChild(makeResultsDisplay(winner));
        resultsContainer.appendChild(makeResetButton());
    }

    const switchPlayer = () => {
        _playerTeam = 1 - _playerTeam;
    }

    const startGame = () => {
        const firstPlayer = playerFactory(document.getElementById('player1').value, 'X');
        const secondPlayer = playerFactory(document.getElementById('player2').value, 'O');
        gameBoard.players.push(firstPlayer);
        gameBoard.players.push(secondPlayer);
        buildBoard();
    }

    startButton.addEventListener('click', () => {
        startGame();
    })
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
    return {name, team};
};