import React, { Component } from 'react'
import classNames from 'classnames'
import { formatPrice } from '../viewhelpers'

require('../css/variants.css')

class Variant extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			max_bookable_exceeded: false
		}
	}
	handleChange(e) {
		console.log('handleChange')
		const { id, onSelectVariant } = this.props
		const qty = parseInt(e.target.value, 10)

		onSelectVariant(id, qty)
	}
	getSubtotal(price, num_selected) {
		let subtotal_node = null
		if (num_selected) {
			subtotal_node = <span>{formatPrice(num_selected * price)}</span>
		}
		return subtotal_node
	}
	getOptions(max_tickets, num_selected) {
		const num_tickets_options = []

		for (let i=0; i<=max_tickets; i++) {
			num_tickets_options.push(
				<option key={i} value={i}>{i}</option>
			)
		}

		return num_tickets_options
	}
	render() {
		console.log('Variant.render', this)
		const { title, price, num_tickets, max_bookable, num_selected, disabled } = this.props
		const max_tickets = max_bookable || num_tickets
		const css_class = classNames('variant', {'variant--disabled': disabled })

		return (
			<div className={css_class}>
				<p>{title} {formatPrice(price)}</p>
				<select disabled={disabled} value={num_selected || 0} onChange={this.handleChange}>
					{this.getOptions(max_tickets, num_selected)}
				</select>
				<p>{this.getSubtotal(price, num_selected)}</p>
			</div>
		)
	}
}

class Variants extends Component {
	getTotalSelected(quantity_by_variant_id) {
		let total_selected = 0

		for (let variant_id in quantity_by_variant_id) {
			total_selected += quantity_by_variant_id[variant_id]
		}

		return total_selected
	}
	showMaxBookable(max_bookable, quantity_by_variant_id) {
		const total_selected = this.getTotalSelected(quantity_by_variant_id)
		if (!max_bookable) {
			return
		}

		if (total_selected < max_bookable) {
			return <p>Note: you can order up to {max_bookable} tickets.</p>
		} else if (total_selected > max_bookable) {
			return <p>Note: you have selected more tickets ({total_selected}) than allowed ({max_bookable})</p>
		} else {
			return <p>Note: you have reached the maximum amount you can book ({max_bookable})</p>
		}
	}
	render() {
		console.log('Variants.render', this)
		const { variants, disabled, quantity_by_variant_id, max_bookable, onSelectVariant } = this.props
		return (
			<div className="variants">
				{variants.map(variant => {
					console.log('variant', variant)
					return <Variant
						key={variant.id}
						num_selected={quantity_by_variant_id[variant.id]}
						disabled={disabled}
						quantity_by_variant_id={quantity_by_variant_id}
						max_bookable={max_bookable}
						onSelectVariant={onSelectVariant}
						{...variant} />
				})}
				{this.showMaxBookable(max_bookable, quantity_by_variant_id) }
			</div>
		)
	}
}

export default Variants