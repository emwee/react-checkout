import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatepickerContainer from './datepicker'
import VariantsContainer from './variants'
import TimeslotsContainer from './timeslots'
import ConsumerForm from '../components/form/consumer'

class CheckoutForm extends Component {
	render() {
		const { hasTimeslots } = this.props
		return (
			<div className="checkout-form">
				<div className="checkout-form__booking-details">
					<div className="checkout-form__when">
						<DatepickerContainer />
						{ hasTimeslots && <TimeslotsContainer />}
					</div>
					<div className="checkout-form__what">
						<VariantsContainer />
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

CheckoutForm.propTypes = {
	hasTimeslots: React.PropTypes.bool,
}

export default connect(
	mapStateToProps
)(CheckoutForm)
