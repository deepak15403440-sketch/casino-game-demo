import React, { useState } from 'react';

const Dice = ({ balance, updateBalance }) => {
  const [bet, setBet] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);
  const [dice, setDice] = useState([1, 1]);
  const [predictedResult, setPredictedResult] = useState('higher');
  const [message, setMessage] = useState('Pick your prediction and place your bet!');
  const [result, setResult] = useState(null);
  const [betInput, setBetInput] = useState('');

  const placeBet = (amount, prediction) => {
    if (amount > 0 && amount <= balance && !diceRolling) {
      setBet(amount);
      setPredictedResult(prediction);
      setBetInput(amount.toString());
      setMessage(`Bet placed: $${amount} on ${prediction}`);
    }
  };

  const rollDice = () => {
    if (bet === 0 || diceRolling) return;

    setDiceRolling(true);
    setMessage('Rolling...');
    setResult(null);

    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const newDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
      setDice(newDice);
      rollCount++;

      if (rollCount >= 15) {
        clearInterval(rollInterval);

        const finalDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        setDice(finalDice);

        const total = finalDice[0] + finalDice[1];
        let won = false;
        let winAmount = 0;
        let resultMessage = '';

        if (predictedResult === 'higher' && total > 7) {
          won = true;
          winAmount = bet;
          resultMessage = `🎉 Higher! (${total}) You Won $${winAmount}!`;
        } else if (predictedResult === 'lower' && total < 7) {
          won = true;
          winAmount = bet;
          resultMessage = `🎉 Lower! (${total}) You Won $${winAmount}!`;
        } else if (predictedResult === 'seven' && total === 7) {
          won = true;
          winAmount = bet * 4;
          resultMessage = `🎉 LUCKY SEVEN! You Won $${winAmount}!`;
        } else if (predictedResult === 'snake' && finalDice[0] === 1 && finalDice[1] === 1) {
          won = true;
          winAmount = bet * 30;
          resultMessage = `🎉🎉🎉 SNAKE EYES! You Won $${winAmount}!`;
        } else if (predictedResult === 'boxcars' && finalDice[0] === 6 && finalDice[1] === 6) {
          won = true;
          winAmount = bet * 30;
          resultMessage = `🎉🎉🎉 BOXCARS! You Won $${winAmount}!`;
        } else {
          resultMessage = `😢 You Lost! Total was ${total}`;
        }

        setMessage(resultMessage);
        setResult(won ? 'win' : 'loss');
        updateBalance(won ? winAmount : -bet);
        setDiceRolling(false);
        setBet(0);
        setBetInput('');
      }
    }, 100);
  };

  const getDieValue = (diceValue) => {
    const dots = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return dots[diceValue];
  };

  return (
    <div className="game-board">
      <div className="game-title">🎲 CRAPS 🎲</div>

      <div
        style={{
          textAlign: 'center',
          fontSize: '2em',
          marginBottom: '20px',
          color: '#ffd700',
        }}
      >
        Total: <strong>{dice[0] + dice[1]}</strong>
      </div>

      <div className="dice-container">
        <div className="die">{getDieValue(dice[0])}</div>
        <div className="die">{getDieValue(dice[1])}</div>
      </div>

      {message && (
        <div className={`game-status ${result}`}>
          {message}
        </div>
      )}

      <div className="betting-section">
        <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Predictions:</h3>

        <div className="dice-options" style={{ marginBottom: '20px' }}>
          <button
            className={`dice-btn ${predictedResult === 'higher' ? 'active' : ''}`}
            onClick={() => setPredictedResult('higher')}
            disabled={diceRolling}
          >
            Higher Than 7 (2:1)
          </button>
          <button
            className={`dice-btn ${predictedResult === 'lower' ? 'active' : ''}`}
            onClick={() => setPredictedResult('lower')}
            disabled={diceRolling}
          >
            Lower Than 7 (2:1)
          </button>
          <button
            className={`dice-btn ${predictedResult === 'seven' ? 'active' : ''}`}
            onClick={() => setPredictedResult('seven')}
            disabled={diceRolling}
          >
            Exactly 7 (4:1)
          </button>
          <button
            className={`dice-btn ${predictedResult === 'snake' ? 'active' : ''}`}
            onClick={() => setPredictedResult('snake')}
            disabled={diceRolling}
          >
            Snake Eyes (30:1)
          </button>
          <button
            className={`dice-btn ${predictedResult === 'boxcars' ? 'active' : ''}`}
            onClick={() => setPredictedResult('boxcars')}
            disabled={diceRolling}
          >
            Boxcars (30:1)
          </button>
        </div>

        <div className="bet-input-group">
          <label>Bet Amount:</label>
          <input
            type="number"
            value={betInput}
            onChange={(e) => setBetInput(e.target.value)}
            placeholder="Enter amount"
            min="1"
            max={balance}
            disabled={balance <= 0 || diceRolling}
          />
        </div>

        <div className="chip-buttons">
          <button
            className="chip-btn"
            onClick={() => placeBet(10, predictedResult)}
            disabled={balance < 10 || diceRolling}
          >
            $10
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(25, predictedResult)}
            disabled={balance < 25 || diceRolling}
          >
            $25
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(50, predictedResult)}
            disabled={balance < 50 || diceRolling}
          >
            $50
          </button>
          <button
            className="chip-btn"
            onClick={() => placeBet(100, predictedResult)}
            disabled={balance < 100 || diceRolling}
          >
            $100
          </button>
          {betInput && (
            <button
              className="chip-btn"
              onClick={() => placeBet(parseInt(betInput), predictedResult)}
              disabled={balance <= 0 || diceRolling}
            >
              Enter
            </button>
          )}
        </div>
      </div>

      <div className="buttons-group">
        <button
          className="btn-primary"
          onClick={rollDice}
          disabled={bet === 0 || diceRolling || balance <= 0}
        >
          {diceRolling ? 'ROLLING...' : 'ROLL'}
        </button>
      </div>

      <div className="rules">
        <h3>Game Odds</h3>
        <ul>
          <li>Higher Than 7: Total is 8, 9, 10, 11, or 12 → Win 1x bet</li>
          <li>Lower Than 7: Total is 2, 3, 4, 5, or 6 → Win 1x bet</li>
          <li>Exactly 7: Total is 7 → Win 4x bet</li>
          <li>Snake Eyes: Both dice show 1 → Win 30x bet</li>
          <li>Boxcars: Both dice show 6 → Win 30x bet</li>
        </ul>
      </div>
    </div>
  );
};

export default Dice;