import React from 'react'
import ReactDOM from 'react-dom'
import Pikaday from 'pikaday'
import moment from 'moment'

require('pikaday/css/pikaday.css')

class Datepicker extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        console.log(this)
        let { available_dates } = this.props
        let node = ReactDOM.findDOMNode(this.refs.datepicker)
        let picker = new Pikaday({
            field: node,
            bound: false,
            defaultDate: new Date(available_dates[0]),
            minDate: new Date(available_dates[0]),
            maxDate: new Date(available_dates[available_dates.length-1]),
            onSelect:(date) => console.log(date),
            disableDayFn: (date) => !available_dates.includes(moment(date).format('YYYY-MM-DD'))
        })
    }
    render() {
        return (
            <div className="datepicker">
                <div ref="datepicker"></div>
            </div>
        )
    }
}

export default Datepicker