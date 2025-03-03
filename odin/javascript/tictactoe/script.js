let Player = function(name, id) {
    let getName = function() {
        return name;
    }
    let getId = function() {
        return id;
    }
    return {name, id};
}

function GameBoard(debug=false) {
    let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    function getBoard() {
        return board;
    }

    function hasWinner() {
        // -1 -> no winner
        // 0 -> p1
        // 1 -> p2
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return board[i][0];
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[0][i];
            }
        }
        // check diagonals
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0];
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
    return {getBoard, hasWinner, place, isValidMove};
}


let p1 = Player('Player 1', 0);
let p2 = Player('Player 2', 1);


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
        if (winner != -1) {
            return 'Player ' + players[winner].name + ' wins!';
        }
        else {
            return players[currentPlayer].name + "'s turn.";
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
    return {gameBoard, players, isPlaying, getCurrentPlayer, print, play, initialize};
}([p1, [p2]]);

/*
let moves = [
    [1, 1], 
    [2, 0],
    [0, 0],
    [2, 2],
    [0, 2],
    [0, 1],
    [2, 1],
    [1, 0],
    [1, 2]
]*/
let moves = [
    [1, 1], 
    [2, 0],
    [0, 0],
    [2, 1],
    [2, 2],
    [0, 1],
    [2, 1],
    [1, 0],
    [1, 2]
]

moves.forEach(element => {

    winner = ticTacToe.play(element[0], element[1]);
    ticTacToe.print();
    if (winner != -1) {
        console.log('Player ' + winner + ' wins!');
        return;
    }
});
