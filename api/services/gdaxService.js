const rp = require('request-promise');

const GDAX_API = 'https://api.gdax.com';
const PRODUCT_TICKER_API = '/products/BTC-USD/ticker'

module.exports = {
	getBitcoinTicker: function() {
		let options = {
			uri: `${GDAX_API}${PRODUCT_TICKER_API}`,
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true
		};

		return rp(options)
			.then(function (ticker) {
				return ticker;
			})
			.catch(function (err) {
				console.error(err);
				throw err;
			});
	}
}