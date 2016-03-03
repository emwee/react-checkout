import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { getCheckoutDetails } from './actions'
import CheckoutApp from './containers/checkout'
import configureStore from './store/configureStore'

const store = configureStore()

store.dispatch(getCheckoutDetails())

render(
	<Provider store={store}>
		<CheckoutApp />
	</Provider>,
	document.getElementById('app')
)