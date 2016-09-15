var express = require('express');

var app = express();

app.get('/join', function (req, res) {
  res.status(200).send('ok');
});
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Pairrit is listening at port %s', port);

});

module.exports = server;
