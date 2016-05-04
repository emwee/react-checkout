import React, { Component } from 'react'
import { connect } from 'react-redux'
import SummaryContainer from './summary'
import DatepickerContainer from './datepicker'
import VariantsContainer from './variants'
import TimeslotsContainer from './timeslots'
import ActionBarContainer from './action_bar'
import ConsumerForm from '../components/form/consumer'
import { bookingDetailsCompleted } from '../reducers'

require('../css/checkout.css')

class App extends Component {
	render() {
		const { hasTimeslots, bookingDetailsCompleted } = this.props
		return (
			<div className="checkout-app">
				<div className="checkout-form">
					<div className="checkout-form__booking-details">
						<div className="checkout-form__when">
							<DatepickerContainer />
							{ hasTimeslots && <TimeslotsContainer />}
						</div>
						<div className="checkout-form__what">
							<VariantsContainer />
						</div>
					</div>
					<div className="checkout-personal-details">
						<div className="checkout-form__who">
							{ bookingDetailsCompleted && <ConsumerForm />}
						</div>
					</div>
					<ActionBarContainer />
				</div>
				<SummaryContainer />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
		bookingDetailsCompleted: bookingDetailsCompleted(state),
	}
}

App.propTypes = {
	hasTimeslots: React.PropTypes.bool,
}

export default connect(
	mapStateToProps
)(App)