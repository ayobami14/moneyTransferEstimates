import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import request from 'superagent';

require('../style/index.css');

const USD_NGN_RATE = 363;
const BTC_USD_PRICE = window.transferEstimate.BTC_USD_PRICE;
const BTC_NGN_PRICE = window.transferEstimate.BTC_NGN_PRICE;

class Quotes extends React.PureComponent {
	render() {
		let cheapestBadge;

		if (this.props.isCheapest) {
			cheapestBadge = <div className='cheapest-badge bg-info'>Cheapest</div>;
		}

		return (
			<div className='col-sm-4 quote'>
				<div className="card">
					{cheapestBadge}
					<div className="card-header">
						{this.props.title}
					</div>
					<div className="card-body">
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								You Pay
							</div>
							<div className='card-value col-xs-6'>
								N{this.props.total}
							</div>
						</div>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Recipient Recieves
							</div>
							<div className='card-value col-xs-6'>
								${this.props.recieveAmount}
							</div>
						</div>
						<p id='quote-details'>Details</p>
						<hr className='transferEstimates-hr'/>

						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Send Amount
							</div>
							<div className='card-value col-xs-6'>
								N{this.props.sendAmount}
							</div>
						</div>

						<hr className='transferEstimates-hr'/>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Fees
							</div>
							<div className='card-value col-xs-6'>
								N{this.props.fees}
							</div>
						</div>

						<hr className='transferEstimates-hr'/>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Total
							</div>
							<div className='card-value col-xs-6'>
								N{this.props.total}
							</div>
						</div>

					</div>
				</div>
			</div>
		)
	}
}

Quotes.propTypes = {
	sendAmount: PropTypes.string.isRequired,
	recieveAmount: PropTypes.string.isRequired,
	fees: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	isCheapest: PropTypes.bool.isRequired,
};

class TransferEstimates extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recieveAmount: 1000,
			quotesVisible: false
		};

		this.onRecieveAmountChange = this.onRecieveAmountChange.bind(this);
		this.handleGetQuoteClick = this.handleGetQuoteClick.bind(this);
	}


	onRecieveAmountChange(evt) {
		evt.preventDefault();
		this.setState({
			recieveAmount: evt.target.value
		});
	}

	handleGetQuoteClick(evt) {
		evt.preventDefault();

		this.setQuotes();

		this.setState({
			quotesVisible: true
		});

		request
			.post('/api/quote')
			.send({
				recieveAmount: this.state.recieveAmount,
				bankQuote: this.bankQuote,
				digitalCurrencyQuote: this.digitalCurrencyQuote
			})
			.set('accept', 'json')
			.end();
	}

	calculateBankQuote() {
		let recieveAmount = this.state.recieveAmount;

		let bankFees = 50 * USD_NGN_RATE;
		let commission = 0.005 * recieveAmount;
		let vat = 0.05 * commission;

		let fees = bankFees + commission + vat;
		let total = recieveAmount * USD_NGN_RATE + fees;

		let sendAmount = recieveAmount * USD_NGN_RATE;

		sendAmount = sendAmount.toLocaleString("en-US");
		recieveAmount = recieveAmount.toLocaleString("en-US");
		fees = fees.toLocaleString("en-US");
		total = total.toLocaleString("en-US");

		return {
			sendAmount,
			recieveAmount,
			fees,
			total
		};
	}

	calculateDigitalCurrencyQuote() {
		let recieveAmount = this.state.recieveAmount;

		let BTC_TO_BUY = recieveAmount / BTC_USD_PRICE;
		let BTC_BUY_COST = BTC_TO_BUY * BTC_NGN_PRICE;

		let sendAmount = recieveAmount * USD_NGN_RATE;
		let fees = BTC_BUY_COST > sendAmount ? BTC_BUY_COST - sendAmount : 0;
		let total = sendAmount + fees;

		sendAmount = sendAmount.toLocaleString("en-US");
		recieveAmount = recieveAmount.toLocaleString("en-US");
		fees = fees.toLocaleString("en-US");
		total = total.toLocaleString("en-US");

		return {
			sendAmount,
			recieveAmount,
			fees,
			total
		};
	}

	setQuotes() {
		this.bankQuote = this.calculateBankQuote();
		this.digitalCurrencyQuote = this.calculateDigitalCurrencyQuote();

		this.bankQuote.isCheapest = this.bankQuote.total < this.digitalCurrencyQuote.total;
		this.digitalCurrencyQuote.isCheapest = this.digitalCurrencyQuote.total <= this.bankQuote.total;
	}


	render() {
		let quotes;

		if (this.state.quotesVisible) {
			quotes = (
				<div className='row justify-content-center'>
					<Quotes title='Bank' {...this.bankQuote}/>
					<Quotes title='Digital Currency' {...this.digitalCurrencyQuote}/>
				</div>
			);
		}

		return (
			<div id='transferEstimates' className='container-fluid'>
				<div className='row justify-content-center'>
					<div className="form-group center-text">
						<label htmlFor='countrySelect' className='labelText'>How Much Would You Like To Send?</label>
						<div id='recieveAmount' className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">$</span>
							</div>
							<input
								type="number"
								className="form-control"
								aria-label="Amount (to the nearest dollar)"
								value={this.state.recieveAmount}
								onChange={this.onRecieveAmountChange}
							/>
							<div className="input-group-append">
								<span className="input-group-text">.00</span>
							</div>
						</div>
					</div>
				</div>
				<div className='quote-actions row justify-content-center'>
					<button
						id='quote-btn'
						type="button"
						className="btn"
						onClick={this.handleGetQuoteClick}
					>
						Get Quote
					</button>
				</div>
				{quotes}
			</div>
		);
	}
}

ReactDOM.render(
	<TransferEstimates />,
	document.getElementById('root')
);