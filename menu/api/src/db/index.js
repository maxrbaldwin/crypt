// https://node-postgres.com/guides/project-structure
const { Pool } = require('pg');
const { logError, log } = require('@logging');

// https://node-postgres.com/features/pooling
const pool = new Pool()

pool.on('error', (err, client) => {
  logError('db', err);
  process.exit(-1)
});

module.exports.insertRecipe = (data = {}) => {
  const { html, title, url, excerpt, byline } = data;
  const { href, path, hostname } = url;
  const selectQuery = {
    name: 'search-for-exisiting-recipe',
    text: 'SELECT * FROM recipes WHERE url = $1',
    values: [href],
  }
  const insertQuery = {
    name: 'insert-recipe',
    text: 'INSERT INTO recipes (html, title, excerpt, byline, url, path, hostname) VALUES($4, $5, $6, $7, $1, $3, $2) ON CONFLICT (url) DO NOTHING RETURNING *',
    values: [href, hostname, path, html, title, excerpt, byline],
  }

  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await pool.connect();
      const selectResponse = await client.query(selectQuery);
      const selected = selectResponse.rows && selectResponse.rows[0];
      if (selected) {
        log('db', `selected ${selected.url}`)
        return resolve(selected);
      }
    } catch(e) {
      return reject(e);
    }

    try {
      const insertResponse = await client.query(insertQuery);
      const inserted = insertResponse.rows[0];
      log('db', `inserted ${inserted.url}`);
      return resolve(inserted);
    } catch (e) {
      return reject(e);
    }
  });
}
// Help: https://hackernoon.com/how-to-query-jsonb-beginner-sheet-cheat-4da3aa5082a3
module.exports.fetchGithubUser = (data = {}) => {
  const { id } = data;
  const selectQuery = {
    name: 'search-for-exisiting-user',
    text: "SELECT * FROM public.users WHERE github_profile ->> 'id' = $1;",
    values: [id],
  }
  const insertQuery = {
    name: 'insert-recipe',
    text: 'INSERT INTO users (github_profile) VALUES($1) RETURNING *;',
    values: [data],
  }

  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await pool.connect();
      const selectResponse = await client.query(selectQuery);
      const selected = selectResponse.rows && selectResponse.rows[0];
      if (selected) {
        log('db', `selected ${selected.id}`)
        return resolve(selected);
      }
    } catch(e) {
      return reject(e);
    }

    try {
      const insertResponse = await client.query(insertQuery);
      const inserted = insertResponse.rows[0];
      log('db', `inserted ${inserted.id}`);
      return resolve(inserted);
    } catch (e) {
      return reject(e);
    }
  });
}

module.exports.fetchRecipesById = async id => {
  const selectQuery = {
    name: 'search-for-recipes-by-user',
    text: "SELECT * FROM public.recipes WHERE user_id = $1;",
    values: [id],
  }
  return new Promise(async (resolve, reject) => {
    try {
      client = await pool.connect();
      const selectResponse = await client.query(selectQuery);
      const selected = selectResponse.rows;
      if (selected) {
        log('db', `selected ${selected.length}`)
        return resolve(selected);
      }
    } catch(e) {
      return reject(e);
    }
  });
}

