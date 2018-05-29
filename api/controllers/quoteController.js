const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'transferEstimates';

let transferEstimatesDatabase;

// Use connect method to connect to the server
MongoClient.connect(DB_URL, function(err, client) {
	if (err) {
		console.error('Failed to connect to database');
		throw err;
	}
	console.log("Successfully connected  to database...");

	transferEstimatesDatabase = client.db(DB_NAME);
});


router.post('/', function (req, res) {
	let quote = req.body;

	const collection = transferEstimatesDatabase.collection('quotes');

	collection.insert(quote, function(err, result) {
		if (err) {
			console.error(err);
			return res.sendStatus(500);
		}

		return res.sendStatus(201)
	});
});

module.exports = router