import { mount } from 'enzyme'
import App from 'components/app'
import Impress from 'components/show/impress'
import React from 'react'
const AppMap = {
  App,
  Impress
}
let appWrapper
export default function(appNm){
  let TheApp = AppMap[appNm]
  appWrapper && appWrapper.unmount()
  appWrapper = mount(<TheApp />, { attachTo: document.getElementById('app') })
  return appWrapper
}
