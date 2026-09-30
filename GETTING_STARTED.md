# 🎰 MEGA CASINO DEMO - Complete Setup & Run Guide

A professional multi-game casino demo application built with React. Play **Blackjack, Roulette, Slots, and Craps** with virtual chips!

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/deepak15403440-sketch/casino-game-demo.git
cd casino-game-demo
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### Step 3: Start the Development Server

```bash
npm start
```

The app will automatically open in your browser at **http://localhost:3000**

### Step 4: Play!

- 💰 You start with **$1,000** in virtual chips
- 🎮 Click game buttons to switch between games
- 💵 Place bets and play
- 🔄 Click **"Reset Balance"** to restart with $1,000 anytime

---

## 📋 System Requirements

Before you start, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Check if you have them installed:

```bash
node --version
npm --version
git --version
```

All should show version numbers (not "command not found").

---

## 🎮 How to Play Each Game

### ♠️ BLACKJACK

**Goal:** Get a hand value closer to 21 than the dealer without going over.

**How to Play:**
1. Enter a bet amount and click **"Deal"**
2. You get 2 cards, dealer gets 1 visible card
3. Click **"Hit"** to take another card
4. Click **"Stand"** to finish your hand
5. Dealer plays automatically
6. Highest hand (without busting) wins!

**Payouts:**
- **Blackjack** (21 on 2 cards) = **1.5x bet**
- **Win** = **1x bet**
- **Bust** = **Lose bet**
- **Push** (tie) = **Get bet back**

---

### 🎡 ROULETTE

**Goal:** Predict where the ball lands on the roulette wheel.

**How to Play:**
1. Select bet type: **Red**, **Black**, **Even**, **Odd**, or **Specific Number**
2. Enter bet amount and click **"SPIN"**
3. Wheel spins for 3 seconds
4. Win if your prediction matches the result!

**Payouts:**
- **Number Bet** (0-36) = **35x bet** 💰 (Jackpot!)
- **Red/Black/Even/Odd** = **1x bet**

---

### 🎰 SLOTS

**Goal:** Match symbols on 3 spinning reels.

**How to Play:**
1. Enter bet amount
2. Click **"SPIN"** to spin the 3 reels
3. Machine spins automatically
4. Match symbols to win!

**Payouts:**
- **7️⃣7️⃣7️⃣ Three Sevens** = **50x bet** 🎉 (JACKPOT!)
- **💎💎💎 Three Diamonds** = **30x bet**
- **⭐⭐⭐ Three Stars** = **25x bet**
- **Any matching fruit** = **10x bet**
- **Any pair** = **2x bet**
- **No match** = **Lose bet**

---

### 🎲 CRAPS (Dice)

**Goal:** Predict the dice roll outcome.

**How to Play:**
1. Pick your prediction:
   - **Higher Than 7** - Total is 8, 9, 10, 11, or 12
   - **Lower Than 7** - Total is 2, 3, 4, 5, or 6
   - **Exactly 7** - Total is exactly 7
   - **Snake Eyes** - Both dice show 1 (1+1)
   - **Boxcars** - Both dice show 6 (6+6)
2. Enter bet amount
3. Click **"ROLL"** to roll the dice
4. Win if prediction matches!

**Payouts:**
- **Higher/Lower Than 7** = **1x bet**
- **Exactly 7** = **4x bet** ✨
- **Snake Eyes** = **30x bet** 🎉 (Ultra Rare!)
- **Boxcars** = **30x bet** 🎉 (Ultra Rare!)

---

## 💰 Betting Tips

1. **Quick Bet Buttons:** Click $10, $25, $50, or $100 for instant betting
2. **Custom Bets:** Type any amount in the input box and click "Enter"
3. **Balance Check:** Your current balance is always visible at the top
4. **Game Switch:** Balance carries over when you switch games
5. **Reset Anytime:** Click "Reset Balance" to restart with $1,000

---

## 🎯 Game Features

### 🎮 Game Selector
- 4 buttons at the top to switch between games instantly
- Your balance is **shared** across all games
- Current game is **highlighted in gold**

### 💵 Betting System
- Virtual chips only (no real money)
- Can't bet more than your balance
- Bets are disabled when you run out of chips
- Win/loss updates instantly

