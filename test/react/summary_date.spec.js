import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SummaryDate from '../../components/summary/date'

describe('<SummaryDate />', () => {
  it('should display "no date selected" when no date is passed', () => {
    const wrapper = mount(<SummaryDate />)
    expect(wrapper.text()).to.contain('no date selected')
  })

  it('should display the date when a date is passed', () => {
    const wrapper = mount(<SummaryDate date="2016-07-01" />)
    expect(wrapper.text()).to.contain('July 1, 2016')
  });
})