import React, { Component } from 'react'
import SummaryContainer from './summary'
import CheckoutForm from '../components/checkout_form'
import Datepicker from './datepicker'
import Variants from './variants'
import Timeslots from './timeslots'

require('../css/checkout.css')

export default class App extends Component {
	render() {
		return (
			<div className="checkout-app">
				<CheckoutForm>
					<Datepicker />
					<Timeslots />
					<Variants />
				</CheckoutForm>
				<SummaryContainer />
			</div>
		)
	}
}