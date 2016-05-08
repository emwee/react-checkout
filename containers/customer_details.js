import React from 'react'
import ConsumerForm from '../components/form/consumer'

require('../css/checkout.css')

const CustomerDetailsContainer = () =>
	<div className="checkout-personal-details">
		<div className="checkout-form__who">
			<ConsumerForm />
		</div>
	</div>

export default CustomerDetailsContainer
