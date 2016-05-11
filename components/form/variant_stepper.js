import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { formatPrice } from '../../helpers/viewhelpers'

export class VariantStepper extends Component {
	constructor() {
		super()
		this.stepDown = this.stepDown.bind(this)
		this.stepUp = this.stepUp.bind(this)
	}
	stepDown() {
		const { quantity } = this.props
		this.updateStepper(quantity - 1)
	}
	stepUp() {
		const { quantity } = this.props
		this.updateStepper(quantity + 1)
	}
	updateStepper(updatedQuantity) {
		const { id, selectVariant } = this.props
		selectVariant(id, updatedQuantity)
	}
	render() {
		const { title, price, quantity, maxBookable, disabled } = this.props
		const btnMinusEnabled = quantity === 0
		const btnPlusEnabled = quantity === maxBookable
		return (
			<div className={classNames('variant', { 'variant--disabled': disabled })} >
				<p className="variant__title">{title}</p>
				<p className="variant__price">{formatPrice(price)}</p>
				<div className="variant__quantity-selector stepper">
					<button
						className="stepper__btn"
						disabled={btnMinusEnabled}
						onClick={this.stepDown}
					>
						<span>-</span>
					</button>
					<input className="stepper__field" type="text" disabled value={quantity} />
					<button
						className="stepper__btn"
						disabled={btnPlusEnabled}
						onClick={this.stepUp}
					>
						<span>+</span>
					</button>
				</div>
			</div>
		)
	}
}

VariantStepper.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	price: PropTypes.number,
	quantity: PropTypes.number,
	disabled: PropTypes.bool,
	maxBookable: PropTypes.number,
	selectVariant: PropTypes.func,
}
