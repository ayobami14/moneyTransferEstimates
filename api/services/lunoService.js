const rp = require('request-promise');

const LUNO_API = 'https://api.mybitx.com/api/1';

module.exports = {
	getBitcoinTicker: function() {
		let options = {
			uri: `${LUNO_API}/ticker`,
			qs: {
				pair: 'XBTNGN'
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
};