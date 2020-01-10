const Router = require('express').Router();
const { parse: parseUrl } = require('url');
const { log } = require('@logging');
const { serverError } = require('@utils/responses');

// log all requests
Router.use((req, res, next) => {
  const level = 'req';
  const { pathname, search } = parseUrl(req.url);
  const message = `route: ${pathname} : query: ${search}`;
  log(level, message);
  next();
});

// API routes
Router.use(require('@routes/auth'));
Router.use('/api/v1/scrape/recipe', require('@routes/recipe'));
Router.use('/api/v1/grocery-list', require('@routes/grocery-list'));
Router.use('/api/v1/p', require('@routes/profile'));
// Home route
Router.use('/', require('@routes/home'));

// middleware to handle 404s
Router.use((req, res, next) => {
  if (res.locals.error) {
    next();
  }
  res.status(404).send('Route does not exist');
});

// log uncaught errors
Router.use(function (err, req, res, next) {
  if (res.locals.error) {
    res.status(400).json({ error: res.locals.error });
  }
  console.log(err);
  res.status(500).json({ error: serverError.code })
})

module.exports = Router;
