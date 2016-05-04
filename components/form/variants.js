import React, { Component, PropTypes } from 'react'

require('../../css/variants.css')

export class Variants extends Component {
	render() {
		const { isFetching, didInvalidate, totalQuantity, maxBookable, children } = this.props
		const maxBookableExceeded = totalQuantity > maxBookable
		return (
			<div className="variants">
				{maxBookableExceeded &&
					<p>you selected more tickets than the max bookable ({maxBookable}). please adjust.</p>}
					{isFetching && <p>fetching variants...</p>}
					{didInvalidate && <p>fetching variants failed...</p>}
					{!children.length && !didInvalidate && <p>no variants fetched yet..</p>}
				<div>{children}</div>
			</div>
		)
	}
}

Variants.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	totalQuantity: PropTypes.number,
	maxBookable: PropTypes.number,
	children: PropTypes.array,
}
