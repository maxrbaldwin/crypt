require('module-alias/register');

const makeShoe = require('@utils/deckUtils');
const { makePlayers, Dealer } = require('@utils/playerUtils');
const getBasicStrategy = require('@utils/basicStrat');

// flag for when the end card comes up while playing hands
let end = false; 

const gameState = {
  shoe: makeShoe(),
  players: makePlayers(),
  dealer: new Dealer(),
  handsPlayed: [],
};

const dealCards = () => {
  const toDealTo = [
    ...Object.keys(gameState.players),
    gameState.dealer,
    ...Object.keys(gameState.players),
    gameState.dealer,
  ];

  toDealTo.forEach(player => {
    const nextCard = gameState.shoe.getNextCard();
    if (gameState.players[player]) {
      gameState.players[player].hand.push(nextCard);
    } else {
      gameState.dealer.hand.push(nextCard)
    }
  })
}

const playHands = () => {
  Object.values(gameState.players).forEach(player => {
    const playHand = hand => {
      const playSplit = () => {
      }
      const allOtherHands = () => {
        const total = player.getHandTotal();
        const upCard = gameState.dealer.getUpCard();
        const strat = getBasicStrategy(total, upCard);
      }
      const firstHand = () => {
        const card1 = hand[0];
        const card2 = hand[1];
        const getStratKey = () => {
          // if same card
          if (card1.type === card2.type) {
            return `${card1.type},${card2.type}`;
          // if first card is ace
          } else if (card1.type === 'a') {
            return `${card1.type},${card2.type}`;
          // if second card is ace
          } else if (card2.type === 'a') {
            `${card2.type},${card1.type}`;
          }
          // else return cards total
          return card1.value + card2.value;  
        }
        const upCard = gameState.dealer.getUpCard();
        const strat = getBasicStrategy(getStratKey(), upCard);
        
        if (strat === 'hit') {
          playHand(hand);
        } else if (strat === 'double') {
          playHand(hand);
        } else if (strat === 'split') {
          playHand(hand);
        } else if (strat === 'stand') {
          // stand
        }
      }
      // split
      if (Array.isArray(hand[0])) {
        playSplit(hand);
      }
      else if (hand.length > 2) {
        allOtherHands(hand);
      } else {
        firstHand(hand);
      }
    }
    playHand(player.hand);
  });
}

const playDealer = () => {

}

const endHand = () => {

}
// deal
// each player
// dealer
// resolve
// while (!end) {
//   dealCards();
//   playHands();
//   playDealer();
//   endHand();
// }

dealCards()
playHands();