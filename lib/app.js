'use strict'

const bodyParser = require('body-parser');
const express    = require('express');
const router     = require('./router');

const app        = express();

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/', router);

module.exports = app;
