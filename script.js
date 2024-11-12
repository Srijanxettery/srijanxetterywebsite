// script.js
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const endScreen = document.getElementById('end-screen');
const endStatus = document.getElementById('end-status');
const newGameButton = document.getElementById('new-game-btn');

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
};

const handleClick = (e) => {
  const cellIndex = e.target.getAttribute('data-cell');

  if (gameBoard[cellIndex] || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    endStatus.textContent = `Player ${winner} wins!`;
    endScreen.style.display = 'block';
  } else if (!gameBoard.includes('')) {
    gameActive = false;
    endStatus.textContent = 'It\'s a draw!';
    endScreen.style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const restartGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusElement.textContent = `Player X's turn`;
  endScreen.style.display = 'none';

  cells.forEach(cell => {
    cell.textContent = '';
  });
};

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

newGameButton.addEventListener('click', restartGame);
