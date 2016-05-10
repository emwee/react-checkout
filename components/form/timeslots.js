import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { scrollToField } from '../../helpers/utils'

require('../../css/timeslots.css')

class Timeslots extends React.Component {
	componentDidUpdate() {
		if (this.props.isFieldAlerted) {
			scrollToField(ReactDOM.findDOMNode(this.refs.field))
		}
	}
	render() {
		const { isFetching, didInvalidate, isFieldAlerted, children } = this.props
		return (
			<div className="timeslots" ref="field">
				{isFetching && <p>fetching timeslots...</p>}
				{didInvalidate && <p>fetching timeslots failed...</p>}
				{!children.length && !didInvalidate && <p>no timeslots fetched yet..</p>}
				{children}
				{isFieldAlerted && <p>choose a timeslot!</p>}
			</div>
		)
	}
}

Timeslots.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	isFieldAlerted: PropTypes.bool,
	children: PropTypes.array,
}

export default Timeslots
