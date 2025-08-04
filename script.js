const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const emoji = document.getElementById("emoji");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();

    // Simulate thinking delay
    playerChoiceEl.textContent = `You chose: ❔`;
    computerChoiceEl.textContent = `Computer chose: ❔`;
    resultText.textContent = `Thinking...`;
    emoji.innerHTML = "⏳";

    setTimeout(() => {
      const winner = getWinner(userChoice, computerChoice);
      showResult(userChoice, computerChoice, winner);
    }, 600);
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultText.textContent = "Make your move!";
  resultText.className = "";
  emoji.innerHTML = "";
  playerChoiceEl.textContent = "You chose: ❔";
  computerChoiceEl.textContent = "Computer chose: ❔";
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(user, comp) {
  if (user === comp) return "draw";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    playerScore++;
    return "win";
  } else {
    computerScore++;
    return "lose";
  }
}

function showResult(userChoice, computerChoice, outcome) {
  const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

  playerChoiceEl.textContent = `You chose: ${emojis[userChoice]}`;
  computerChoiceEl.textContent = `Computer chose: ${emojis[computerChoice]}`;

  if (outcome === "win") {
    resultText.textContent = "🎉 You Win!";
    resultText.className = "win";
    emoji.innerHTML = "🏆";
    playerScoreEl.textContent = playerScore;
  } else if (outcome === "lose") {
    resultText.textContent = "😢 You Lose!";
    resultText.className = "lose";
    emoji.innerHTML = "💥";
    computerScoreEl.textContent = computerScore;
  } else {
    resultText.textContent = "😐 It's a Draw!";
    resultText.className = "draw";
    emoji.innerHTML = "🤝";
  }
}
