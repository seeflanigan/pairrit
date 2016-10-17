'use strict'

const bodyParser = require('body-parser');
const express    = require('express');
const app        = express();
const router     = require('./index');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())

app.get('/', router);

app.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.status(200).send('ok');
});

module.exports = app;
