import React, { useState } from 'react';

const Roulette = ({ balance, updateBalance }) => {
  const [bet, setBet] = useState(0);
  const [betType, setBetType] = useState('number');
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Place your bet');
  const [betInput, setBetInput] = useState('');

  const numbers = Array.from({ length: 37 }, (_, i) => i);
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

  const placeBet = (amount, type, number = null) => {
    if (amount > 0 && amount <= balance && !spinning) {
      setBet(amount);
      setBetType(type);
      if (number !== null) {
        setSelectedNumber(number);
      }
      setMessage(`Bet placed: $${amount} on ${type}${number !== null ? ` ${number}` : ''}`);
      setResult(null);
    }
  };

  const spin = () => {
    if (bet === 0 || spinning) return;

    setSpinning(true);
    setMessage('Spinning...');

    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      const isRed = redNumbers.includes(winningNumber);
      const isBlack = blackNumbers.includes(winningNumber);
      const isEven = winningNumber % 2 === 0 && winningNumber !== 0;
      const isOdd = winningNumber % 2 === 1;

      let won = false;
      let winAmount = 0;

      if (betType === 'number' && selectedNumber === winningNumber) {
        won = true;
        winAmount = bet * 35;
      } else if (betType === 'red' && isRed) {
        won = true;
        winAmount = bet;
      } else if (betType === 'black' && isBlack) {
        won = true;
        winAmount = bet;
      } else if (betType === 'even' && isEven) {
        won = true;
        winAmount = bet;
      } else if (betType === 'odd' && isOdd) {
        won = true;
        winAmount = bet;
      }

      const resultMessage = won
        ? `🎉 Won $${winAmount}! Number was ${winningNumber}`
        : `😢 Lost! Winning number was ${winningNumber}`;

      setMessage(resultMessage);
      setResult(won ? 'win' : 'loss');
      updateBalance(won ? winAmount : -bet);
      setSpinning(false);
      setBet(0);
    }, 3000);
  };

  return (
    <div className="game-board">
      <div className="game-title">🎡 ROULETTE 🎡</div>

      <div className="roulette-wheel">
        <div className={`wheel ${spinning ? 'spinning' : ''}`}>
          <div className="wheel-center">SPIN</div>
        </div>
      </div>

      {message && (
        <div className={`game-status ${result}`}>
          {message}
        </div>
      )}

      <div className="betting-section">
        <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Bet Type:</h3>

        <div className="chip-buttons" style={{ marginBottom: '20px' }}>
          <button
            className="chip-btn"
            onClick={() => setBetType('red')}
            style={{
              background: betType === 'red' ? '#e74c3c' : 'rgba(231, 76, 60, 0.3)',
              borderColor: '#e74c3c',
              color: '#e74c3c',
            }}
          >
            RED
          </button>
          <button
            className="chip-btn"
            onClick={() => setBetType('black')}
            style={{
              background: betType === 'black' ? '#000' : 'rgba(0, 0, 0, 0.3)',
              borderColor: '#aaa',
              color: betType === 'black' ? '#ffd700' : '#aaa',
            }}
          >
            BLACK
          </button>
          <button
            className="chip-btn"
            onClick={() => setBetType('even')}
            style={{
              background: betType === 'even' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(76, 175, 80, 0.3)',
              borderColor: '#4caf50',
              color: '#4caf50',
            }}
          >
            EVEN
          </button>
          <button
            className="chip-btn"
            onClick={() => setBetType('odd')}
            style={{
              background: betType === 'odd' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(76, 175, 80, 0.3)',
              borderColor: '#4caf50',
              color: '#4caf50',
            }}
          >
            ODD
          </button>
        </div>

        {betType === 'number' && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '10px' }}>Select Number (0-36):</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '5px',
                maxWidth: '400px',
              }}
            >
              {numbers.map((num) => (
                <button
                  key={num}
                  className="chip-btn"
                  onClick={() => setSelectedNumber(num)}
                  style={{
                    background:
                      selectedNumber === num ? '#ffd700' : 'rgba(255, 215, 0, 0.2)',
                    color: selectedNumber === num ? '#000' : '#ffd700',
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

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
            onClick={() => placeBet(10, betType, betType === 'number' ? selectedNumber : null)}
            disabled={balance < 10 || spinning}
          >
            $10
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(25, betType, betType === 'number' ? selectedNumber : null)}
            disabled={balance < 25 || spinning}
          >
            $25
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(50, betType, betType === 'number' ? selectedNumber : null)}
            disabled={balance < 50 || spinning}
          >
            $50
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(100, betType, betType === 'number' ? selectedNumber : null)}
            disabled={balance < 100 || spinning}
          >
            $100
          </button>
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
    </div>
  );
};

export default Roulette;