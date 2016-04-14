import React, { Component, PropTypes } from 'react'

require('../../css/variants.css')

export class Variants extends Component {
	render() {
		const { totalQuantity, maxBookable } = this.props
		const maxBookableExceeded = totalQuantity > maxBookable
		return (
			<div className="variants">
				{maxBookableExceeded &&
					<p>you selected more tickets than the max bookable ({maxBookable}). please adjust.</p>}
				<div>{this.props.children}</div>
			</div>
		)
	}
}

Variants.propTypes = {
	totalQuantity: PropTypes.number,
	maxBookable: PropTypes.number,
	children: PropTypes.array,
}
