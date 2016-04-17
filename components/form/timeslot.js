import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export class Timeslot extends Component {
	render() {
		const { id, timeslot, enabled, selected, onSelect } = this.props
		return (
			<button className={classNames('timeslot-btn', { 'timeslot-btn--selected': selected })}
				onClick={onSelect} disabled={!enabled}
			>
				{id} / {timeslot}
			</button>
		)
	}
}

Timeslot.propTypes = {
	id: PropTypes.number,
	timeslot: PropTypes.string,
	enabled: PropTypes.bool,
	selected: PropTypes.bool,
	onSelect: PropTypes.func,
}
