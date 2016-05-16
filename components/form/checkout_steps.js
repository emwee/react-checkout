import React, { PropTypes } from 'react'
import '../../css/checkout_steps.css'

const CheckoutSteps = (props) =>
	<div className="checkout-steps">
		{props.children}
	</div>

CheckoutSteps.propTypes = {
	children: PropTypes.array,
}

export default CheckoutSteps
