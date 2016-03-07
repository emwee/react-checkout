import React, { Component } from 'react'
import { render } from 'react-dom'
import CheckoutApp from './components/checkout'
import checkout_data from './data/checkout_details.json'
import parseCheckoutData from './utils/parse_checkout_data'

const data = parseCheckoutData(checkout_data)

render(
	<CheckoutApp {...data} />,
	document.getElementsByClassName('checkout-app')[ 0]
)