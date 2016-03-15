import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../viewhelpers'

export class SummaryVariants extends Component {
	render() {
		console.log('SummaryVariants.render', this.props)
		return <div>{this.props.children}</div>
	}
}

export class SummaryVariant extends Component {
	render() {
		console.log('SummaryVariant.render', this.props)
		const { title, price, quantity } = this.props
		return (
			<div>
				<p> {quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>
			</div>
		)
	}
}