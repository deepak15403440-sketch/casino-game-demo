import React from 'react';
import Card from './Card';
import { calculateHandValue } from '../utils/deck';

const Hand = ({ cards, title, showValue = true, hideFirst = false }) => {
  return (
    <div className="hand-section">
      <div className="section-title">{title}</div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card key={index} card={card} hidden={hideFirst && index === 0} />
        ))}
      </div>
      {showValue && cards.length > 0 && (
        <div className="hand-value">Hand Value: {calculateHandValue(cards)}</div>
      )}
    </div>
  );
};

export default Hand;
