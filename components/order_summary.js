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

		return <p>selected date: {date.toDateString()}</p>
	}
	getSelectedTimeslot(timeslot_id) {
		if (!timeslot_id) {
			return <p>no timeslot selected</p>
		}

		return <p>selected timeslot: {timeslot_id} ({this.props.entities.timeslots[timeslot_id].timeslot})</p>
	}
	getSelectedVariants(selected_variants, quantity_variants) {
		console.log('getSelectedVariants')
		const { entities } = this.props
		console.log(entities)

		if (!selected_variants.length) {
			return <p>no variants selected</p>
		}

		return selected_variants.map(variant_id => {
			return <OrderSummaryVariant key={variant_id}
				qty={quantity_variants[variant_id]}
				variant={entities.variants[variant_id]} />
		})
	}
	render() {
		const { selected_date, selected_timeslot, selected_variants, quantity_variants } = this.props

		return (
			<div className="order-summary">
				{this.getSelectedDate(selected_date) }
				{this.getSelectedTimeslot(selected_timeslot) }
				{this.getSelectedVariants(selected_variants, quantity_variants) }
			</div>
		)
	}
}

export default OrderSummary