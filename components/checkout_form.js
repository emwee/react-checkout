import React, { Component, PropTypes } from 'react'

export default class CheckoutForm extends Component {
	render() {
		return (
			<div className="checkout-form">
				{ this.props.children }
			</div>
		)
	}
}