import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

const SummaryVariant = (props) => {
	const { title, price, quantity } = props
	return (
		<div>
			{quantity > 0 && <p>{quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>}
		</div>
	)
}

SummaryVariant.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	quantity: PropTypes.number,
}

export default SummaryVariant
