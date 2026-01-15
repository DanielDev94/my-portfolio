// --- 1. VARIABLES (Keeping track of things) ---
let userScore = 0;
let computerScore = 0;

// --- 2. THE DOM (Selecting things from HTML) ---
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("comp-score");
const resultText = document.getElementById("result-text");

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

// --- 3. THE COMPUTER'S BRAIN ---
function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    // Math.random() gives a number between 0 and 1 (e.g., 0.45)
    // We multiply by 3 to get 0, 1, or 2
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber]; 
}

// --- 4. CONVERT LETTERS TO WORDS (For display) ---
function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

// --- 5. UPDATING THE SCREEN (Win/Lose/Draw) ---
function win(userChoice, computerChoice) {
    userScore++; // Increase score
    userScoreSpan.textContent = userScore; // Update HTML
    computerScoreSpan.textContent = computerScore;
    // Show winning message
    resultText.textContent = convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + ". You Win! 🔥";
    resultText.style.color = "#4dff4d"; // Turn text Green
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    resultText.textContent = convertToWord(userChoice) + " loses to " + convertToWord(computerChoice) + ". You Lost... 💩";
    resultText.style.color = "#ff4757"; // Turn text Red
}

function draw(userChoice, computerChoice) {
    resultText.textContent = "It's a Draw! You both picked " + convertToWord(userChoice);
    resultText.style.color = "white"; // Turn text White
}

// --- 6. THE GAME LOGIC (The Referee) ---
function game(userChoice) {
    const computerChoice = getComputerChoice();
    
    // We combine the two choices into a string (e.g., "rs" for Rock vs Scissors)
    // "r" = Rock, "p" = Paper, "s" = Scissors
    
    switch (userChoice + computerChoice) {
        // Winning Scenarios
        case "rs": // Rock beats Scissors
        case "pr": // Paper beats Rock
        case "sp": // Scissors beats Paper
            win(userChoice, computerChoice);
            break;
            
        // Losing Scenarios
        case "rp": // Rock loses to Paper
        case "ps": // Paper loses to Scissors
        case "sr": // Scissors loses to Rock
            lose(userChoice, computerChoice);
            break;
            
        // Draw Scenarios
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

// --- 7. EVENT LISTENERS (Waiting for clicks) ---
function main() {
    rockBtn.addEventListener('click', function() {
        game("r");
    });

    paperBtn.addEventListener('click', function() {
        game("p");
    });

    scissorsBtn.addEventListener('click', function() {
        game("s");
    });
}

main(); // Start the game listeners