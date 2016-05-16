import React, { Component, PropTypes } from 'react'
import AlertField from './alert'
import '../../css/variants.css'

class Variants extends Component {
	render() {
		const { isFetching, didInvalidate, isValid,
			totalQuantity, maxBookable, children, isValidated } = this.props
		const maxBookableExceeded = totalQuantity > maxBookable
		return (
			<div className="variants" ref="variants">
				{maxBookableExceeded &&
					<p>you selected more tickets than the max bookable ({maxBookable}). please adjust.</p>}
					{isFetching && <p>fetching variants...</p>}
					{didInvalidate && <p>fetching variants failed...</p>}
					{!children.length && !didInvalidate && <p>no variants fetched yet..</p>}
				<div>{children}</div>
				{isValidated && !isValid && <p>pick at least one variant!</p>}
			</div>
		)
	}
}

Variants.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	isValid: PropTypes.bool,
	isValidated: PropTypes.bool,
	totalQuantity: PropTypes.number,
	maxBookable: PropTypes.number,
	children: PropTypes.array,
}

export default new AlertField('variants', Variants)
