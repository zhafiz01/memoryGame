document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.game-board');
    const startBtn = document.querySelector('.start-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const timerDisplay = document.querySelector('.timer');
  
    let cards = [];
    let flippedCards = [];
    let matches = 0;
    let timer = null;
    let timeElapsed = 0;
  
    const cardValues = Array.from({ length: 8 }, (_, i) => i + 1).flatMap((x) => [x, x]);
  
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  
    const createBoard = () => {
      board.innerHTML = '';
      cards = shuffleArray(cardValues).map((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
        return card;
      });
    };
  
    const flipCard = (card) => {
      if (card.classList.contains('flipped') || flippedCards.length === 2) return;
  
      card.textContent = card.dataset.value;
      card.classList.add('flipped');
      flippedCards.push(card);
  
      if (flippedCards.length === 2) checkMatch();
    };
  
    const checkMatch = () => {
      const [first, second] = flippedCards;
  
      if (first.dataset.value === second.dataset.value) {
        setTimeout(() => {
          first.classList.add('hidden');
          second.classList.add('hidden');
          matches++;
          if (matches === cardValues.length / 2) endGame();
        }, 500);
      } else {
        setTimeout(() => {
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          first.textContent = '';
          second.textContent = '';
        }, 500);
      }
      flippedCards = [];
    };
  
    const startGame = () => {
      matches = 0;
      timeElapsed = 0;
      timerDisplay.textContent = `Time: 0s`;
      createBoard();
  
      timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
      }, 1000);
    };
  
    const endGame = () => {
      clearInterval(timer);
      alert(`You won! Time: ${timeElapsed}s`);
    };
  
    const resetGame = () => {
      clearInterval(timer);
      timeElapsed = 0;
      timerDisplay.textContent = `Time: 0s`;
      flippedCards = [];
      matches = 0;
      createBoard();
    };
  
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
  });
