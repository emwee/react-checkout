import React, { Component } from 'react'
import { connect } from 'react-redux'
import Datepicker from './datepicker'
import Variants from './variants'
import Timeslots from './timeslots'

class CheckoutForm extends Component {
	render() {
		const { hasTimeslots } = this.props
		return (
			<div className="checkout-form">
				<Datepicker />
				{ hasTimeslots && <Timeslots />}
				<Variants />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.hasTimeslots,
	}
}

export default connect(
	mapStateToProps
)(CheckoutForm)