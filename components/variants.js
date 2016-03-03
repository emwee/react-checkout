import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Variant extends Component {
	render() {
		return (
			<div className="variant">
				<h3>{this.props.title}</h3>
				<p>id: {this.props.id}</p>
				<p>price: {this.props.price}</p>
			</div>
		)
	}
}

export default class Variants extends Component {
	render() {
		return (
			<div className="variants">
				{this.props.variants.map(function(variant, i) {
					return <Variant key={i}
						{...variant}
						{...self.props} />
				})}
			</div>
		)
	}
}