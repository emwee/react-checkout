import React, { Component } from 'react'

require('../css/timeslots.css')

class Timeslot extends Component {
	render() {
		const { id, timeslot, disabled, onSelectTimeslot} = this.props
		const onSelect = () => {
			onSelectTimeslot(id)
		}
		return (
			<button className="timeslot-btn" disabled={disabled} onClick={onSelect.bind(this)}>
				{id} / {timeslot}
			</button>
		)
	}
}

class Timeslots extends Component {
	render() {
		const { timeslots, onSelectTimeslot, disabled} = this.props
		return (
			<div className="timeslots">
				{timeslots.map(timeslot => {
					return <Timeslot key={timeslot.id}
						onSelectTimeslot={onSelectTimeslot}
						disabled={disabled}
						{...timeslot} />
				})}
			</div>
		)
	}
}

export default Timeslots