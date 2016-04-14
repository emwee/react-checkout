import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

export default class SummaryTotalPrice extends Component {
	render() {
		const { subtotalPrice, bookingFee, totalPrice } = this.props
		return (
			<div>
				{ subtotalPrice > 0 && <p>{ formatPrice(subtotalPrice) }</p> }
				{ bookingFee > 0 && <p>{ formatPrice(bookingFee) }</p> }
				{ bookingFee > 0 && totalPrice > 0 && <p>{ formatPrice(totalPrice) }</p> }
			</div>
		)
	}
}

SummaryTotalPrice.propTypes = {
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	totalPrice: PropTypes.number,
}
