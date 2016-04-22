import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SummaryTotalPrice from '../../components/summary/total_price'

describe('<SummaryTotalPrice />', () => {
  it('should not display subtotal price when no subtotal is calculated', () => {
    const wrapper = mount(<SummaryTotalPrice />)
    expect(wrapper.find('.subtotal')).to.have.length(0)
  })

  it('should display subtotal price when subtotal is calculated', () => {
    const wrapper = mount(<SummaryTotalPrice subtotalPrice={10} />)
    expect(wrapper.find('.subtotal')).to.have.length(1)
  })

  it('should not display a booking fee when no booking fee is set', () => {
    const wrapper = mount(<SummaryTotalPrice bookingFee={0} />)
    expect(wrapper.find('.booking_fee')).to.have.length(0)
  })

  it('should display a booking fee when a booking fee is set', () => {
    const wrapper = mount(<SummaryTotalPrice bookingFee={10} />)
    expect(wrapper.find('.booking_fee')).to.have.length(1)
  })

  it('should not display the total price only unless a booking fee and subtotal are set', () => {
    const wrapper = mount(<SummaryTotalPrice bookingFee={0} totalPrice={0} />)
    expect(wrapper.find('.total_price')).to.have.length(0)
  })

  it('should display the total price only when a booking fee and subtotal price have been set', () => {
    const wrapper = mount(<SummaryTotalPrice bookingFee={1} totalPrice={1} />)
    expect(wrapper.find('.total_price')).to.have.length(1)
  })
})