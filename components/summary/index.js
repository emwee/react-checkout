import React, { PropTypes } from 'react'
import { formatDate, formatPrice } from '../../viewhelpers'

const Summary = (props) => {
	const { selectedDate, hasTimeslots, selectedTimeslot, selectedVariants,
		subtotalPrice, bookingFee, totalPrice } = props
	return (
		<div className="order-summary">
			<h3 className="order-summary__heading">Order summary</h3>
			{!selectedDate && <p>no date selected</p>}
			{selectedDate && <p>{formatDate(selectedDate, 'LLLL')}</p>}
			{hasTimeslots && !selectedTimeslot && <p>no timeslot selected</p>}
			{hasTimeslots && selectedTimeslot && <p>{selectedTimeslot.timeslot}</p>}
			{selectedVariants.map(variant => {
				const { id, title, quantity, price } = variant
				return (
					<div key={id}>
						{quantity > 0 &&
							<p>{quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>}
					</div>
				)
			})}
			<div>
				{subtotalPrice > 0 && <p className="subtotal">{formatPrice(subtotalPrice)}</p>}
				{bookingFee > 0 && <p className="booking_fee">{formatPrice(bookingFee)}</p>}
				{bookingFee > 0 && totalPrice > 0 &&
					<p className="total_price">{formatPrice(totalPrice)}</p>}
	</div>
		</div>
	)
}

Summary.propTypes = {
	selectedDate: PropTypes.string,
	hasTimeslots: PropTypes.bool,
	selectedTimeslot: PropTypes.shape({
		timeslot: PropTypes.string,
	}),
	selectedVariants: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			price: PropTypes.number,
			quantity: PropTypes.number,
		})
	),
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	totalPrice: PropTypes.number,
}

export default Summary
