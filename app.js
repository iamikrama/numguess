let randomNumber = Math.floor(Math.random() * 100) + 1;
    const submit = document.querySelector("#subt");
    const userInput = document.querySelector("#guessField");
    const guessSlot = document.querySelector(".guesses");
    const remaining = document.querySelector(".lastResult");
    const lowOrHi = document.querySelector(".lowOrHi");
    const startOver = document.querySelector(".resultParas");

    const p = document.createElement("p");

    let prevGuesses = [];
    let numGuesses = 1;
    let playGame = true;

    if (playGame) {
        // Add click event for the submit button
        submit.addEventListener("click", function (e) {
            e.preventDefault();
            handleGuess();
        });

        // Add keydown event for Enter key
        userInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                handleGuess();
            }
        });
    }

    function handleGuess() {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }

    function validateGuess(guess) {
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Please enter a valid number between 1 and 100.");
        } else {
            prevGuesses.push(guess);
            if (numGuesses === 10 && guess !== randomNumber) {
                displayMessage(`Game Over! The correct number was ${randomNumber}.`);
                endGame();
            } else {
                displayGuess(guess);
                checkGuess(guess);
            }
        }
    }

    function checkGuess(guess) {
        if (guess === randomNumber) {
            displayMessage("Congratulations! You guessed the correct number.");
            endGame();
        } else if (guess < randomNumber) {
            displayMessage("Your guess is too low.");
        } else {
            displayMessage("Your guess is too high.");
        }
    }

    function displayGuess(guess) {
        userInput.value = "";
        guessSlot.innerHTML += `${guess}, `;
        numGuesses++;
        remaining.textContent = `${10 - numGuesses}`;
    }

    function displayMessage(message) {
        lowOrHi.innerHTML = `<h2>${message}</h2>`;
    }

    function endGame() {
        userInput.value = "";
        userInput.setAttribute("disabled", "");
        p.classList.add("button");
        p.innerHTML = `<button id="newGame">Start New Game</button>`;
        startOver.appendChild(p);
        playGame = false;
        newGame();
    }

    function newGame() {
        const newGameButton = document.querySelector("#newGame");
        newGameButton.addEventListener("click", function () {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            prevGuesses = [];
            numGuesses = 1;
            guessSlot.textContent = "";
            remaining.textContent = "10";
            lowOrHi.textContent = "";
            userInput.removeAttribute("disabled");
            startOver.removeChild(p);
            playGame = true;
        });
    }