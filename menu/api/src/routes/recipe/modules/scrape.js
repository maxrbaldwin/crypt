// https://github.com/mozilla/readability
const DOM = require('jsdom').JSDOM;
const Read = require('readability');
const { parse: urlParse } = require('url');

module.exports.scrapeRecipe = article => {
  const doc = new DOM(article);
  const scrapedContent = new Read(doc.window.document).parse();
  const { content, title, excerpt, byline } = scrapedContent;
  return {
    html: content,
    title,
    excerpt,
    byline,
  }
};