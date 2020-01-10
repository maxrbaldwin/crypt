// GET /api/v1/scrape/recipe

// modules
const Router = require('express').Router();
const { parse: urlParse } = require('url');
const request = require('request-promise').defaults({
  maxRedirects: 100
});
// middleware
const isLoggedIn = require('@middleware/isLoggedIn');
// utils
const { scrapeRecipe } = require('@routes/recipe/modules/scrape');
const { insertRecipe } = require('@db');
// logging
const { logError } = require('@logging');
const {
  invalidParameters,
  articleRequestFailed,
  insertRecipeFailed,
} = require('@utils/responses');
// cache
const { AddRecipeCache } = require('@cache');
const cache = new AddRecipeCache();

// Router.use(isLoggedIn);

// validate query params
Router.use((req, res, next) => {
  const { url } = req.query;
  if (!url) {
    res.locals.error = invalidParameters;
    next(invalidParameters.message);
  } else {
    next();
  }
});
// get url parts
Router.use((req, res, next) => {
  const { url } = req.query;
  const urlParts = urlParse(url);
  const { hostname, pathname } = urlParts;
  const getHref = ({protocol, hostname, pathname}) => `${protocol}//${hostname}${pathname}`;
  res.locals.url = { hostname, path: pathname, href: getHref(urlParts)  }
  next();
});
// validate url parameter is a url
Router.use((req, res, next) => {
  const { hostname } = res.locals.url;
  const isNotUrl = hostname === null;
  if (isNotUrl) {
    res.locals.error = invalidParameters;
    next(invalidParameters.message);
  } else {
    next();
  }
})
// check cache for article 
Router.use((req, res, next) => {
  const { href } = res.locals.url;
  const cachedEntry = cache.getFromCache(href);
  if (cachedEntry) {
    res.status(200).json(cachedEntry);
  } else {
    next();
  }
});
// request article
Router.use(async (req, res, next) => {
  const url = req.query.url;
  try {
    const html = await request(url);
    res.locals.article = html;
    next();
  } catch(e) {
    res.locals.error = articleRequestFailed;
    next(e);
  }
});
// scrape DOM
Router.use((req, res, next) => {
  const { article } = res.locals;
  const scrapeResults = scrapeRecipe(article);
  res.locals.scrapedContent = scrapeResults;
  next();
});
/* @todo: verify it is a recipe 
Router.use((req, res, next) => {});
*/
// insert article
Router.use(async (req, res, next) => {
  const { scrapedContent, url } = res.locals;
  try {
    const entry = { ...scrapedContent, url };
    const savedRecipe = await insertRecipe(entry);
    res.locals.savedContent = savedRecipe;
    next();
  } catch(e) {
    res.locals.error = insertRecipeFailed;
    next(e)
  }
});
// insert into cache
Router.use((req, res, next) => {
  const { href } = res.locals.url;
  const savedContent = res.locals.savedContent;
  if (savedContent) {
    cache.setInCache(href, savedContent);
  }
  next();
});
// respond 200
Router.get('/', (req, res, next) => {
  const { savedContent } = res.locals;
  res.status(200).json(savedContent);
});
// handle error
Router.use((err, req, res, next) => {
  const error = res.locals.error || err;
  logError('req error', err);
  res.status(500).json({ error });
});

module.exports = Router;