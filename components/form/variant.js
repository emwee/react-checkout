import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { formatPrice } from '../../helpers/viewhelpers'

export class Variant extends Component {
	constructor() {
		super()
		this.onChangeVariant = this.onChangeVariant.bind(this)
	}
	onChangeVariant() {
		const { id, selectVariant } = this.props
		const node = ReactDOM.findDOMNode(this.refs.quantity_selector)
		const quantity = parseInt(node.value, 10)
		selectVariant(id, quantity)
	}
	renderOptions(max) {
		const nodes = []
		for (let i = 0; i < max; i++) {
			nodes.push(<option key={i} value={i}>{i}</option>)
		}
		return nodes
	}
	render() {
		const { title, price, quantity, disabled } = this.props
		return (
			<div className={classNames('variant', { 'variant--disabled': disabled })}>
				<p className="variant__title">{title}</p>
				<p className="variant__price">{formatPrice(price)}</p>
				<select
					className="variant__quantity-selector"
					ref="quantity_selector"
					disabled={disabled}
					value={quantity}
					onChange={this.onChangeVariant}
				>
					{this.renderOptions(10)}
				</select>
			</div>
		)
	}
}

Variant.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	price: PropTypes.number,
	quantity: PropTypes.number,
	disabled: PropTypes.bool,
	selectVariant: PropTypes.func,
}
