const buttons = document.querySelectorAll(".btn-container button");
const userScoreDisplay = document.getElementById("user-score");
const computerScoreDisplay = document.getElementById("computer-score");
const roundSquares = document.querySelectorAll(".round-squares .square");
const userChoiceContainer = document.querySelector(".user-choice-container");
const computerChoiceContainer = document.querySelector(
  ".computer-choice-container",
);
const roundResultText = document.querySelector(".round-result-text");
const roundTimer = document.querySelector(".round-timer");
const resetBtn = (document.getElementById("btn-reset").onclick = function () {
  resetGame();
});

let userScore = parseInt(userScoreDisplay.textContent) || 0;
let computerScore = parseInt(computerScoreDisplay.textContent) || 0;
let currentRound = 0;
const MAX_ROUNDS = 5;
let gameActive = true;
let timerInterval = null;
let secondsLeft = 0;

const timerElement = document.createElement("div");
timerElement.className = "round-timer";
document.querySelector(".round-result-container").appendChild(timerElement);

const svgPaths = {
  rock: {
    path: `
<svg width="153" height="185" viewBox="0 0 153 185" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M117.889 141.804V179C117.889 181.209 116.098 183 113.889 183H23.9352C21.726 183 19.9352 181.209 19.9352 179V141.899C19.9352 140.773 19.4607 139.7 18.6282 138.942L3.30695 124.991C2.47448 124.233 2 123.159 2 122.033V78.2105V23.6917C2 21.4826 3.79086 19.6917 6 19.6917H35.456V6C35.456 3.79086 37.2469 2 39.456 2H68.912H98.3681C100.577 2 102.368 3.79086 102.368 6V9.48496H131.824C134.033 9.48496 135.824 11.2758 135.824 13.485V56.4361H147C149.209 56.4361 151 58.227 151 60.4361V70.0451V105.797C151 106.867 150.571 107.893 149.809 108.645L134.444 123.801L119.08 138.957C118.318 139.708 117.889 140.734 117.889 141.804Z" fill="#C4A7E7"/>
<path d="M135.824 56.4361V13.485C135.824 11.2758 134.033 9.48496 131.824 9.48496H102.368M135.824 56.4361H147C149.209 56.4361 151 58.227 151 60.4361V70.0451V105.797C151 106.867 150.571 107.893 149.809 108.645L134.444 123.801L119.08 138.957C118.318 139.708 117.889 140.734 117.889 141.804V179C117.889 181.209 116.098 183 113.889 183H23.9352C21.726 183 19.9352 181.209 19.9352 179V141.899C19.9352 140.773 19.4607 139.7 18.6282 138.942L3.30695 124.991C2.47448 124.233 2 123.159 2 122.033V78.2105M135.824 56.4361H102.368M70.2917 146.256V124.793C70.2917 123.723 70.7206 122.697 71.4826 121.946L88.9167 104.748M102.368 56.4361V33.3008V9.48496M102.368 56.4361H92.9167C90.7075 56.4361 88.9167 58.227 88.9167 60.4361V88.4173M68.912 2V33.3008V68.0038V88.4173M68.912 2H39.456C37.2469 2 35.456 3.79086 35.456 6V19.6917M68.912 2H98.3681C100.577 2 102.368 3.79086 102.368 6V9.48496M35.456 19.6917H6C3.79086 19.6917 2 21.4826 2 23.6917V78.2105M35.456 19.6917V33.3008V68.0038V78.2105M88.9167 88.4173H117.338C119.547 88.4173 121.338 90.2082 121.338 92.4173V103.387M88.9167 88.4173H68.912M68.912 88.4173H39.456C37.2469 88.4173 35.456 86.6264 35.456 84.4173V78.2105M35.456 78.2105H2" stroke="#191724" stroke-width="4" stroke-linecap="round"/>
</svg>

`,
  },
  paper: {
    path: `
<svg width="187" height="236" viewBox="0 0 187 236" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M118.211 230V194.049C118.211 192.979 118.64 191.953 119.402 191.202L134.812 176L183 128.465C184.631 126.856 184.58 124.209 182.889 122.664L168.469 109.494C167.732 108.82 166.77 108.447 165.772 108.447H154.409C153.375 108.447 152.381 108.848 151.635 109.565L136.195 124.424V109.129V18.2824C136.195 16.0732 134.405 14.2824 132.195 14.2824H102.647V6C102.647 3.79086 100.856 2 98.6466 2H73.0977C70.8886 2 69.0977 3.79086 69.0977 6L69.0977 18.7644H39.5489C37.3397 18.7644 35.5489 20.5553 35.5489 22.7644V45.6706H6C3.79086 45.6706 2 47.4615 2 49.6706L2.00008 130.282V174.232C2.00008 175.358 2.47455 176.432 3.307 177.19L18.6781 191.186C19.5106 191.944 19.985 193.018 19.985 194.144V230C19.985 232.209 21.7759 234 23.985 234H114.211C116.42 234 118.211 232.209 118.211 230Z" fill="#C4A7E7"/>
<path d="M70.4813 198.518V176.991C70.4813 175.92 70.9102 174.895 71.6722 174.143L89.158 156.894M35.5489 113.224V45.6706M102.647 113.224V14.2824M69.0977 18.7644V113.224M69.0977 18.7644H39.5489C37.3397 18.7644 35.5489 20.5553 35.5489 22.7644V45.6706M69.0977 18.7644L69.0977 6C69.0977 3.79086 70.8886 2 73.0977 2H98.6466C100.856 2 102.647 3.79086 102.647 6V14.2824M35.5489 45.6706H6C3.79086 45.6706 2 47.4615 2 49.6706L2.00008 130.282V174.232C2.00008 175.358 2.47455 176.432 3.307 177.19L18.6781 191.186C19.5106 191.944 19.985 193.018 19.985 194.144V230C19.985 232.209 21.7759 234 23.985 234H114.211C116.42 234 118.211 232.209 118.211 230V194.049C118.211 192.979 118.64 191.953 119.402 191.202L134.812 176L183 128.465C184.631 126.856 184.58 124.209 182.889 122.664L168.469 109.494C167.732 108.82 166.77 108.447 165.772 108.447H154.409C153.375 108.447 152.381 108.848 151.635 109.565L124.436 135.741M102.647 14.2824H132.195C134.405 14.2824 136.195 16.0732 136.195 18.2824V109.129V124.424" stroke="#191724" stroke-width="4" stroke-linecap="round"/>
</svg>

`,
  },
  scissors: {
    path: `
<svg width="153" height="241" viewBox="0 0 153 241" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M117.889 197.767V235C117.889 237.209 116.098 239 113.889 239H23.9352C21.726 239 19.9352 237.209 19.9352 235V197.861C19.9352 196.736 19.4612 195.663 18.6295 194.905L3.30569 180.94C2.47398 180.182 2 179.109 2 177.983V134.121V76.1466C2 73.9374 3.79086 72.1466 6 72.1466H35.456V61.8448C35.456 59.6357 37.2469 57.8448 39.456 57.8448H52.184H56.4954L41.999 17.3983C41.246 15.2972 42.3581 12.9864 44.4699 12.264L66.6607 4.67348C68.77 3.95196 71.0621 5.09408 71.7564 7.21256L77.1898 23.7931L90.9861 63.9741L102.368 97.577V5.99999C102.368 3.79085 104.159 2 106.368 2H131.824C134.033 2 135.824 3.79086 135.824 6V112.328H147C149.209 112.328 151 114.118 151 116.328V125.948V161.733C151 162.803 150.572 163.828 149.81 164.58L134.444 179.75L119.079 194.92C118.317 195.672 117.889 196.697 117.889 197.767Z" fill="#C4A7E7"/>
<path d="M135.824 112.328V6C135.824 3.79086 134.033 2 131.824 2H106.368C104.159 2 102.368 3.79085 102.368 5.99999V97.577M135.824 112.328H147C149.209 112.328 151 114.118 151 116.328V125.948V161.733C151 162.803 150.572 163.828 149.81 164.58L134.444 179.75L119.079 194.92C118.317 195.672 117.889 196.697 117.889 197.767V235C117.889 237.209 116.098 239 113.889 239H23.9352C21.726 239 19.9352 237.209 19.9352 235V197.861C19.9352 196.736 19.4612 195.663 18.6295 194.905L3.30569 180.94C2.47398 180.182 2 179.109 2 177.983V134.121M135.824 112.328H102.368M70.2917 202.224V180.741C70.2917 179.671 70.7202 178.646 71.4814 177.894L88.9167 160.681M102.368 97.577V112.328M102.368 97.577L90.9861 63.9741L77.1898 23.7931L71.7564 7.21256C71.0621 5.09408 68.77 3.95196 66.6607 4.67348L44.4699 12.264C42.3581 12.9864 41.246 15.2972 41.999 17.3983L56.4954 57.8448M102.368 112.328H92.9167C90.7075 112.328 88.9167 114.118 88.9167 116.328V140.336C88.9167 142.545 90.7075 144.336 92.9167 144.336H117.338C119.547 144.336 121.338 146.127 121.338 148.336V159.319M35.456 72.1466H6C3.79086 72.1466 2 73.9374 2 76.1466V134.121M35.456 72.1466V89.1724V123.905V134.121M35.456 72.1466V61.8448C35.456 59.6357 37.2469 57.8448 39.456 57.8448H52.184H56.4954M35.456 134.121V140.336C35.456 142.545 37.2469 144.336 39.456 144.336H64.912C67.1212 144.336 68.912 142.545 68.912 140.336V123.905V89.1724V61.8448C68.912 59.6357 67.1212 57.8448 64.912 57.8448H56.4954M35.456 134.121H2" stroke="#191724" stroke-width="4" stroke-linecap="round"/>
</svg>

`,
  },
};

