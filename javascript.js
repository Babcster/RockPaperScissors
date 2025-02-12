function getComputerChoice() {
    let randomNumber = getRandomInt(3);

    if (randomNumber == 0) {
        return "Rock";
    } else if (randomNumber == 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getHumanChoice() {
    let humanChoice = prompt("Choose Rock, Paper, or Scissors to play!");

    if (humanChoice.toLowerCase() === "rock") {
        return "Rock";
    } else if (humanChoice.toLowerCase() === "paper") {
        return "Paper";
    } else if (humanChoice.toLowerCase() === "scissors") {
        return "Scissors";
    } else {
        alert("Invalid choice! Please enter Rock, Paper, or Scissors.");
        return getHumanChoice(); 
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log(`It's a tie! You both chose ${humanChoice}.`);
        return "tie";
    } else if (
        (humanChoice === "Rock" && computerChoice === "Scissors") ||
        (humanChoice === "Paper" && computerChoice === "Rock") ||
        (humanChoice === "Scissors" && computerChoice === "Paper")
    ) {
        console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
        return "human";
    } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
        return "computer";
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();

        let result = playRound(humanSelection, computerSelection);

        if (result === "human") {
            humanScore++;
        } else if (result === "computer") {
            computerScore++;
        }

        console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
    }

    console.log("Final Results:");
    if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
    } else if (humanScore < computerScore) {
        console.log("You lost the game. Better luck next time!");
    } else {
        console.log("It's a tie! Well played.");
    }
}

playGame();
