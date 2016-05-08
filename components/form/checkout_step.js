import React, { PropTypes } from 'react'
import classNames from 'classnames'

const CheckoutStep = (props) => {
	const { title, index, active, onClick } = props
	return (
		<div
			className={classNames('checkout-step', { 'checkout-step--active': active })}
			onClick={onClick}
		>
			{index + 1}: {title}
		</div>
	)
}

CheckoutStep.propTypes = {
	index: PropTypes.number,
	title: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
}

export default CheckoutStep
