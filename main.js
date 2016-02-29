// import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Checkout from './checkout'

const data = {
    "show_datepicker": true,
    "price": 12.5,
    "available_dates": [
    	"2016-03-01",
        "2016-03-02",
        "2016-03-03",
        "2016-03-05"
    ],
    "variants": [
        {
            "id": 1,
            "title": "Adult",
            "description": "Some description about adults.",
            "price": 11.5,
            "num_available": 0
        },
        {
            "id": 2,
            "title": "Children",
            "description": "Some description about kids.",
            "price": 10,
            "num_available": 0
        }
    ]
}

ReactDOM.render(
	<Checkout {...data} />,
	document.getElementsByClassName('checkout')[0]
)