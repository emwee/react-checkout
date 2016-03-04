import React, { Component } from 'react'
import classNames from 'classnames'

require('../css/timeslots.css')

class Timeslot extends Component {
	render() {
		const { id, timeslot, selected, disabled, onSelectTimeslot} = this.props
		const css_class = classNames('timeslot-btn', {'timeslot-btn--selected': selected })
		const onSelect = () => {
			onSelectTimeslot(id)
		}

		return (
			<button className={css_class} disabled={disabled} onClick={onSelect.bind(this)}>
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