### 📊 Real-Time Balance
- Displays current balance at all times
- Updates after every game
- Negative bets appear when you lose
- Positive bets appear when you win

### 🎨 Visual Feedback
- **Green box** = You won! 🎉
- **Red box** = You lost 😢
- **Yellow box** = Push/tie 🤝
- Animations for spinning wheels, rolling dice, and card deals

---

## ⚙️ Troubleshooting

### "npm is not recognized" or "node is not recognized"
**Solution:** Node.js is not installed properly.
- [Download Node.js](https://nodejs.org/)
- Restart your computer after installing
- Run `node --version` to verify

### Port 3000 already in use
**Solution:** Another app is using port 3000.
```bash
# On Windows:
netstat -ano | findstr :3000

# On Mac/Linux:
lsof -i :3000

# Kill the process and try again
npm start
```

### Blank page or errors in browser
**Solution:** Check browser console (F12) for errors. Try:
```bash
npm install
npm start
```

### Balance not saving when switching games
**This is normal!** Balance is stored in memory. Refresh resets to $1,000. If you want persistent balance, you'd need a database (future enhancement).

---

## 📱 Mobile Play

The app is fully responsive! You can:
- 📱 Open on your phone/tablet
- 🎮 Use touch controls
- 📊 See all game information
- 💰 Place bets and play

Just make sure your computer is on the same network, then use:
```
http://[YOUR_COMPUTER_IP]:3000
```

(Find your computer's IP with `ipconfig` on Windows or `ifconfig` on Mac/Linux)

---

## 🔧 Customization

### Change Starting Balance

Open `src/App.js` and find line 11:
```javascript
const [balance, setBalance] = useState(1000);
```

Change `1000` to any amount you want:
```javascript
const [balance, setBalance] = useState(5000); // Start with $5,000
```

### Change Game Rules

**Blackjack:** Edit `src/games/Blackjack.js`
**Roulette:** Edit `src/games/Roulette.js`
**Slots:** Edit `src/games/Slots.js`
**Dice:** Edit `src/games/Dice.js`

### Customize Colors

Edit `src/App.css` to change:
- Gold (#ffd700) color
- Card styles
- Button colors
- Background gradients

---

## 📁 Project Files Explained

```
src/
├── App.js                    # Main hub with game selector & balance
├── App.css                   # All styling (responsive design)
├── index.js                  # React entry point
├── index.css                 # Global styles
│
├── games/                    # Individual game components
│   ├── Blackjack.js         # Card game logic
│   ├── Roulette.js          # Spinning wheel logic
│   ├── Slots.js             # Slot machine logic
│   └── Dice.js              # Dice rolling logic
│
├── components/              # Reusable components
│   ├── Card.js              # Display individual cards
│   └── Hand.js              # Display player/dealer hand
│
└── utils/                   # Helper functions
    └── deck.js              # Card deck utilities
```

---

## 🎓 Learning Resources

**If you want to understand the code:**

- [React Docs](https://react.dev/) - Official React documentation
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - MDN Web Docs
- [CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling reference

**To make changes:**
1. Edit files in `src/`
2. Save the file
3. Browser auto-refreshes with changes
4. Check browser console (F12) for errors

---

## 🚀 Next Steps

1. ✅ Run the app with `npm start`
2. 🎮 Try all 4 games
3. 💰 Test betting mechanics
4. 🎨 Customize colors/balance/rules
5. 🏗️ Add new games or features
6. 📤 Deploy to production (Netlify, Vercel, GitHub Pages)

---

## 📞 Support

**Having issues?** Try:
1. Check browser console for errors (F12)
2. Delete `node_modules/` and run `npm install` again
3. Make sure Node.js and npm are up to date
4. Restart your computer
5. Check [GitHub Issues](https://github.com/deepak15403440-sketch/casino-game-demo/issues)

---

## ⚠️ Disclaimer

This is a **DEMO APPLICATION** with **VIRTUAL CHIPS ONLY**.
- ❌ No real money involved
- ❌ Not affiliated with real casinos
- ❌ For educational/entertainment purposes only
- ✅ Safe to play with friends and family

---

## 🎉 Have Fun!

You now have a fully functional casino demo with 4 games!

**Start playing:** `npm start` 🚀

Happy gaming! 🎰🎲🎯
