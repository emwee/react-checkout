import React, { Component } from 'react'
import validator from 'validator'
import $ from 'jquery'
import Datepicker from './datepicker'
import Timeslots from './timeslots'
import Variants from './variants'
import OrderSummary from './order_summary'
import { CustomerDetails, FirstName, LastName, Email } from './customer_details'

require('../css/checkout.css')

class CheckoutApp extends Component {
	constructor(props) {
		console.log('CheckoutApp.constructor')
		super(props)
		console.log(props)

		this.state = {
			selected_date: '2016-04-01',
			selected_timeslot: 111,
			selected_variants: [101, 102],
			quantity_by_variant_id: {101:2, 102:7},
			customer: {
				first_name: null,
				last_name: null,
				email: null
			},
			errors: {},
			entities: {
				timeslots: {},
				variants: {}
			}
		}
	}
	onChangeFirstName(first_name) {
		console.log('onChangeFirstName', first_name)
		const customer = this.state.customer
		const errors = this.state.errors;

		if (validator.isLength(first_name, { min: 2 })) {
			customer.first_name = first_name
			delete errors.first_name
		} else {
			customer.first_name = null
			const errors = this.state.errors;
			errors.first_name = 'please fill out a first name'
			this.setState({errors})
		}

		this.setState({customer, errors})
	}
	onChangeLastName(last_name) {
		console.log('onChangeLastName', last_name)
		const customer = this.state.customer
		const errors = this.state.errors;

		if (validator.isLength(last_name, { min: 2 })) {
			customer.last_name = last_name
			delete errors.last_name
		} else {
			customer.last_name = null
			const errors = this.state.errors;
			errors.last_name = 'please fill out a last name'
		}

		this.setState({customer, errors})
	}
	onChangeLastEmail(email) {
		console.log('onChangeLastEmail', email)
		const customer = this.state.customer
		const errors = this.state.errors;

		if (validator.isEmail(email)) {
			customer.email = email
			delete errors.email
		} else {
			customer.email = null
			const errors = this.state.errors;
			errors.email = 'please fill out a valid email'
		}

		this.setState({customer, errors})
	}
	onSelectDate(date) {
		console.log('onSelectDate')
		this.setState({selected_date: date})

		// reset timeslots
		this.setState({selected_timeslot: null})

		// reset variants
		this.setState({selected_variants: []})
		this.setState({quantity_by_variant_id: {}})

		console.log('-----')

		$.getJSON('./data/timeslots_2016-04-01.json', (json) => {
			console.log('json', json)

			if (json.success) {

				const entities_state = this.state.entities

				console.log(entities_state)

				for (let row in json.timeslots) {
					const timeslot = json.timeslots[row]
					entities_state.timeslots[date + '.' + timeslot.id] = timeslot
				}

				console.log(entities_state)

				this.setState({ entities: entities_state })
			}
		}).fail((data) => {
			console.log('fail', data)
		});
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
				<CustomerDetails>
					<FirstName
						error={this.state.errors.first_name}
						onChange={this.onChangeFirstName.bind(this)} />
					<LastName
						error={this.state.errors.last_name}
						onChange={this.onChangeLastName.bind(this)} />
					<Email
						error={this.state.errors.email}
						onChange={this.onChangeLastEmail.bind(this)} />
				</CustomerDetails>
			</div>
		)
	}
}

export default CheckoutApp