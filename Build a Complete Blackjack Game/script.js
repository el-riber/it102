// -----------------------------
// Game State
// -----------------------------
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

// DOM elements
const dealerCardsDiv = document.getElementById("dealer-cards");
const playerCardsDiv = document.getElementById("player-cards");
const dealerTotalSpan = document.getElementById("dealer-total");
const playerTotalSpan = document.getElementById("player-total");
const statusMessage = document.getElementById("status-message");

const dealBtn = document.getElementById("deal-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");

// Button events
dealBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", onHit);
standBtn.addEventListener("click", onStand);

// -----------------------------
// Deck creation / shuffle
// -----------------------------
function createDeck() {
  const suits = ["clubs", "diamonds", "hearts", "spades"];

  const ranks = [
    { label: "A", imageRank: "ace", value: 11 },
    { label: "2", imageRank: "2", value: 2 },
    { label: "3", imageRank: "3", value: 3 },
    { label: "4", imageRank: "4", value: 4 },
    { label: "5", imageRank: "5", value: 5 },
    { label: "6", imageRank: "6", value: 6 },
    { label: "7", imageRank: "7", value: 7 },
    { label: "8", imageRank: "8", value: 8 },
    { label: "9", imageRank: "9", value: 9 },
    { label: "10", imageRank: "10", value: 10 },
    { label: "J", imageRank: "jack", value: 10 },
    { label: "Q", imageRank: "queen", value: 10 },
    { label: "K", imageRank: "king", value: 10 }
  ];

  const newDeck = [];

  for (const suit of suits) {
    for (const r of ranks) {
      newDeck.push({
        label: r.label,       // "A", "2", ..., "K"
        imageRank: r.imageRank, // "ace", "2", ..., "king"
        value: r.value,
        suit: suit            // "clubs", ...
      });
    }
  }

  return newDeck;
}

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Draw a card from the deck
function drawCard() {
  if (deck.length === 0) {
    deck = createDeck();
    shuffle(deck);
  }
  return deck.pop();
}

// -----------------------------
// Hand value calculation
// -----------------------------
function getHandValue(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    total += card.value;
    if (card.label === "A") {
      aces++;
    }
  }

  // If total > 21, downgrade some Aces 11 -> 1
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// -----------------------------
// Rendering helpers
// -----------------------------
function suitSymbol(suit) {
  switch (suit) {
    case "hearts":   return "♥";
    case "diamonds": return "♦";
    case "clubs":    return "♣";
    case "spades":   return "♠";
    default:         return "";
  }
}

// returns "images/3_of_hearts.png", etc.
function getCardImagePath(card) {
  return `images/${card.imageRank}_of_${card.suit}.png`;
}

// creates a card DOM element, using PNG image
function createCardElement(card, faceDown = false) {
  const div = document.createElement("div");
  div.classList.add("card");

  const img = document.createElement("img");
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

  if (faceDown) {
    img.src = "images/back.png"; // card back image
    img.alt = "Hidden card";
  } else {
    img.src = getCardImagePath(card);
    img.alt = `${card.label} of ${card.suit}`;
  }

  // Optional text fallback if image fails
  img.onerror = () => {
    div.textContent = `${card.label}${suitSymbol(card.suit)}`;
  };

  div.appendChild(img);
  return div;
}

function renderHands(hideDealerSecondCard) {
  // Clear previous
  dealerCardsDiv.innerHTML = "";
  playerCardsDiv.innerHTML = "";

  // Dealer cards
  dealerHand.forEach((card, index) => {
    const faceDown = hideDealerSecondCard && index === 1;
    const cardEl = createCardElement(card, faceDown);
    dealerCardsDiv.appendChild(cardEl);
  });

  // Player cards
  playerHand.forEach(card => {
    const cardEl = createCardElement(card, false);
    playerCardsDiv.appendChild(cardEl);
  });

  // Totals
  if (hideDealerSecondCard) {
    dealerTotalSpan.textContent = "?";
  } else {
    dealerTotalSpan.textContent = getHandValue(dealerHand);
  }
  playerTotalSpan.textContent = getHandValue(playerHand);
}

// -----------------------------
// Game flow
// -----------------------------
function startGame() {
  deck = createDeck();
  shuffle(deck);

  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  gameOver = false;

  hitBtn.disabled = false;
  standBtn.disabled = false;

  statusMessage.textContent = "Game in progress. Hit or Stand.";

  // hide dealer's second card
  renderHands(true);

  const playerTotal = getHandValue(playerHand);
  const dealerTotal = getHandValue(dealerHand);

  // Check for immediate blackjack
  if (playerTotal === 21 || dealerTotal === 21) {
    finishRound();
  }
}

function onHit() {
  if (gameOver) return;

  playerHand.push(drawCard());
  renderHands(true);

  if (getHandValue(playerHand) > 21) {
    finishRound();
  }
}

function onStand() {
  if (gameOver) return;

  // Dealer draws until 17+
  while (getHandValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }

  finishRound();
}

function finishRound() {
  gameOver = true;
  hitBtn.disabled = true;
  standBtn.disabled = true;

  renderHands(false); // reveal dealer's second card

  const playerTotal = getHandValue(playerHand);
  const dealerTotal = getHandValue(dealerHand);
  let message = "";

  if (playerTotal > 21) {
    message = `You bust with ${playerTotal}. Dealer wins.`;
  } else if (dealerTotal > 21) {
    message = `Dealer busts with ${dealerTotal}. You win!`;
  } else if (playerTotal > dealerTotal) {
    message = `You win! ${playerTotal} vs ${dealerTotal}.`;
  } else if (dealerTotal > playerTotal) {
    message = `Dealer wins. ${dealerTotal} vs ${playerTotal}.`;
  } else {
    message = `Push! You both have ${playerTotal}.`;
  }

  statusMessage.textContent = message + " Click DEAL to play again.";
}
