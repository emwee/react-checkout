import React, { PropTypes } from 'react'

require('../../css/checkout_steps.css')

const CheckoutSteps = (props) =>
	<div className="checkout-steps">
		{props.children}
	</div>

CheckoutSteps.propTypes = {
	children: PropTypes.array,
}

export default CheckoutSteps
