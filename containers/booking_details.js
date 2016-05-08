import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DatepickerContainer from './datepicker'
import VariantsContainer from './variants'
import TimeslotsContainer from './timeslots'

require('../css/checkout.css')

const BookingDetailsContainer = (props) => {
	const { hasTimeslots } = props
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

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
	}
}

BookingDetailsContainer.propTypes = {
	hasTimeslots: PropTypes.bool,
}

export default connect(
	mapStateToProps
)(BookingDetailsContainer)
