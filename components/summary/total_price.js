import React, { Component, PropTypes } from 'react'
import { formatPrice } from '../../viewhelpers'

export default class SummaryTotalPrice extends Component {
	render() {
		const { totalPrice } = this.props
		return (totalPrice > 0 &&
			<p>{ formatPrice(totalPrice) }</p>
		)
	}
}