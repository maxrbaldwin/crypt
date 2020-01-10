const Router = require('express').Router();

// // begin
// // x teams
// // play each other x times

// const teams = 5;
// const stridePerWeek = 1;
// const stridePerSeason = 3;
// const weeks = teams * timesPlayed;

// // phase 1: organize
// // phase 2: play season
// // phase 3: end


Router.post('/', (req, res) => {
  console.log('body', req.body)
  res.status(200).json({ message: 'schedule something' });
});

module.exports = Router;