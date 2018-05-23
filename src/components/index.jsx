import React from 'react';
import ReactDOM from 'react-dom';

require('../style/index.css');

class Quotes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='col-sm-4'>
				<div className="card">
					<div className="card-header">
						Bank
					</div>
					<div className="card-body">
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								You Pay
							</div>
							<div className='card-value col-xs-6'>
								N378,000
							</div>
						</div>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Recipient Recieves
							</div>
							<div className='card-value col-xs-6'>
								$1,000
							</div>
						</div>
						<p id='quote-details'>Details</p>
						<hr className='transferEstimates-hr'/>

						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Send Amount
							</div>
							<div className='card-value col-xs-6'>
								N360,000
							</div>
						</div>

						<hr className='transferEstimates-hr'/>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Fees
							</div>
							<div className='card-value col-xs-6'>
								N18,000
							</div>
						</div>

						<hr className='transferEstimates-hr'/>
						<div className='row card-body-row'>
							<div className='card-label col-xs-6'>
								Total
							</div>
							<div className='card-value col-xs-6'>
								N378,000
							</div>
						</div>

					</div>
				</div>
			</div>
		)
	}
}

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
		this.setState({
			quotesVisible: true
		});
	}

	render() {
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
				<div className='quotes-row row justify-content-center'>
					<Quotes />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<TransferEstimates />,
	document.getElementById('root')
);