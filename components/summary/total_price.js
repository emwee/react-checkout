import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

const SummaryTotalPrice = (props) => {
	const { subtotalPrice, bookingFee, totalPrice } = props
	return (
		<div>
			{ subtotalPrice > 0 && <p className="subtotal">{ formatPrice(subtotalPrice) }</p> }
			{ bookingFee > 0 && <p className="booking_fee">{ formatPrice(bookingFee) }</p> }
			{ bookingFee > 0 && totalPrice > 0 && <p className="total_price">{ formatPrice(totalPrice) }</p> }
		</div>
	)
}

SummaryTotalPrice.propTypes = {
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	totalPrice: PropTypes.number,
}

export default SummaryTotalPrice
