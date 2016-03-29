import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { hasTimeslots } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import { TimeslotItems, TimeslotItem } from '../components/timeslots'

class Timeslots extends Component {
	render() {
		const { hasTimeslots, isFetching, didInvalidate, timeslots, selectedTimeslotId, selectTimeslot } = this.props

		if (!hasTimeslots) {
			return null
		}
		return (
			<TimeslotItems isFetching={isFetching} didInvalidate={didInvalidate}>
			{timeslots.map(timeslot =>
				<TimeslotItem
					key={timeslot.id}
					{...timeslot}
					selected ={timeslot.id === selectedTimeslotId}
					onSelect={() => selectTimeslot(timeslot.id, timeslot.max_bookable)} />
			)}
		</TimeslotItems>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedTimeslotId: state.selection.selectedTimeslotId,
		timeslots: getTimeslots(state.timeslots),
		isFetching: state.timeslots.isFetching,
		didInvalidate: state.timeslots.didInvalidate,
		hasTimeslots: state.hasTimeslots
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectTimeslot: (timeslotId) => {
			dispatch(actions.selectTimeslot(timeslotId))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timeslots)