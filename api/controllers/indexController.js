const express = require('express');
const LunoService = require('../services/lunoService.js');
const GdaxService = require('../services/gdaxService.js');

const router = express.Router();

router.get('/', function (req, res) {
	return Promise.all([
		LunoService.getBitcoinTicker(),
		GdaxService.getBitcoinTicker()
	]).then(results => {
		let lunoTicker = results[0];
		let gdaxTicker = results[1];

		let BTC_NGN_PRICE = lunoTicker.ask;
		let BTC_USD_PRICE = gdaxTicker.bid;

		console.log(BTC_NGN_PRICE, BTC_USD_PRICE);

		return res.render('index', {
			title: 'Transfer Estimates',
			BTC_NGN_PRICE,
			BTC_USD_PRICE
		});
	});
})

module.exports = router