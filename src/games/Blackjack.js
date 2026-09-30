import React, { useState, useEffect } from 'react';
import Hand from '../components/Hand';
import { createDeck, calculateHandValue, isBlackjack, isBust } from '../utils/deck';

const Blackjack = ({ balance, updateBalance }) => {
  const [bet, setBet] = useState(0);
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('waiting');
  const [message, setMessage] = useState('Enter bet and click "Deal"');
  const [betInput, setBetInput] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
  }, []);

  useEffect(() => {
    if (deck.length < 20) {
      const newDeck = createDeck();
      setDeck(newDeck);
    }
  }, [deck]);

  const placeBet = (amount) => {
    if (amount > 0 && amount <= balance) {
      setBet(amount);
      setBetInput(amount.toString());
    }
  };

  const dealCards = () => {
    if (bet === 0 || gameStatus !== 'waiting') {
      setMessage('Please place a bet first');
      return;
    }

    const newDeck = [...deck];
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameStatus('playing');
    setResult(null);
    setMessage('Your turn - Hit or Stand?');

    if (isBlackjack(playerCards) && isBlackjack(dealerCards)) {
      endGame(playerCards, dealerCards, 'push', newDeck);
    } else if (isBlackjack(playerCards)) {
      endGame(playerCards, dealerCards, 'blackjack', newDeck);
    } else if (isBlackjack(dealerCards)) {
      endGame(playerCards, dealerCards, 'dealer-blackjack', newDeck);
    }
  };

  const hit = () => {
    if (gameStatus !== 'playing') return;

    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];

    setDeck(newDeck);
    setPlayerHand(newHand);

    if (isBust(newHand)) {
      endGame(newHand, dealerHand, 'bust', newDeck);
    }
  };

  const stand = () => {
    if (gameStatus !== 'playing') return;
    dealerTurn(playerHand, dealerHand);
  };

  const dealerTurn = (pHand, dHand) => {
    let newDeck = [...deck];
    let dealerCards = [...dHand];

    while (calculateHandValue(dealerCards) < 17) {
      dealerCards.push(newDeck.pop());
    }

    setDealerHand(dealerCards);
    setDeck(newDeck);

    if (isBust(dealerCards)) {
      endGame(pHand, dealerCards, 'dealer-bust', newDeck);
    } else {
      const playerValue = calculateHandValue(pHand);
      const dealerValue = calculateHandValue(dealerCards);

      if (playerValue > dealerValue) {
        endGame(pHand, dealerCards, 'win', newDeck);
      } else if (playerValue < dealerValue) {
        endGame(pHand, dealerCards, 'loss', newDeck);
      } else {
        endGame(pHand, dealerCards, 'push', newDeck);
      }
    }
  };

  const endGame = (pHand, dHand, status, newDeck) => {
    setGameStatus('finished');
    setDealerHand(dHand);

    let resultMessage = '';
    let winAmount = 0;

    switch (status) {
      case 'blackjack':
        resultMessage = '🎉 BLACKJACK! You Win!';
        winAmount = Math.floor(bet * 1.5);
        setResult('win');
        break;
      case 'dealer-blackjack':
        resultMessage = '😢 Dealer has Blackjack. You Lose!';
        winAmount = -bet;
        setResult('loss');
        break;
      case 'bust':
        resultMessage = '💥 BUST! You Lose!';
        winAmount = -bet;
        setResult('loss');
        break;
      case 'dealer-bust':
        resultMessage = '🎉 Dealer Bust! You Win!';
        winAmount = bet;
        setResult('win');
        break;
      case 'win':
        resultMessage = '🎉 You Win!';
        winAmount = bet;
        setResult('win');
        break;
      case 'loss':
        resultMessage = '😢 Dealer Wins!';
        winAmount = -bet;
        setResult('loss');
        break;
      case 'push':
        resultMessage = '🤝 Push - Tie!';
        setResult('push');
        break;
      default:
        break;
    }

    setMessage(resultMessage);
    updateBalance(winAmount);
  };

  const playAgain = () => {
    setGameStatus('waiting');
    setPlayerHand([]);
    setDealerHand([]);
    setBet(0);
    setBetInput('');
    setResult(null);
    setMessage('Enter bet and click "Deal"');
  };

  return (
    <div className="game-board">
      <div className="game-title">♠️ BLACKJACK ♠️</div>

      {dealerHand.length > 0 && (
        <div className="dealer-section">
          <Hand
            cards={dealerHand}
            title="Dealer's Hand"
            hideFirst={gameStatus === 'playing'}
            showValue={gameStatus !== 'playing' || dealerHand.length < 2}
          />
        </div>
      )}

      {playerHand.length > 0 && (
        <div className="player-section">
          <Hand cards={playerHand} title="Your Hand" showValue={true} />
        </div>
      )}

      {message && (
        <div className={`game-status ${result}`}>
          {message}
        </div>
      )}

      {gameStatus === 'waiting' && (
        <div className="betting-section">
          <div className="bet-input-group">
            <label>Enter Bet Amount:</label>
            <input
              type="number"
              value={betInput}
              onChange={(e) => setBetInput(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max={balance}
              disabled={balance <= 0}
            />
          </div>

          <div className="chip-buttons">
            <button className="chip-btn" onClick={() => placeBet(10)} disabled={balance < 10}>
              $10
            </button>
            <button className="chip-btn" onClick={() => placeBet(25)} disabled={balance < 25}>
              $25
            </button>
            <button className="chip-btn" onClick={() => placeBet(50)} disabled={balance < 50}>
              $50
            </button>
            <button className="chip-btn" onClick={() => placeBet(100)} disabled={balance < 100}>
              $100
            </button>
            {betInput && (
              <button className="chip-btn" onClick={() => placeBet(parseInt(betInput))} disabled={balance <= 0}>
                Enter
              </button>
            )}
          </div>
        </div>
      )}

      <div className="buttons-group">
        {gameStatus === 'waiting' && (
          <button
            className="btn-primary"
            onClick={dealCards}
            disabled={bet === 0 || balance <= 0}
          >
            Deal
          </button>
        )}

        {gameStatus === 'playing' && (
          <>
            <button className="btn-secondary" onClick={hit}>
              Hit
            </button>
            <button className="btn-primary" onClick={stand}>
              Stand
            </button>
          </>
        )}

        {gameStatus === 'finished' && (
          <button className="btn-primary" onClick={playAgain} disabled={balance <= 0}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Blackjack;