'use strict'

const express = require('express');
const app     = express();
const router  = require('./index');

app.get('/', router);

app.post('/', function (req, res) {
  res.status(200).send('ok');
});

module.exports = app;
