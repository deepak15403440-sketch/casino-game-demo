# Casino Game Demo - Blackjack

A web-based Blackjack casino game demo built with React. This is a **free-to-play demo** featuring virtual chips only - no real money or gambling involved.

## Features

✨ **Game Features:**
- Classic Blackjack gameplay
- Virtual chip betting system ($1,000 starting balance)
- Realistic dealer AI (hits on 16, stands on 17)
- Blackjack detection (21 with 2 cards - pays 1.5x bet)
- Bust detection for both player and dealer
- Tie/Push detection
- Dynamic card deck management
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/deepak15403440-sketch/casino-game-demo.git
cd casino-game-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## How to Play

1. **Place Your Bet**: Enter an amount or click a chip button ($10, $25, $50, $100)
2. **Deal**: Click "Deal" to start the game
3. **Play Your Hand**:
   - **Hit**: Take another card
   - **Stand**: Keep your current hand
4. **Dealer Plays**: The dealer automatically plays according to blackjack rules
5. **Result**: Win, lose, or tie - then play again!

## Game Rules

- **Objective**: Get closer to 21 than the dealer without going over
- **Card Values**:
  - Ace = 1 or 11
  - Face cards (J, Q, K) = 10
  - Number cards = face value
- **Blackjack**: 21 with first two cards (pays 1.5x your bet)
- **Bust**: Going over 21 means you lose immediately
- **Dealer Rules**:
  - Must hit on 16 or less
  - Must stand on 17 or more
- **Winning Conditions**:
  - Player's hand > Dealer's hand (without busting) = Player wins
  - Dealer busts, player doesn't = Player wins
  - Same hand value = Push (tie) - get your bet back
  - Player busts = Dealer wins
  - Dealer's hand > Player's = Dealer wins

## Project Structure

```
casino-game-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Card.js          # Individual card component
│   │   └── Hand.js          # Player/Dealer hand display
│   ├── utils/
│   │   └── deck.js          # Card and deck utilities
│   ├── App.js               # Main game logic
│   ├── App.css              # App-specific styles
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── package.json
└── README.md
```

## File Descriptions

### `src/utils/deck.js`
Contains utility functions for card management:
- `createDeck()` - Creates and shuffles a standard 52-card deck
- `shuffleDeck()` - Fisher-Yates shuffle algorithm
- `getCardValue()` - Returns numerical value of a card
- `calculateHandValue()` - Calculates total hand value accounting for aces
- `isBlackjack()` - Checks for natural blackjack
- `isBust()` - Checks if hand value exceeds 21
- `getCardColor()` - Returns card color (red/black) for display

### `src/components/Card.js`
Displays individual playing cards with:
- Rank (A, 2-10, J, Q, K)
- Suit (♠, ♥, ♦, ♣)
- Color-coded display (red/black)
- Hidden card option (for dealer's hidden card)

### `src/components/Hand.js`
Displays a collection of cards with:
- Player or dealer hand title
- Card display with animations
- Hand value calculation

### `src/App.js`
Core game logic including:
- Game state management
- Betting system
- Dealing and hitting logic
- Dealer AI
- Win/loss determination
- Game flow control

## Customization

### Adjust Starting Balance
In `src/App.js`, line 9:
```javascript
const INITIAL_BALANCE = 1000; // Change this value
```

### Change Card Appearance
Edit `src/index.css` to modify:
- Card size (`.card` width/height)
- Card colors and styles
- Card animations

### Modify Game Rules
In `src/utils/deck.js` and `src/App.js`:
- `dealerTurn()` function controls dealer behavior
- `calculateHandValue()` handles ace logic

## Future Enhancements

🎯 Possible additions:
- Multiple player hands (split feature)
- Insurance bet option
- Game statistics and history
- Different casino games (Roulette, Poker, Slots)
- Sound effects and animations
- Multiplayer support
- Game save/load functionality
- Leaderboard system

## Technologies Used

- **React 18** - UI framework
- **JavaScript ES6+** - Game logic
- **CSS3** - Styling and animations
- **HTML5** - Structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Disclaimer

This is a **demo game with virtual chips only**. It is for educational and entertainment purposes only. No real money is involved, and no gambling occurs. This is not affiliated with any real casino.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Playing! 🎰**
