const words = ['apple'];
let selectedWord = '';
let guessedLetters = [];
let lives = 6;

const wordDisplay = document.getElementById('word-display');
const livesCount = document.getElementById('lives-count');
const message = document.getElementById('message');
const keyboard = document.getElementById('keyboard');
const resetButton = document.getElementById('reset-button');
const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

// Initialize the game
function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  lives = 6;
  renderWord();
  renderKeyboard();
  updateLives();
  message.textContent = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawGallows(); // Draw the gallows
}

// Render the word with guessed letters
function renderWord() {
  const displayWord = selectedWord
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
  wordDisplay.textContent = displayWord;

  if (!displayWord.includes('_')) {
    message.textContent = 'Congratulations! You won!';
    disableKeyboard();
  }
}

// Render the keyboard
function renderKeyboard() {
  keyboard.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i).toLowerCase();
    const key = document.createElement('div');
    key.classList.add('key');
    key.textContent = letter;
    key.addEventListener('click', () => guessLetter(letter));
    keyboard.appendChild(key);
  }
}

// Guess a letter
function guessLetter(letter) {
  if (guessedLetters.includes(letter) || lives === 0) return;

  guessedLetters.push(letter);
  if (!selectedWord.includes(letter)) {
    lives--;
    updateLives();
    drawHangman(); // Draw the next part of the hangman
  }

  renderWord();
  disableKey(letter);

  if (lives === 0) {
    message.textContent = `Game Over! The word was "${selectedWord}".`;
    disableKeyboard();
  }
}

// Disable a key after it's clicked
function disableKey(letter) {
  const key = Array.from(keyboard.children).find(
    key => key.textContent === letter
  );
  if (key) {
    key.classList.add('disabled');
    key.removeEventListener('click', () => guessLetter(letter));
  }
}

// Disable the entire keyboard
function disableKeyboard() {
  Array.from(keyboard.children).forEach(key => {
    key.classList.add('disabled');
    key.removeEventListener('click', () => guessLetter(key.textContent));
  });
}

// Update the lives counter
function updateLives() {
  livesCount.textContent = lives;
}

// Draw the gallows
function drawGallows() {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // Base
  ctx.beginPath();
  ctx.moveTo(50, 250);
  ctx.lineTo(150, 250);
  ctx.stroke();

  // Vertical pole
  ctx.beginPath();
  ctx.moveTo(100, 250);
  ctx.lineTo(100, 50);
  ctx.stroke();

  // Horizontal pole
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(200, 50);
  ctx.stroke();

  // Rope
  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(200, 80);
  ctx.stroke();
}

// Draw the hangman step by step
function drawHangman() {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  switch (lives) {
    case 5:
      // Head
      ctx.beginPath();
      ctx.arc(200, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4:
      // Body
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.lineTo(200, 180);
      ctx.stroke();
      break;
    case 3:
      // Left arm
      ctx.beginPath();
      ctx.moveTo(200, 130);
      ctx.lineTo(170, 150);
      ctx.stroke();
      break;
    case 2:
      // Right arm
      ctx.beginPath();
      ctx.moveTo(200, 130);
      ctx.lineTo(230, 150);
      ctx.stroke();
      break;
    case 1:
      // Left leg
      ctx.beginPath();
      ctx.moveTo(200, 180);
      ctx.lineTo(170, 220);
      ctx.stroke();
      break;
    case 0:
      // Right leg
      ctx.beginPath();
      ctx.moveTo(200, 180);
      ctx.lineTo(230, 220);
      ctx.stroke();
      break;
  }
}

// Reset the game
resetButton.addEventListener('click', initializeGame);

// Start the game when the page loads
initializeGame();