/*global expect */
/*eslint no-console: 0*/

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
// import createComponent from 'helpers/shallowRenderHelper'

// describe('MainComponent', () => {
//   let MainComponent

//   beforeEach(() => {
//     MainComponent = createComponent(Main)
//   })

//   it('should have its component name as default className', () => {
//     expect(MainComponent.props.className).to.equal('sp-main-container')
//   })
// })
import { appWrapper } from 'helpers/fullRenderHelper'
describe('app', () => {
  it('should have its component className as sp-main-container', () => {
    expect(appWrapper.children().is('.sp-main-container')).to.equal(true)
  })
})
