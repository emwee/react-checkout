import React, { Component, PropTypes } from 'react'

const SummaryVariants = (props) => {
	return <div>{props.children}</div>
}

SummaryVariants.propTypes = {
	children: PropTypes.array,
}

export default SummaryVariants
