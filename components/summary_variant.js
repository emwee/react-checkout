import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../viewhelpers'

require('../css/order_summary.css')

class SummaryVariantRow extends Component {
	render() {
		const { title, price, quantity } = this.props
		return (
			<div>
				<p> {quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>
			</div>
		)
	}
}

export default SummaryVariantRow