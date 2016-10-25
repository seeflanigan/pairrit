'use strict';

// import our express application
const app = require('./lib/app');

// assign a server port
const serverPort = function () {
  return process.env.HTTP_PORT || 1337;
}();

// set up a listener to serve the application
const server = app.listen(serverPort, function () {
  console.log('App listening on port %s', server.address().port );
});

module.exports = server;

