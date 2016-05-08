import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ConsumerForm from '../components/form/consumer'

require('../css/checkout.css')

const CustomerDetailsContainer = (props) => {
	const { bookingDetailsCompleted } = props
	return (
		<div className="checkout-personal-details">
			<div className="checkout-form__who">
				<ConsumerForm />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return { }
}

CustomerDetailsContainer.propTypes = {
}

export default connect(
	mapStateToProps
)(CustomerDetailsContainer)
