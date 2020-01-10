const Router = require('express').Router();

Router.get('/user/:userId', (req, res) => {
  res.status(200).send('Phone home!');
});
// router.route(path) 
Router.get('/list/:listId', (req, res) => {
  res.status(200).send('Phone home!');
});

module.exports = Router;