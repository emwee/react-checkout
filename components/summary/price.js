import React, { PropTypes } from 'react'
import { formatPrice } from '../../helpers/viewhelpers'

const SummaryPrice = (props) => {
	const { subtotalPrice, bookingFee, discount, totalPrice } = props
	return (
		<div>
			{subtotalPrice > 0 && <p className="subtotal">{formatPrice(subtotalPrice)}</p>}
			{bookingFee > 0 && <p className="booking_fee">{formatPrice(bookingFee)}</p>}
			{discount > 0 &&
				<p className="subtotal-pre-discount">
					subtotal (pre-discount): {formatPrice(subtotalPrice + bookingFee)}
				</p>
			}
			{discount > 0 && <p className="discount">discount: - {formatPrice(discount)}</p>}
			{bookingFee > 0 && totalPrice > 0 &&
				<p className="total_price">{formatPrice(totalPrice)}</p>}
		</div>
	)
}

SummaryPrice.propTypes = {
	subtotalPrice: PropTypes.number,
	bookingFee: PropTypes.number,
	discount: PropTypes.number,
	totalPrice: PropTypes.number,
}

export default SummaryPrice
