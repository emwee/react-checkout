import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../viewhelpers'

export default class SummaryTotalPrice extends Component {
	render() {
		const { totalPrice } = this.props
		if (totalPrice > 0) {
			return <p>{ formatPrice(totalPrice) }</p>
		} else {
			return <p>...</p>
		}
	}
}