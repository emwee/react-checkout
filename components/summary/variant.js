import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

export class SummaryVariant extends Component {
	render() {
		const { title, price, quantity } = this.props
		return (quantity > 0 &&
			<div>
				<p>{quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>
			</div>
		)
	}
}

SummaryVariant.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	quantity: PropTypes.number,
}
