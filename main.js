import React, { Component } from 'react'
import { render } from 'react-dom'
import CheckoutApp from './components/checkout'
import checkout_data from './data/checkout_details.json'

console.log('checkout_data', checkout_data)

render(
	<CheckoutApp {...checkout_data} />,
	document.getElementsByClassName('checkout-app')[ 0]
)