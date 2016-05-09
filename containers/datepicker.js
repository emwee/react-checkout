import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Datepicker from '../components/form/datepicker'
import { isFieldAlerted } from '../reducers/alerted_field'

const DatepickerContainer = (props) =>
	<Datepicker { ...props } />

function mapStateToProps(state) {
	return {
		availableDates: state.product.availableDates,
		selectedDate: state.selection.selectedDate,
		isFieldAlerted: isFieldAlerted(state, 'date'),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSelectDate: (date) => {
			dispatch(actions.selectDate(date))
			dispatch(actions.shouldFetchTimeslots(date))
		},
	}
}

DatepickerContainer.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	selectDate: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DatepickerContainer)
