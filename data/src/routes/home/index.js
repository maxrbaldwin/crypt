const Router = require('express').Router();

Router.get('/', (req, res) => {
  res.status(200).send('ok!');
});

module.exports = Router;