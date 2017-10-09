/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
// import createComponent from 'helpers/shallowRenderHelper'
import { mount } from 'enzyme'
import Main from 'components/app'
import React from 'react'

// describe('MainComponent', () => {
//   let MainComponent

//   beforeEach(() => {
//     MainComponent = createComponent(Main)
//   })

//   it('should have its component name as default className', () => {
//     expect(MainComponent.props.className).to.equal('sp-main-container')
//   })
// })

describe('App', () => {
  it('should have its component className as sp-main-container', () => {
    const wrapper = mount(<Main />, { attachTo: app })
    expect(wrapper.children().is('.sp-main-container')).to.equal(true)
  })
})
