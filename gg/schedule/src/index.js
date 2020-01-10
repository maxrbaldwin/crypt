// register module aliases from package.json
require('module-alias/register');

const app = require('@app');
// const { log } = require('@logging');
const server = require('http').Server();

const PORT = process.env.PORT || 3003;

const createApplication = function () {
  server.on('request', app);
};

const startServer = function () {
  const level = 'app';
  const message = `Server started on port ${PORT}`;
  server.listen(PORT, function () {
    // log(level, message);
    console.log(message);
  });
};
// start app
Promise
  .resolve()
  .then(createApplication)
  .then(startServer)
  .catch(err => {
    console.error(err.stack);
    process.kill(1);
  });

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})