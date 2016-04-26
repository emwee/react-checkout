import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Datepicker } from '../components/form/datepicker'

class DatepickerContainer extends Component {
	render() {
		const { availableDates, selectedDate, selectDate } = this.props
		return (
			<Datepicker
				availableDates={availableDates}
				selectedDate={selectedDate}
				onSelectDate={selectDate}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		availableDates: state.product.availableDates,
		selectedDate: state.selection.selectedDate,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: (date) => {
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
