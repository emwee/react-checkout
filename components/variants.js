import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { formatPrice } from '../viewhelpers'

require('../css/variants.css')

export class VariantItems extends Component {
	render() {
		return (
			<div>{this.props.children}</div>
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
		const node = ReactDOM.findDOMNode(this.refs.select)
		const quantity = parseInt(node.value, 10)
		onSelectVariant(id, quantity)
	}
	render() {
		const { title, price, quantity } = this.props
		const disabled = false
		return (
			<div className='variant'>
				<p>{title} {formatPrice(price)}</p>
				<select ref="select" disabled={disabled} value={quantity ? quantity : null} onChange={this.onChangeVariant}>
					{this.renderOptions(10)}
				</select>
			</div>
		)
	}
}