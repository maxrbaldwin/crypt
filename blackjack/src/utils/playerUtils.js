const shortid = require('shortid');

const playerCount = 2;

class Player {
  constructor() {
    this.hand = [];
    this.getHandTotal = () => this.hand.reduce(card => {

    }, 0);
  }
}

class Dealer extends Player {
  constructor() {
    super();
    this.getUpCard = () => this.hand[0].type === 'a' ? 'a' : this.hand[0].value;
  } 
}

const makePlayers = () => {
  const players = {};
  for (var i = 0; i < playerCount; i++) {
    const key = shortid.generate();
    players[key] = new Player();
  }
  return players;
}

module.exports = {
  makePlayers,
  Dealer,
}