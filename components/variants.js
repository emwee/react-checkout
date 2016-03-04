import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Variant extends Component {
	componentDidMount() {
		const selector = ReactDOM.findDOMNode(this.refs.selector)
	}
	render() {
		const { id, title, price, num_tickets, onSelectVariant } = this.props
		const num_tickets_options = []
		const onChange = (e) => {
			console.log('onChange')
			onSelectVariant(id, parseInt(e.target.value, 10))
		}

		for (let i=0; i<=num_tickets;i++) {
			num_tickets_options.push(
				<option key={i}>{i}</option>
			)
		}

		return (
			<div className="variant">
				<h3>{title} (#{id})</h3>
				<p>price: {price}</p>
				<p>num_tickets: {num_tickets}</p>
				<select ref="selector" onChange={onChange.bind(this)}>
					{num_tickets_options}
				</select>
			</div>
		)
	}
}

class Variants extends Component {
	render() {
		const { variants, onSelectVariant } = this.props
		const variant_nodes = variants.map(variant => {
			return <Variant key={variant.id}
				onSelectVariant={onSelectVariant}
				{...variant} />
		})

		return (
			<div className="variants">
				{variant_nodes}
			</div>
		)
	}
}

export default Variants