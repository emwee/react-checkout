import React, { Component } from 'react'

class OrderSummary extends Component {
	getSelectedDate(date) {
		if (date) {
			return <p>selected date: {date.toDateString()}</p>
		} else {
			return <p>no date selected</p>
		}
	}
	getTimeslotById(id) {
		for (let t of this.props.timeslots) {
			if (t.id === id)
				return t.timeslot
		}
	}
	getSelectedTimeslot(timeslot_id) {
		if (timeslot_id) {
			return <p>
				selected timeslot: {timeslot_id} ({this.getTimeslotById(timeslot_id)})
			</p>
		} else {
			return <p>no timeslot selected</p>
		}
	}
	getSelectedVariants(variants) {
		console.log('getSelectedVariants', variants)
		if (variants) {
			return <p>variants</p>
		} else {
			return <p>no variants</p>
		}
	}
	render() {
		const { selected_date, selected_timeslot, quantity_variants } = this.props
		return (
			<div className="variants">
				<p>order summary</p>
				{this.getSelectedDate(selected_date) }
				{this.getSelectedTimeslot(selected_timeslot) }
				{this.getSelectedVariants(quantity_variants) }
			</div>
		)
	}
}

export default OrderSummary