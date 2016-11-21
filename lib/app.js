const bodyParser = require('body-parser');
const express    = require('express');
const router     = require('./router');
// router doesn't really route, it just dispatches
// to commands
// const dispatcher = require('./dispatcher')

const app        = express();

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/', router);

module.exports = app;
