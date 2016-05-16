import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { isTimeslotSelected } from '../reducers/selection'
import { getTimeslots } from '../reducers/timeslots'
import Timeslots from '../components/form/timeslots'
import Timeslot from '../components/form/timeslot'

const TimeslotsContainer = (props) => {
	const { isFetching, didInvalidate, isValid,
		timeslots, selectedTimeslotId, selectTimeslot } = props
	return (
		<Timeslots
			isFetching={isFetching}
			didInvalidate={didInvalidate}
			isValid={isValid}
		>
		{timeslots.map(timeslot =>
			<Timeslot
				key={timeslot.id}
				{...timeslot}
				selected={timeslot.id === selectedTimeslotId}
				onSelect={() => selectTimeslot(timeslot.id)}
			/>
		)}
		</Timeslots>
	)
}

function mapStateToProps(state) {
	return {
		selectedTimeslotId: state.selection.selectedTimeslotId,
		timeslots: getTimeslots(state.timeslots),
		isFetching: state.timeslots.isFetching,
		didInvalidate: state.timeslots.didInvalidate,
		isValid: isTimeslotSelected(state),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectTimeslot: (timeslotId) => {
			dispatch(actions.selectTimeslot(timeslotId))
			dispatch(actions.fetchVariants())
		},
	}
}

TimeslotsContainer.propTypes = {
	selectedTimeslotId: PropTypes.number,
	timeslots: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			time: PropTypes.string,
			max_bookable: PropTypes.number,
			enabled: PropTypes.bool,
		})
	),
	isFetching: PropTypes.bool,
	isDisabled: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	selectTimeslot: PropTypes.func,
	isValid: PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeslotsContainer)
