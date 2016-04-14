import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getTimeslots } from '../reducers/timeslots'
import { Timeslots } from '../components/form/timeslots'
import { Timeslot } from '../components/form/timeslot'

class TimeslotsContainer extends Component {
	render() {
		const { isFetching, didInvalidate, timeslots, selectedTimeslotId, selectTimeslot } = this.props

		return (
			<Timeslots isFetching={isFetching} didInvalidate={didInvalidate}>
			{timeslots.map(timeslot =>
				<Timeslot
					key={timeslot.id}
					{...timeslot} selected = {timeslot.id === selectedTimeslotId}
					onSelect={() => selectTimeslot(timeslot.id)}
				/>
			)}
		</Timeslots>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedTimeslotId: state.selection.selectedTimeslotId,
		timeslots: getTimeslots(state.entities.timeslots),
		isFetching: state.entities.timeslots.isFetching,
		didInvalidate: state.entities.timeslots.didInvalidate,
		hasTimeslots: state.product.hasTimeslots,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectTimeslot: (timeslotId) => {
			dispatch(actions.selectTimeslot(timeslotId))
		},
	}
}

TimeslotsContainer.propTypes = {
	selectedTimeslotId: React.PropTypes.number,
	timeslots: React.PropTypes.object,
	isFetching: React.PropTypes.bool,
	isDisabled: React.PropTypes.bool,
	didInvalidate: React.PropTypes.bool,
	hasTimeslots: React.PropTypes.bool,
	selectTimeslot: React.PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeslotsContainer)
