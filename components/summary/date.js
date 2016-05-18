import React, { PropTypes } from 'react'
import { formatDate } from '../../helpers/viewhelpers'

const SummaryDate = (props) => {
	const { selectedDate } = props
	return (
		<div>
			{!selectedDate && <p>no date selected</p>}
			{selectedDate && <p>{formatDate(selectedDate, 'LLLL')}</p>}
		</div>
	)
}

SummaryDate.propTypes = {
	selectedDate: PropTypes.string,
}

export default SummaryDate
