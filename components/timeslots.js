import React, { Component } from 'react'
import classNames from 'classnames'

require('../css/timeslots.css')

class Timeslot extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		const { id, onSelectTimeslot} = this.props
		onSelectTimeslot(id)
	}
	render() {
		const { id, timeslot, selected, disabled } = this.props
		const css_class = classNames('timeslot-btn', {'timeslot-btn--selected': selected })

		return (
			<button className={css_class} disabled={disabled} onClick={this.handleClick}>
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