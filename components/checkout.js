import React, { Component } from 'react'
import Datepicker from './datepicker'
import Timeslots from './timeslots'
import Variants from './variants'
import OrderSummary from './order_summary'
import { FirstName, LastName } from './customer_details'

require('../css/checkout.css')

class CheckoutApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected_date: '2016-04-01',
			selected_timeslot: null,
			selected_variants: [101, 102],
			quantity_by_variant_id: {101:2, 102:7},
			customer: {
				first_name: null,
				last_name: null
			}
		}
	}
	onChangeFirstName(first_name) {
		console.log('onChangeFirstName', first_name)
		const customer = this.state.customer
		customer.first_name = first_name
		this.setState({customer: customer})

	}
	onChangeLastName(last_name) {
		console.log('onChangeLastName', last_name)

	}
	onSelectDate(date) {
		this.setState({selected_date: date})

		// reset timeslots
		this.setState({selected_timeslot: null})

		// reset variants
		this.setState({selected_variants: []})
		this.setState({quantity_by_variant_id: {}})
	}
	onSelectTimeslot(timeslot_id) {
		this.setState({selected_timeslot: timeslot_id})
	}
	updateQuantityVariants(variant_id, num_tickets) {
		const quantity_by_variant_id = this.state.quantity_by_variant_id
		quantity_by_variant_id[variant_id] = num_tickets
		this.setState({quantity_by_variant_id: quantity_by_variant_id})
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
		const { available_dates, variants, timeslots, max_bookable } = this.props
		const has_timeslots = !!timeslots.length
		const variants_disabled = has_timeslots ? !this.state.selected_timeslot : !this.state.selected_date

		console.log('variants', variants)

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
					max_bookable={max_bookable}
					onSelectVariant={this.onSelectVariant.bind(this)}
					quantity_by_variant_id={this.state.quantity_by_variant_id}
					disabled={variants_disabled} />
				<div>
					<FirstName onChange={this.onChangeFirstName.bind(this)} />
					<LastName onChange={this.onChangeLastName.bind(this)} />
				</div>
			</div>
		)
	}
}

export default CheckoutApp