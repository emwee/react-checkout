import React, { PropTypes } from 'react'

require('../../css/variants.css')

const Variants = (props) => {
	const { isFetching, didInvalidate, isFieldAlerted,
		totalQuantity, maxBookable, children } = props
	const maxBookableExceeded = totalQuantity > maxBookable
	return (
		<div className="variants">
			{maxBookableExceeded &&
				<p>you selected more tickets than the max bookable ({maxBookable}). please adjust.</p>}
				{isFetching && <p>fetching variants...</p>}
				{didInvalidate && <p>fetching variants failed...</p>}
				{!children.length && !didInvalidate && <p>no variants fetched yet..</p>}
			<div>{children}</div>
			{isFieldAlerted && <p>pick at least one variant!</p>}
		</div>
	)
}

Variants.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	isFieldAlerted: PropTypes.bool,
	totalQuantity: PropTypes.number,
	maxBookable: PropTypes.number,
	children: PropTypes.array,
}

export default Variants
