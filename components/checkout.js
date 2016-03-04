import React, { Component } from 'react'
import Datepicker from './datepicker'
import Timeslots from './timeslots'
import Variants from './variants'
import OrderSummary from './order_summary'

class CheckoutApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected_date: null,
			selected_timeslot: null,
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
	onSelectVariant(variant_id, num_tickets) {
		const state = this.state.quantity_variants
		state[variant_id] = num_tickets
		this.setState({ quantity_variants: state })
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