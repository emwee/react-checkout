import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CheckoutStepsContainer from './checkout_steps'
import SummaryContainer from './summary'
import DatepickerContainer from './datepicker'
import VariantsContainer from './variants'
import TimeslotsContainer from './timeslots'
import CustomerForm from '../components/form/customer'
import ActionBar from '../components/action_bar'
import * as actions from '../actions'

import '../css/checkout.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.submitCustomerForm = this.submitCustomerForm.bind(this)
	}
	submitCustomerForm() {
		this.refs.customerForm.submit()
	}
	renderBookingDetails() {
		const { hasTimeslots } = this.props
		return (
			<div className="checkout-form__booking-details">
				<div className="checkout-form__when">
					<DatepickerContainer />
					{hasTimeslots && <TimeslotsContainer />}
				</div>
				<div className="checkout-form__what">
					<VariantsContainer />
				</div>
			</div>
		)
	}
	renderCustomerDetails() {
		const { submitOrder } = this.props
		return (
			<div className="checkout-personal-details">
				<div className="checkout-form__who">
					<CustomerForm
						ref="customerForm"
						onSubmit={submitOrder}
					/>
				</div>
			</div>
		)
	}
	render() {
		const { activeStepIndex, goToPersonalDetails } = this.props
		return (
			<div className="checkout-app">
				<CheckoutStepsContainer />
				<div className="checkout-form-wrapper">
					<div className="checkout-form">
						{activeStepIndex === 0 && this.renderBookingDetails() }
						{activeStepIndex === 1 && this.renderCustomerDetails() }
						<ActionBar
							activeStepIndex={activeStepIndex}
							goToPersonalDetails={goToPersonalDetails}
							submitCustomerForm={this.submitCustomerForm}
						/>
					</div>
					<SummaryContainer />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
		activeStepIndex: state.selection.activeStepIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		submitOrder: () => dispatch(actions.submitOrder()),
		goToPersonalDetails: () => dispatch(actions.goToPersonalDetails()),
	}
}

App.propTypes = {
	hasTimeslots: PropTypes.bool,
	activeStepIndex: PropTypes.number,
	goToPersonalDetails: PropTypes.func,
	submitOrder: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
