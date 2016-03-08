import React, { Component } from 'react'

class TextField extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.props.onChange(event.target.value)
	}
	render() {
		const { name, title } = this.props
		return (
			<div>
				<p>{ title }</p>
				<input type="text" name="{name}" placeholder={title} onChange={this.handleChange} />
			</div>
		)
	}
}

export class FirstName extends Component {
	render() {
		return (
			<TextField name="first_name" title="First Name" onChange={this.props.onChange} />
		)
	}
}

export class LastName extends Component {
	render() {
		return (
			<TextField name="last_name" title="Last Name" />
		)
	}
}