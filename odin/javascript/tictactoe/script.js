let Player = function(obj, id) {
    let getName = function() {
        return obj.value;
    }
    return {getName, id};
}

function GameBoard(debug=false) {
    let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    function getBoard() {
        return board;
    }
    function isTie() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == -1) {
                    return false;
                }
            }
        }
        return true;
    }

    function hasWinner() {
        // -1 -> no winner
        // 0 -> p1
        // 1 -> p2
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != -1 && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return board[i][0];
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !=-1 && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[0][i];
            }
        }
        // check diagonals
        if (board[0][0] != -1 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] != -1 && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            return board[0][2];
        }
        return -1;
    }
    function place(i, j, currentPlayer) {
        // has to be valid location
        if (!isValidMove(i, j)) {
            return false;
        }
        board[i][j] = currentPlayer;
        if (debug) {
            console.log(getBoard());
        }
        return true;
    }
    function isValidMove(i, j) {
        return board[i][j] == -1;
    }
    return {getBoard, hasWinner, place, isValidMove, isTie};
}


let p1 = Player(document.getElementById('player1'), 0);
let p2 = Player(document.getElementById('player2'), 1);


let ticTacToe = function(players) {
    let gameBoard = GameBoard();
    let playing = true, winner = -1;
    let currentPlayer = 0
    function isPlaying() {
        return playing;
    }
    function getCurrentPlayer() {
        return players[currentPlayer];
    }
    function changePlayer() {
        currentPlayer = (currentPlayer + 1) % 2;
    }
    function win() {
        console.log('Player ' + (currentPlayer) + ' wins!');
    }
    function initialize() {
        gameBoard = GameBoard();
        playing = true;
        currentPlayer = 0;
        winner = -1;
        render();
    }
    function makeStatusText() {
        if (gameBoard.isTie()) {
            return 'It\'s a tie!';
        }
        else if (winner != -1) {
            return 'Player ' + players[winner].getName() + ' wins!';
        }
        else {
            return players[currentPlayer].getName() + "'s turn.";
        }
    }
    function render() {
        for(let i = 0; i < 9; i++) {
            let row = Math.floor(i / 3);
            let col = i % 3;
            let cell = document.getElementById(i);
            let item = gameBoard.getBoard()[row][col];

            if (item==-1) {
                cell.innerText = '';
                cell.className = "cell";
            }
            else if (item == 0) {
                cell.innerText = 'O';
                cell.className = "cell cell-o";
            }
            else {
                cell.innerText = 'X';
                cell.className = "cell cell-x";
            }
        }
        document.getElementById('message').innerText = makeStatusText();
    }
    function play(i, j) {
        if (!playing) {
            throw new Error("initialize game again!");
        }
        if (!gameBoard.isValidMove(i, j)) {
            throw new Error("Invalid move!"); 
        }
        gameBoard.place(i, j, currentPlayer);
        if (gameBoard.hasWinner() != -1) {
            win();
            winner = currentPlayer;
            playing = false;
        }
        else if (gameBoard.isTie()) {
            playing = false;
        }
        else {
            changePlayer();
        }
        render();
        return winner;
    }
    function print() {
        console.log(gameBoard.getBoard());
        console.log({playing, currentPlayer, players, winner})
    }
    initialize();
    return {gameBoard, players, isPlaying, getCurrentPlayer, print, play, initialize};
}([p1, p2]);

Array.from(document.getElementsByClassName("cell")).forEach(cell => {
    cell.addEventListener('click', function() {
        let i = Math.floor(cell.id / 3);
        let j = cell.id % 3;
        if (ticTacToe.isPlaying()) {
            ticTacToe.play(i, j);
        }
    });
});

document.getElementById('reset-button').addEventListener('click', function() {
    ticTacToe.initialize();
});