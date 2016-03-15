import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

require('../css/timeslots.css')

export class TimeslotItems extends Component {
	render() {
		return (
				<div>{this.props.children}</div>
		)
	}
}

export class TimeslotItem extends Component {
	render() {
		console.log('TimeslotItem.render', this.props);
		const { id, timeslot, enabled, selected, onSelect } = this.props
		return (
			<button className={classNames('timeslot-btn', {'timeslot-btn--selected': selected })}
				onClick={onSelect} disabled={!enabled}>
				{id} / {timeslot}
			</button>
		)
	}
}