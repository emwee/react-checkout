import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { formatPrice } from '../viewhelpers'

require('../css/variants.css')

export class VariantItems extends Component {
	render() {
		const { totalQuantity, maxBookable } = this.props
		const maxBookableExceeded = totalQuantity > maxBookable
		return (
			<div>
				<h3>Select your variants..</h3>
				{maxBookableExceeded && <p>you selected more tickets than the max bookable ({maxBookable}). please adjust.</p>}
				<div>{this.props.children}</div>
			</div>
		)
	}
}

export class VariantItem extends Component {
	constructor() {
		super()
		this.onChangeVariant = this.onChangeVariant.bind(this)
	}
	renderOptions(max) {
		const nodes = []
		for (let i=0; i<=max; i++) {
			nodes.push(<option key={i} value={i}>{i}</option>)
		}
		return nodes
	}
	onChangeVariant() {
		const { id, onSelectVariant } = this.props
		const node = ReactDOM.findDOMNode(this.refs.quantity_selector)
		const quantity = parseInt(node.value, 10)
		onSelectVariant(id, quantity)
	}
	render() {
		const { title, price, quantity, disabled } = this.props
		return (
			<div className={classNames('variant', { 'variant--disabled': disabled })}>
				<p className="variant__title">{title}</p>
				<p className="variant__price">{formatPrice(price)}</p>
				<select className="variant__quantity-selector" ref="quantity_selector" disabled={disabled}
					value={quantity ? quantity : null} onChange={this.onChangeVariant}>
					{this.renderOptions(10)}
				</select>
			</div>
		)
	}
}