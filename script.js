/* Copyright (c) 2023 Promineo Tech 

Author:  Juan Mejia

Week 11 - Coding Assignment

----------------------------------------------------

Coding Steps:
- Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
    - Create a Tic-Tac-Toe game grid using your HTML element of choice.
    - When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
    - A heading should say whether it is X's or O's turn and change with each move made.
    - A button should be available to clear the grid and restart the game.
    - When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/




$(function() {
    // Initialize the current player as "X" and set the game state to not over
    let currentPlayer = "X";
    let gameOver = false;

    // Handle cell click events inside the game board
    $(".board").on("click", ".cell", function () {
        if (!gameOver && $(this).text() === "") {
            $(this).text(currentPlayer);
            checkWinner(); // Check for a winner after each move
            togglePlayer(); // Switch to the other player's turn
        }
    });

    // Handle reset button click
    $("#resetBtn").on("click", function () {
        resetGame(); // Reset the game to its initial state
    });

    // Function to toggle the current player (X or O)
    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        $("#turnText").text("It's " + currentPlayer + "'s turn");
    }

    // Function to check if there's a winner after each move
    function checkWinner() {
        let cells = $(".cell");
        let combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Loop through possible winning combinations
        for (let i = 0; i < combinations.length; i++) {
            let [a, b, c] = combinations[i];
            if (
                cells.eq(a).text() &&
                cells.eq(a).text() === cells.eq(b).text() &&
                cells.eq(a).text() === cells.eq(c).text()
            ) {
                // If a winning combination is found, end the game
                gameOver = true;
                $("#resultText").text(currentPlayer + " wins!!!");
                $("#resultAlert")
                    .removeClass("alert-warning")
                    .addClass("alert-success")
                    .removeClass("d-none");
                return; // Exit the function
            }
        }

        // If no winner and all cells are filled, it's a draw
        if ($(".cell:empty").length === 0) {
            gameOver = true;
            $("#resultText").text("It's a draw!!!");
            $("#resultAlert")
                .removeClass("alert-warning")
                .addClass("alert-info")
                .removeClass("d-none");
        }
    }

    // Function to reset the game to its initial state
    function resetGame() {
        $(".cell").text(""); // Clear cell contents
        gameOver = false; // Reset game state
        $("#resultAlert").addClass("d-none"); // Hide result alert
        currentPlayer = "X"; // Set the starting player back to X
        $("#turnText").text("It's X's turn");
    }
});