import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SummaryTimeslot from '../../components/summary/timeslot'

describe('<SummaryTimeslot />', () => {
  it('should display "no timeslot selected" when no timeslot has been selected', () => {
    const wrapper = mount(<SummaryTimeslot />)
    expect(wrapper.text()).to.contain('no timeslot selected')
  });

  it('should display the timeslot time when a timeslot is passed', () => {
  	const selected_timeslot = { 'timeslot': '11:00'}
    const wrapper = mount(<SummaryTimeslot timeslot={selected_timeslot} />)
    expect(wrapper.text()).to.contain('11:00')
  });
});