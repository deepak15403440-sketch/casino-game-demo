import React from 'react';
import { getCardColor } from '../utils/deck';

const Card = ({ card, hidden = false }) => {
  if (hidden) {
    return <div className="card hidden">🎴</div>;
  }

  const color = getCardColor(card);
  return (
    <div className={`card ${color}`}>
      <div>{card.rank}</div>
      <div>{card.suit}</div>
    </div>
  );
};

export default Card;