function init() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (gameActive) {
        playRound(button.textContent.toLowerCase());
      }
    });
  });

  updateScores();
  updateRoundResultText();
}

function playRound(userChoice) {
  if (currentRound >= MAX_ROUNDS) {
    resetGame();
    return;
  }

  gameActive = false;

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  displayChoice(userChoice, "user");
  displayChoice(computerChoice, "computer");

  const result = determineWinner(userChoice, computerChoice);

  if (result === "user") {
    userScore++;
  } else if (result === "computer") {
    computerScore++;
  }

  updateScores();
  updateRoundDisplay();

  if (currentRound >= MAX_ROUNDS) {
    setTimeout(() => {
      endGame();
    }, 1000);
    return;
  }

  // Start the timer for the next round
  startTimer(3);
}

function startTimer(seconds) {
  // Display timer element
  timerElement.style.display = "block";
  secondsLeft = seconds;
  updateTimerDisplay();

  // Clear any existing interval
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Set new interval
  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.style.display = "none";
      gameActive = true; // Re-enable game controls
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerElement.textContent = `Next round in: ${secondsLeft}`;
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    roundResultText.innerHTML = `It's a Tie! You both chose ${userChoice}.`;
    return "tie";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    roundResultText.innerHTML = `You win! ${userChoice} beats ${computerChoice}.`;
    return "user";
  } else {
    roundResultText.innerHTML = `You Lose! ${computerChoice} beats ${userChoice}.`;
    return "computer";
  }
}

function displayChoice(choice, player) {
  const container =
    player === "user" ? userChoiceContainer : computerChoiceContainer;
  container.innerHTML = svgPaths[choice].path;
}

function updateScores() {
  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
}

function updateRoundResultText() {
  roundResultText.innerHTML = "Select one of the hands to start.";
}

function updateRoundDisplay() {
  currentRound++;

  for (let i = 0; i < roundSquares.length; i++) {
    if (i < currentRound) {
      roundSquares[i].classList.add("active");
    } else {
      roundSquares[i].classList.remove("active");
    }
  }
}

function endGame() {
  let message = "";
  if (userScore > computerScore) {
    message = "You win the game!";
  } else if (computerScore > userScore) {
    message = "Computer wins the game!";
  } else {
    message = "The game is a tie!";
  }

  roundResultText.innerHTML = `${message}`;
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  currentRound = 0;
  gameActive = true;

  // Clear any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerElement.style.display = "none";

  updateScores();
  updateRoundResultText();

  roundSquares.forEach((square) => {
    square.classList.remove("active");
  });

  userChoiceContainer.innerHTML = "";
  computerChoiceContainer.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", init);
