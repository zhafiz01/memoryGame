document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.grid-container');
    const startBtn = document.querySelector('.start-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const timerDisplay = document.querySelector('.timer');
  
    const cardValues = [
      'Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin',
      'HarryPotter', 'JennyWeasley', 'RonWeasley', 'HermioneGranger',
      'Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin',
      'HarryPotter', 'JennyWeasley', 'RonWeasley', 'HermioneGranger'
    ];
  
    let cards = [];
    let flippedCards = [];
    let matches = 0;
    let timer = null;
    let timeElapsed = 0;
  
    
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  
    //Function to create the game board
    const createBoard = () => {
      board.innerHTML = ''; 
      const shuffledValues = shuffleArray(cardValues);
      //Loops through the shuffled values and creates each card element
      //by adding card class and setting the card value
      shuffledValues.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        //creates the front and back of the card
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<img src="assets/CardHP.png" alt="Card Back">`; //placeholder for back of the card
  
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<img src="assets/${value}.png" alt="${value}">`;// Displays cards as an image
  
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
  
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
      });
  
      cards = document.querySelectorAll('.card'); // Quereies the cards after they are created
    };
  

    const flipCard = (card) => {
      if (card.classList.contains('flipped') || flippedCards.length === 2) return;
  
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
  
