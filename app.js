import React, { Component } from 'react'
import { render } from 'react-dom'
import CheckoutApp from './components/checkout'
import checkout_data from './data/checkout_details.json'

console.log('checkout_data', checkout_data)

var data = checkout_data

data.entities = {}

data.entities.timeslots = checkout_data.timeslots.reduce((obj, timeslot) => {
	obj[timeslot.id] = timeslot
	return obj
}, {})


data.entities.variants = checkout_data.variants.reduce((obj, variant) => {
	obj[variant.id] = variant
	return obj
}, {})

render(
	<CheckoutApp {...data} />,
	document.getElementsByClassName('checkout-app')[ 0]
)