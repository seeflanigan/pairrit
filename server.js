const express = require('express');
const app = express();
const router = require('./lib/index');

const serverPort = function () {
  return process.env.HTTP_PORT || 1337;
}();

app.get('/', router);

const server =  app.listen(serverPort, function () {
  console.log('App listening on port ' + serverPort);
});

if(process.env.NODE_ENV == 'test') {
  // export the app in the test environment,
  // so we can setup and teardown local servers
  module.exports = server;
}
