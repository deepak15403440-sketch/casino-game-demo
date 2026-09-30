import React, { useState } from 'react';

const Slots = ({ balance, updateBalance }) => {
  const [bet, setBet] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(['🍎', '🍎', '🍎']);
  const [message, setMessage] = useState('Place your bet and spin!');
  const [result, setResult] = useState(null);
  const [betInput, setBetInput] = useState('');

  const symbols = ['🍎', '🍊', '🍋', '🍌', '🍇', '7️⃣', '💎', '⭐'];

  const placeBet = (amount) => {
    if (amount > 0 && amount <= balance && !spinning) {
      setBet(amount);
      setBetInput(amount.toString());
      setMessage('Ready to spin!');
    }
  };

  const spin = () => {
    if (bet === 0 || spinning) return;

    setSpinning(true);
    setMessage('Spinning...');
    setResult(null);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);
      spinCount++;

      if (spinCount >= 10) {
        clearInterval(spinInterval);

        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);

        let winAmount = 0;
        let resultMessage = '';

        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          if (finalReels[0] === '7️⃣') {
            winAmount = bet * 50;
            resultMessage = `🎉🎉🎉 JACKPOT!!! Three 7s! Won $${winAmount}!`;
            setResult('win');
          } else if (finalReels[0] === '💎') {
            winAmount = bet * 30;
            resultMessage = `🎉 Triple Diamonds! Won $${winAmount}!`;
            setResult('win');
          } else if (finalReels[0] === '⭐') {
            winAmount = bet * 25;
            resultMessage = `🎉 Triple Stars! Won $${winAmount}!`;
            setResult('win');
          } else {
            winAmount = bet * 10;
            resultMessage = `🎉 Three in a row! Won $${winAmount}!`;
            setResult('win');
          }
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
          winAmount = bet * 2;
          resultMessage = `😊 Pair! Won $${winAmount}!`;
          setResult('win');
        } else {
          resultMessage = `😢 No match! Try again!`;
          setResult('loss');
        }

        setMessage(resultMessage);
        updateBalance(winAmount > 0 ? winAmount : -bet);
        setSpinning(false);
        setBet(0);
        setBetInput('');
      }
    }, 100);
  };

  return (
    <div className="game-board">
      <div className="game-title">🎰 SLOT MACHINE 🎰</div>

      <div className="slot-machine">
        {reels.map((symbol, index) => (
          <div key={index} className={`slot-reel ${spinning ? 'spinning' : ''}`}>
            {symbol}
          </div>
        ))}
      </div>

      {message && (
        <div className={`game-status ${result}`}>
          {message}
        </div>
      )}

      <div className="betting-section">
        <div className="bet-input-group">
          <label>Bet Amount:</label>
          <input
            type="number"
            value={betInput}
            onChange={(e) => setBetInput(e.target.value)}
            placeholder="Enter amount"
            min="1"
            max={balance}
            disabled={balance <= 0 || spinning}
          />
        </div>

        <div className="chip-buttons">
          <button
            className="chip-btn"
            onClick={() => placeBet(10)}
            disabled={balance < 10 || spinning}
          >
            $10
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(25)}
            disabled={balance < 25 || spinning}
          >
            $25
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(50)}
            disabled={balance < 50 || spinning}
          >
            $50
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(100)}
            disabled={balance < 100 || spinning}
          >
            $100
          </button>
          {betInput && (
            <button
              className="chip-btn"
              onClick={() => placeBet(parseInt(betInput))}
              disabled={balance <= 0 || spinning}
            >
              Enter
            </button>
          )}
        </div>
      </div>

      <div className="buttons-group">
        <button
          className="btn-primary"
          onClick={spin}
          disabled={bet === 0 || spinning || balance <= 0}
        >
          {spinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>

      <div className="rules">
        <h3>Slot Machine Payouts</h3>
        <ul>
          <li>🍎🍎🍎 Pair or three of a kind fruits = 10x bet</li>
          <li>7️⃣7️⃣7️⃣ Three Sevens = 50x bet (JACKPOT!)</li>
          <li>💎💎💎 Three Diamonds = 30x bet</li>
          <li>⭐⭐⭐ Three Stars = 25x bet</li>
          <li>Any Pair = 2x bet</li>
          <li>No match = Lose bet</li>
        </ul>
      </div>
    </div>
  );
};

export default Slots;