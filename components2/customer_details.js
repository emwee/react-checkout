import React, { Component } from 'react'

require('../css/customer_details.css')

class InputField extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleChange(event) {
		// this.props.onChange(event.target.value)
	}
	handleBlur(event) {
		this.props.onChange(event.target.value)
	}
	render() {
		console.log('InputField.render', this.props)
		const { name, title, type, error } = this.props
		return (
			<div className="textfield-wrapper">
				<input className="textfield" type="{type}" name="{name}" placeholder={title}
					onBlur={this.handleBlur}
					onChange={this.handleChange} />
				<p>{error}</p>
			</div>
		)
	}
}

export class FirstName extends Component {
	render() {
		return (
			<InputField
				type="text"
				name="first_name"
				title="First Name"
				{ ...this.props} />
		)
	}
}

export class LastName extends Component {
	render() {
		return (
			<InputField
				type="text"
				name="last_name"
				title="Last Name"
				{ ...this.props} />
		)
	}
}

export class Email extends Component {
	render() {
		return (
			<InputField
				type="email"
				name="email"
				title="Email"
				{ ...this.props} />
		)
	}
}

export class CustomerDetails extends Component {
	render() {
		return (
			<div className="customer-details">
				<p>Customer Details</p>
				{this.props.children}
			</div>
		)
	}
}