import React, { Component } from 'react'
import SummaryContainer from './summary'
import CheckoutForm from './checkout_form'

require('../css/checkout.css')

export default class App extends Component {
	render() {
		return (
			<div className="checkout-app">
				<CheckoutForm />
				<SummaryContainer />
			</div>
		)
	}
}
