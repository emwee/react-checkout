import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import zenscroll from 'zenscroll'

const AlertFieldWrapper = (fieldName, Wrapped) => class AlertField extends Component {        // (1)
	constructor(props) {
		super(props)
		this.alertField = this.alertField.bind(this)
		this.state = {
			isValidated: false,
		}
	}
	alertField() {
		const node = ReactDOM.findDOMNode(this.refs.field)
		zenscroll.intoView(node)
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
