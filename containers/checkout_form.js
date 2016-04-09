import React, { Component } from 'react'
import { connect } from 'react-redux'
import Datepicker from './datepicker'
import Variants from './variants'
import Timeslots from './timeslots'
import ConsumerForm from '../components/form/consumer'

class CheckoutForm extends Component {
	render() {
		const { hasTimeslots } = this.props
		return (
			<div className="checkout-form">
				<div className="checkout-form__booking-details">
					<div className="checkout-form__when">
						<Datepicker />
						{ hasTimeslots && <Timeslots />}
					</div>
					<div className="checkout-form__what">
						<Variants />
					</div>
				</div>
				<div className="checkout-personal-details">
					<div className="checkout-form__who">
						<ConsumerForm />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.product.hasTimeslots,
	}
}

export default connect(
	mapStateToProps
)(CheckoutForm)