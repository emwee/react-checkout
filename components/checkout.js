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
			selected_date: '2016-04-02',
			selected_timeslot: null,
			selected_variants: [1, 2],
			quantity_variants: {1: 2, 2: 3}
		}
	}
	onSelectDate(date) {
		this.setState({selected_date: date})

		// reset timeslots
		this.setState({selected_timeslot: null})

		// reset variants
		this.setState({selected_variants: []})
		this.setState({quantity_variants: {}})
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
		const has_timeslots = !!timeslots.length
		const variants_disabled = has_timeslots ? !this.state.selected_timeslot : !this.state.selected_date

		return (
			<div>
				<OrderSummary
					{...this.props} {...this.state}
					has_timeslots={has_timeslots} />
				<Datepicker
					available_dates={available_dates}
					selected_date={this.state.selected_date}
					onSelectDate={this.onSelectDate.bind(this)} />
				<Timeslots
					timeslots={timeslots}
					selected_timeslot={this.state.selected_timeslot}
					onSelectTimeslot={this.onSelectTimeslot.bind(this)}
					disabled={!this.state.selected_date} />
				<Variants
					variants={variants}
					onSelectVariant={this.onSelectVariant.bind(this)}
					quantity_variants={this.state.quantity_variants}
					disabled={variants_disabled} />
			</div>
		)
	}
}

export default CheckoutApp