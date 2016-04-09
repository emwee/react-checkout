import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

export class SummaryVariants extends Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

export class SummaryVariant extends Component {
	render() {
		const { title, price, quantity, disabled } = this.props
		return (quantity > 0 &&
			<div>
				<p>{quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>
			</div>
		)
	}
}