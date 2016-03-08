import React, { Component } from 'react'
import { formatPrice } from '../viewhelpers'

require('../css/order_summary.css')

class OrderSummaryVariant extends Component {
	render() {
		const { qty, variant } = this.props
		const subtotal = qty * variant.price
		return (
			<div>
				<p>{variant.title} ({variant.id}) x {qty} {formatPrice(variant.price)} = {formatPrice(subtotal)}</p>
			</div>
		)
	}
}

class OrderSummary extends Component {
	getSelectedDate(date) {
		if (!date) {
			return <p>no date selected</p>
		}

		return <p>selected date: {date}</p>
	}
	getSelectedTimeslot(timeslot_id) {
		if (!timeslot_id) {
			return <p>no timeslot selected</p>
		}

		return <p>selected timeslot: {timeslot_id} ({this.props.entities.timeslots[timeslot_id].timeslot})</p>
	}
	getSelectedVariants(selected_variants, quantity_by_variant_id) {
		if (!selected_variants.length) {
			return <p>no variants selected</p>
		}

		return selected_variants.map(variant_id => {
			return <OrderSummaryVariant key={variant_id}
				qty={quantity_by_variant_id[variant_id]}
				variant={ this.props.entities.variants[variant_id]} />
		})
	}
	getTotalPrice(quantity_by_variant_id) {

		let total_price = 0

		for (let row in quantity_by_variant_id) {
			total_price += this.props.entities.variants[row].price * quantity_by_variant_id[row]
		}

		if (total_price) {
			return <p>total price: {formatPrice(total_price)}</p>
		}
	}
	getCustomerDetails(customer) {
		console.log('getCustomerDetails', customer)
		let nodes = []

		for (let field_name in customer) {
			if (customer[field_name]) {
				nodes.push(<p key={field_name}>{customer[field_name]}</p>)
			}
		}
		return nodes
	}
	render() {
		const { selected_date, selected_timeslot, selected_variants,
			quantity_by_variant_id, has_timeslots, customer } = this.props
		const timeslots_node = has_timeslots ? this.getSelectedTimeslot(selected_timeslot) : null

		return (
			<div className="order-summary">
				{this.getSelectedDate(selected_date) }
				{timeslots_node}
				{this.getSelectedVariants(selected_variants, quantity_by_variant_id) }
				{this.getTotalPrice(quantity_by_variant_id) }
				{this.getCustomerDetails(customer) }
			</div>
		)
	}
}

export default OrderSummary