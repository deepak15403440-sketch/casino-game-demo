import React, { useState } from 'react';
import Blackjack from './games/Blackjack';
import Roulette from './games/Roulette';
import Slots from './games/Slots';
import Dice from './games/Dice';
import './App.css';

const App = () => {
  const [currentGame, setCurrentGame] = useState('blackjack');
  const [balance, setBalance] = useState(1000);

  const updateBalance = (amount) => {
    setBalance(prev => Math.max(0, prev + amount));
  };

  const resetBalance = () => {
    setBalance(1000);
  };

  const games = [
    { id: 'blackjack', name: '♠️ Blackjack', icon: '♠️' },
    { id: 'roulette', name: '🎡 Roulette', icon: '🎡' },
    { id: 'slots', name: '🎰 Slots', icon: '🎰' },
    { id: 'dice', name: '🎲 Craps', icon: '🎲' },
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'blackjack':
        return <Blackjack balance={balance} updateBalance={updateBalance} />;
      case 'roulette':
        return <Roulette balance={balance} updateBalance={updateBalance} />;
      case 'slots':
        return <Slots balance={balance} updateBalance={updateBalance} />;
      case 'dice':
        return <Dice balance={balance} updateBalance={updateBalance} />;
      default:
        return <Blackjack balance={balance} updateBalance={updateBalance} />;
    }
  };

  return (
    <div className="casino-app">
      <div className="casino-container">
        <h1 className="casino-title">🏨 MEGA CASINO DEMO 🏨</h1>
        
        <div className="balance-section">
          <div className="balance-display">
            💰 <strong>Balance:</strong> ${balance}
          </div>
          <button className="btn-reset" onClick={resetBalance}>
            Reset Balance
          </button>
        </div>

        <div className="game-selector">
          <h2>Select a Game</h2>
          <div className="game-buttons">
            {games.map((game) => (
              <button
                key={game.id}
                className={`game-btn ${currentGame === game.id ? 'active' : ''}`}
                onClick={() => setCurrentGame(game.id)}
              >
                {game.name}
              </button>
            ))}
          </div>
        </div>

        <div className="game-area">
          {renderGame()}
        </div>

        <div className="footer">
          <p>⚠️ Demo Only - Virtual Chips Only - No Real Money Gambling</p>
        </div>
      </div>
    </div>
  );
};

export default App;
