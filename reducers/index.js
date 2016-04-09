import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { default as product } from './product'
import { default as entities } from './entities'
import { default as selection } from './selection'

export default combineReducers({
	product,
	entities,
	selection,
	form: formReducer
})