const Router = require('express').Router();

Router.use('/schedule', require('@routes/scheduler'));

module.exports = Router;