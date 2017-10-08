/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict'

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper'
import { shallow, mount } from 'enzyme'
import Main from 'components/app'
import React from 'react'

describe('MainComponent', () => {
  let MainComponent

  beforeEach(() => {
    MainComponent = createComponent(Main)
  })

  it('should have its component name as default className', () => {
    debugger
    expect(MainComponent.props.className).to.equal('sp-main-container')
  })
})

describe('<Main />', () => {
  it.only('should have its component name as default className', () => {
    debugger
    const wrapper = mount(<Main />, { attachTo: document.body })
    expect(wrapper.children().is('.sp-main-container')).to.equal(true)
  })
})
