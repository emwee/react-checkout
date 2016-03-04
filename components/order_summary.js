import React, { Component } from 'react'

require('../css/order_summary.css')

class OrderSummaryVariant extends Component {
	render() {
		const { id, qty} = this.props
		return (
			<div>
				<p>variant {id} x {qty}</p>
			</div>
		)
	}
}

class OrderSummary extends Component {
	getSelectedDate(date) {
		if (date) {
			return <p>selected date: {date.toDateString()}</p>
		} else {
			return <p>no date selected</p>
		}
	}
	getTimeslotById(id) {
		for (let timeslot of this.props.timeslots) {
			if (timeslot.id === id) {
				return timeslot.timeslot
			}
		}
	}
	getSelectedTimeslot(timeslot_id) {
		if (timeslot_id) {
			return <p>selected timeslot: {timeslot_id} ({this.getTimeslotById(timeslot_id)})</p>
		} else {
			return <p>no timeslot selected</p>
		}
	}
	getSelectedVariants(selected_variants, quantity_variants) {
		console.log('getSelectedVariants', selected_variants, quantity_variants)

		if (!selected_variants.length) {
			return <p>no variants selected</p>
		}

		return selected_variants.map(variant_id => {
			return <OrderSummaryVariant key={variant_id}
				id={variant_id}
				qty={quantity_variants[variant_id]} />
		})
	}
	render() {
		const { selected_date, selected_timeslot, selected_variants, quantity_variants } = this.props
		return (
			<div className="order-summary">
				<p>order summary</p>
				{this.getSelectedDate(selected_date) }
				{this.getSelectedTimeslot(selected_timeslot) }
				{this.getSelectedVariants(selected_variants, quantity_variants) }
			</div>
		)
	}
}

export default OrderSummary