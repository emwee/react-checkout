import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSelectedTimeslot, getSelectedVariants, getSubtotalPrice, getBookingFee,
	getTotalPrice } from '../reducers/selection'
import Summary from '../components/summary/'

const SummaryContainer = (props) => {
	const { selectedDate, hasTimeslots, selectedTimeslot, selectedVariants,
		subtotalPrice, bookingFee, totalPrice } = props
	return (
		<Summary
			hasTimeslots={hasTimeslots}
			selectedDate={selectedDate}
			selectedTimeslot={selectedTimeslot}
			selectedVariants={selectedVariants}
			subtotalPrice={subtotalPrice}
			bookingFee={bookingFee}
			totalPrice={totalPrice}
		/>
	)
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
		selectedDate: state.selection.selectedDate,
		selectedTimeslot: getSelectedTimeslot(state),
		selectedVariants: getSelectedVariants(state),
		subtotalPrice: getSubtotalPrice(state),
		bookingFee: getBookingFee(state),
		totalPrice: getTotalPrice(state),
	}
}

SummaryContainer.propTypes = {
	hasTimeslots: PropTypes.bool,
	selectedDate: PropTypes.string,
	selectedTimeslot: PropTypes.object,
	selectedVariants: PropTypes.array,
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	totalPrice: PropTypes.number,
}

export default connect(
	mapStateToProps
)(SummaryContainer)
