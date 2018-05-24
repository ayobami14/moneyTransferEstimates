const express = require('express');
const path = require('path');
const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const IndexController = require('./api/controllers/indexController.js')

const app = express();

const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

// View Engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/', IndexController)

app.listen(3000, () => console.log('Transfer Estimates listening on port 3000!'));

// TODO: Catch errors (404, 500). 'http-errors'