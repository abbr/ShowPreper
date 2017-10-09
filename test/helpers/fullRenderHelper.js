import { mount } from 'enzyme'
import App from 'components/app'
import React from 'react'

export const appWrapper = mount(<App />, { attachTo: app })
