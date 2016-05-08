import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CheckoutStepsContainer from './checkout_steps'
import SummaryContainer from './summary'
import BookingDetailsContainer from './booking_details'
import CustomerDetailsContainer from './customer_details'
import ActionBarContainer from './action_bar'

require('../css/checkout.css')

const App = (props) => {
	const { activeStepIndex } = props
	return (
		<div className="checkout-app">
			<CheckoutStepsContainer />
			<div className="checkout-form-wrapper">
				<div className="checkout-form">
					{activeStepIndex === 0 && <BookingDetailsContainer />}
					{activeStepIndex === 1 && <CustomerDetailsContainer />}
					<ActionBarContainer />
				</div>
				<SummaryContainer />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		activeStepIndex: state.selection.activeStepIndex,
	}
}

App.propTypes = {
	activeStepIndex: PropTypes.number,
}

export default connect(
	mapStateToProps
)(App)
