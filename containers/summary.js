import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as selectionReducer from '../reducers/selection'
import SummaryDate from '../components/summary/date'
import SummaryTimeslots from '../components/summary/timeslots'
import SummaryVariants from '../components/summary/variants'
import SummaryPrice from '../components/summary/price'
import CouponForm from '../components/form/coupon_form'

const SummaryContainer = (props) => {
	const {
		selectedDate,
		hasTimeslots, selectedTimeslot,
		selectedVariants,
		subtotalPrice, bookingFee, discount, totalPrice, checkcouponCode,
	} = props
	return (
		<div className="order-summary">
			<h3 className="order-summary__heading">Order summary</h3>
			<SummaryDate
				selectedDate={selectedDate}
			/>
			<SummaryTimeslots
				hasTimeslots={hasTimeslots}
				selectedTimeslot={selectedTimeslot}
			/>
			<SummaryVariants
				selectedVariants={selectedVariants}
			/>
			{totalPrice > 0 && <CouponForm
				checkcouponCode={checkcouponCode}
			/>}
			<SummaryPrice
				subtotalPrice={subtotalPrice}
				bookingFee={bookingFee}
				discount={discount}
				totalPrice={totalPrice}
			/>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
		selectedDate: state.selection.selectedDate,
		selectedTimeslot: selectionReducer.getSelectedTimeslot(state),
		selectedVariants: selectionReducer.getSelectedVariants(state),
		subtotalPrice: selectionReducer.getSubtotalPrice(state),
		bookingFee: selectionReducer.getBookingFee(state),
		discount: selectionReducer.getDiscount(state),
		totalPrice: selectionReducer.getTotalPrice(state),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		checkcouponCode: (couponCode) => {
			dispatch(actions.checkcouponCode(couponCode))
		},
	}
}

SummaryContainer.propTypes = {
	hasTimeslots: PropTypes.bool,
	selectedDate: PropTypes.string,
	selectedTimeslot: PropTypes.object,
	selectedVariants: PropTypes.array,
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	discount: PropTypes.number,
	totalPrice: PropTypes.number,
	checkcouponCode: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SummaryContainer)
