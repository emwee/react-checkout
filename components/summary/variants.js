import React, { Component, PropTypes } from 'react'

export class SummaryVariants extends Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

SummaryVariants.propTypes = {
	children: PropTypes.array,
}
