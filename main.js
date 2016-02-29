import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CheckoutApp from './containers/checkout'
import configureStore from './store/configureStore'

const store = configureStore()

console.log(store.getState())

render(
	<Provider store={store}>
		<CheckoutApp />
	</Provider>,
	document.getElementById('app')
)