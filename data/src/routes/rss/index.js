const Router = require('express').Router();
const Parser = require('rss-parser');
const parseUrl = require('url').parse;
const { writeToStorage } = require('@utils/fileStorage');
const { logError, withErrorObject } = require('@logging');

const parser = new Parser();

Router.get('/today/senate', async (req, res) => {
  const url = 'https://www.congress.gov/rss/senate-floor-today.xml';
  try {
    const feed = await parser.parseURL(url);

    res.status(200).send(feed);
  } catch (err) {
    logError(withErrorObject('file upload error', err));
    res.status(500).send({ err: 'file upload error' });
  }
});

Router.get('/today/house', async (req, res) => {
  const url = 'https://www.congress.gov/rss/house-floor-today.xml';
  try {
    const feed = await parser.parseURL(url);
    res.status(200).send(feed);
  } catch (err) {
    logError(withErrorObject('file upload error', err));
    res.status(500).send({ err: 'file upload error' });
  }
});

Router.get('/weekly/most-viewed-bills', async (req, res) => {
  const url = 'https://www.congress.gov/rss/most-viewed-bills.xml';
  try {
    const gcpDir = 'most_viewed_bills';
    const feed = await parser.parseURL(url);
    await writeToStorage(feed, gcpDir);
    res.status(200).send(feed);
  } catch (err) {
    logError(withErrorObject('file upload error', err));
    res.status(500).send({ err: 'file upload error' });
  }
});

module.exports = Router;