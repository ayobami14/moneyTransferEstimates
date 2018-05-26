const express = require('express');
const path = require('path');
const logger = require('morgan');
const IndexController = require('./api/controllers/indexController.js')

const app = express();

// View Engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/', IndexController)

var port = normalizePort(process.env.PORT || '80');
app.listen(port, () => console.log(`Transfer Estimates listening on port ${port}!`));

// TODO: Catch errors (404, 500). 'http-errors'

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}