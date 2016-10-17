const express = require('express');
const app = express();
const router = require('./lib/index');

var serverPort = function () {
  return process.env.HTTP_PORT || 1337;
}();

app.get('/', router);

const server = app.listen(serverPort, function () {
  console.log('App listening on port %s', server.address().port );
});

module.exports = server;
