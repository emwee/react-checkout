import React, { Component, PropTypes } from 'react'

const SummaryVariants = (props) =>
	<div>{props.children}</div>

SummaryVariants.propTypes = {
	children: PropTypes.array,
}

export default SummaryVariants
