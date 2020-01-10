const Router = require('express').Router();
// @TODO return API docs
Router.get('/', (req, res) => {
  res.status(200).send('phone home');
});

module.exports = Router;