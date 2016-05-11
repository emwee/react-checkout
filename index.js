import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getCheckoutDetails } from './actions'
import App from './containers/App'

const middleware = process.env.NODE_ENV === 'production' ?
	[thunk] :
	[thunk, logger()]

const store = createStore(
	reducer,
	compose(
		applyMiddleware(
			...middleware
		),
		window.devToolsExtension ? window.devToolsExtension() : func => func
	)
)

store.dispatch(getCheckoutDetails())

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
