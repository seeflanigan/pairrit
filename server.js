const express = require('express');
const app = express();
const router = require('./lib/index');

app.get('/', router);

app.listen(1337, function () {
	console.log('App listening on port 1337');
});