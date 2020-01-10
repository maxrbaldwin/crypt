// register module aliases from package.json
require('module-alias/register');

const app = require('@app');
const server = require('http').Server();

const PORT = process.env.PORT || 3000;

const createApplication = function () {
  server.on('request', app);
};

const startServer = function () {
  server.listen(PORT, function () {
    console.log(`[App] Server started on port ${PORT}`);
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