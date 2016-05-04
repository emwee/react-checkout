import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SummaryVariant from '../../components/summary/variant'

describe('<SummaryVariant />', () => {
  it('should not display a variant when its quantity is zero', () => {
    const wrapper = mount(<SummaryVariant quantity={0} />)
  })
})