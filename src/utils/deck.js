/**
 * Deck utility functions for card games
 */

const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  // Shuffle deck
  return shuffleDeck(deck);
};

export const shuffleDeck = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const getCardValue = (card) => {
  if (card.rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(card.rank)) return 10;
  return parseInt(card.rank);
};

export const calculateHandValue = (hand) => {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    const value = getCardValue(card);
    if (card.rank === 'A') aces++;
    total += value;
  }

  // Adjust for aces if bust
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
};

export const isBlackjack = (hand) => {
  return hand.length === 2 && calculateHandValue(hand) === 21;
};

export const isBust = (hand) => {
  return calculateHandValue(hand) > 21;
};

export const getCardColor = (card) => {
  return ['♥', '♦'].includes(card.suit) ? 'red' : 'black';
};
