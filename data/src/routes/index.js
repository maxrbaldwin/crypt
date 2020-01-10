const Router = require('express').Router();

Router.use('/scrape/rss', require('@routes/rss'));
Router.use('/', require('@routes/home'));
// middleware to handle 404s
Router.use((req, res) => {
  res.status(404).send('Route does not exist');
});

module.exports = Router;
