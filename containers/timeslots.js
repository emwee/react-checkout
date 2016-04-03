import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers/product'
import { hasTimeslots } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import { TimeslotItems, TimeslotItem } from '../components/timeslots'

class Timeslots extends Component {
	render() {
		const { isFetching, didInvalidate, timeslots, selectedTimeslotId, selectTimeslot } = this.props

		return (
			<TimeslotItems isFetching={isFetching} didInvalidate={didInvalidate}>
			{timeslots.map(timeslot =>
				<TimeslotItem
					key={timeslot.id}
					{...timeslot}
					selected ={timeslot.id === selectedTimeslotId}
					onSelect={() => selectTimeslot(timeslot.id)} />
			)}
		</TimeslotItems>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedTimeslotId: state.selection.selectedTimeslotId,
		timeslots: getTimeslots(state.entities.timeslots),
		isFetching: state.entities.timeslots.isFetching,
		didInvalidate: state.entities.timeslots.didInvalidate,
		hasTimeslots: state.product.hasTimeslots
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