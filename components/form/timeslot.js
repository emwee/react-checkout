import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Timeslot = (props) => {
	const { id, timeslot, enabled, selected, onSelect } = props
	return (
		<button
			className={classNames('timeslot-btn', { 'timeslot-btn--selected': selected })}
			onClick={onSelect} disabled={!enabled}
		>
			{id} / {timeslot}
		</button>
	)
}

Timeslot.propTypes = {
	id: PropTypes.number,
	timeslot: PropTypes.string,
	enabled: PropTypes.bool,
	selected: PropTypes.bool,
	onSelect: PropTypes.func,
}

export default Timeslot
