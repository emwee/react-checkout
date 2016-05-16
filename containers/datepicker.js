import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Datepicker from '../components/form/datepicker'

const DatepickerContainer = (props) =>
	<Datepicker { ...props } />

function mapStateToProps(state) {
	return {
		availableDates: state.product.availableDates,
		selectedDate: state.selection.selectedDate,
		isValid: state.selection.selectedDate !== null,
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
	isValid: PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DatepickerContainer)
