import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

require('../css/timeslots.css')

export class TimeslotItems extends Component {
	render() {
		return (
				<div>
					{this.props.isFetching && <p>fetching timeslots...</p>}
					{this.props.didInvalidate && <p>fetching timeslots failed...</p>}
					{!this.props.children.length && !this.props.didInvalidate && <p>no timeslots fetched yet..</p>}
					{this.props.children}
				</div>
		)
	}
}

export class TimeslotItem extends Component {
	render() {
		const { id, timeslot, enabled, selected, onSelect } = this.props
		return (
			<button className={classNames('timeslot-btn', {'timeslot-btn--selected': selected })}
				onClick={onSelect} disabled={!enabled}>
				{id} / {timeslot}
			</button>
		)
	}
}