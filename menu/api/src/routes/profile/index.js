const Router = require('express').Router();
const { fetchRecipesById } = require('@db');

Router.get('/:userId', async (req, res) => {
  const id = req.params.userId;
  const recipes = await fetchRecipesById(id);
  res.status(200).send({ recipes });
});

module.exports = Router;