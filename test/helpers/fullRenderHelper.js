import { mount } from 'enzyme'
import App from 'components/app'
import React from 'react'
export let appWrapper
beforeEach(() => {
  appWrapper = mount(<App />, { attachTo: app })
})
