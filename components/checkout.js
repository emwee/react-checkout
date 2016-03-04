import React, { Component } from 'react'
import Datepicker from './datepicker'
import Timeslots from './timeslots'
import Variants from './variants'
import OrderSummary from './order_summary'

require('../css/checkout.css')

class CheckoutApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected_date: null,
			selected_timeslot: null,
			selected_variants: [],
			quantity_variants: {}
		}
	}
	onSelectDate(date) {
		this.setState({selected_date: date})
		this.setState({selected_timeslot: null})
	}
	onSelectTimeslot(timeslot_id) {
		this.setState({selected_timeslot: timeslot_id})
	}
	updateQuantityVariants(variant_id, num_tickets) {
		const quantity_variants = this.state.quantity_variants
		quantity_variants[variant_id] = num_tickets
		this.setState({quantity_variants: quantity_variants})
	}
	updateSelectedVariants(variant_id, num_tickets) {
		let selected_variants = this.state.selected_variants
		const index = this.state.selected_variants.indexOf(variant_id)

		if (num_tickets > 0) {
			if (index === -1) {
				selected_variants = selected_variants.concat([variant_id])
			}
		} else {
			if (index > -1 ) {
				selected_variants = this.state.selected_variants
				selected_variants.splice(index, 1)
			}
		}

		this.setState({selected_variants: selected_variants})
	}
	onSelectVariant(variant_id, num_tickets) {
		this.updateQuantityVariants(variant_id, num_tickets)
		this.updateSelectedVariants(variant_id, num_tickets)
	}
	render() {
		console.log('CheckoutApp.render', this)
		const { available_dates, variants, timeslots } = this.props
		return (
			<div>
				<OrderSummary {...this.props} {...this.state} />
				<Datepicker
					available_dates={available_dates}
					onSelectDate={this.onSelectDate.bind(this)} />
				<Timeslots
					timeslots={timeslots}
					selected_timeslot={this.state.selected_timeslot}
					onSelectTimeslot={this.onSelectTimeslot.bind(this)}
					disabled={!this.state.selected_date} />
				<Variants
					variants={variants}
					onSelectVariant={this.onSelectVariant.bind(this)} />
			</div>
		)
	}
}

export default CheckoutApp