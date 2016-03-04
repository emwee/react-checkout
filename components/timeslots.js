import React, { Component } from 'react'
import classNames from 'classnames'

// var classNames = require('classnames')


console.log(classNames({ foo: true, bar: true }))

require('../css/timeslots.css')

class Timeslot extends Component {
	render() {
		const { id, timeslot, selected, disabled, onSelectTimeslot} = this.props
		const timeslot_class = classNames('timeslot-btn', {'timeslot-btn--selected': selected })
		const onSelect = () => {
			onSelectTimeslot(id)
		}

		return (
			<button className={timeslot_class} disabled={disabled} onClick={onSelect.bind(this)}>
				{id} / {timeslot}
			</button>
		)
	}
}

class Timeslots extends Component {
	render() {
		const { timeslots, selected_timeslot, onSelectTimeslot, disabled} = this.props
		return (
			<div className="timeslots">
				{timeslots.map(timeslot => {
					console.log(selected_timeslot)
					return <Timeslot key={timeslot.id}
						selected={selected_timeslot === timeslot.id}
						disabled={disabled}
						onSelectTimeslot={onSelectTimeslot}
						{...timeslot} />
				})}
			</div>
		)
	}
}

export default Timeslots