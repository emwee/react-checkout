import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { scrollToField } from '../../helpers/utils'

const AlertFieldWrapper = (fieldName, Wrapped) => class AlertField extends Component {        // (1)
	constructor(props) {
		super(props)
		this.alertField = this.alertField.bind(this)
		this.state = {
			isValidated: false,
		}
	}
	alertField() {
		scrollToField(ReactDOM.findDOMNode(this.refs.field))
		this.setState({ isValidated: true })
	}
	componentDidMount() {
		window.addEventListener(`validateField:${fieldName}`, this.alertField)
	}
	componentWillUnmount() {
		window.removeEventListener(`validateField:${fieldName}`, this.alertField)
	}
	render() {
		return (
			<Wrapped ref="field"
				{...this.props}
				{...this.state}
			/>
		)
	}
}

export default AlertFieldWrapper
