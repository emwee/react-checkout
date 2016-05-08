import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames'

require('../../css/consumer.css')

const validate = values => {
	const errors = {}
	if (!values.firstName) {
		errors.firstName = 'Required'
	}

	if (!values.lastName) {
		errors.lastName = 'Required'
	}

	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.phone) {
		errors.phone = 'Required'
	}

	return errors
}

class ConsumerForm extends Component {
	renderField(field, title) {
		return (
			<div className="form-row">
				<label htmlFor={field.name}>{title}</label>
				<input
					type="text"
					id={field.name}
					className={classNames('textfield', { 'textfield--error': field.touched && field.error })}
					placeholder={title}
					{ ...field }
				/>
				{field.touched && field.error && <div className="form-error">{field.error}</div>}
			</div>
		)
	}
	render() {
		const { fields: { firstName, lastName, email, phone }, handleSubmit } = this.props
		return (
			<form onSubmit={handleSubmit}>
				{this.renderField(firstName, 'First name')}
				{this.renderField(lastName, 'Last name')}
				{this.renderField(email, 'Email address')}
				{this.renderField(phone, 'Phone number')}
			</form>
		)
	}
}

ConsumerForm = reduxForm({
	form: 'consumer',
	fields: ['firstName', 'lastName', 'email', 'phone'],
	validate,
})(ConsumerForm)

ConsumerForm.propTypes = {
	fields: PropTypes.object,
	handleSubmit: PropTypes.func,
}

export default ConsumerForm
