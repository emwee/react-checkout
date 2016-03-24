import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../viewhelpers'

export class SummaryVariants extends Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

export class SummaryVariant extends Component {
	render() {
		console.log('SummaryVariant.render', this.props)
		const { title, price, quantity, disabled } = this.props

		if (quantity === 0) {
			return <p>..</p>
		}

		return (
			<div>
				<p> {quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>
			</div>
		)
	}
}