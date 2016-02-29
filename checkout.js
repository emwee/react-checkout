import React from 'react'
import Datepicker from './datepicker'
import Variants from './variants'

class CheckoutForm extends React.Component {
	constructor() {
		super()
		this.props = {}
	}
	render() {
		console.log('render', this.props)
		return (
			<div>
				<Datepicker {...this.props} />
				<Variants  {...this.props} />
			</div>
		)
	}
}

CheckoutForm.propTypes = {}

CheckoutForm.defaultProps = {}

export default CheckoutForm