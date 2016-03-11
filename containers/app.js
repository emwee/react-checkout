import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectDate } from '../actions'
import Datepicker from '../components/datepicker'
import { VariantItems, VariantItem } from '../components/variants'

class App extends Component {
	render() {
		console.log('App.render')
		console.log(this.props)
		const { availableDates, selectedDate, selectDate, variants } = this.props
		console.log(variants)

		variants.map(v => {
			console.log(v.id)

		})
		return (
			<div>
				<Datepicker
					availableDates={availableDates}
					selectedDate={selectedDate}
					onSelectDate={selectDate} />
				<VariantItems>
					{variants.map(variant =>
						<VariantItem key={variant.id} {...variant} />
					)}
				</VariantItems>
			</div>
		)
	}
}

App.propTypes = {
	availableDates: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		availableDates: state.availableDates,
		selectedDate: state.selectedDate,
		variants: state.variants
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: selectDate
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
