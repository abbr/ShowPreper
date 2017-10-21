import { mount } from 'enzyme'
import App from 'components/app'
import Impress from 'components/show/impress'
import React from 'react'
const AppMap = {
  App,
  Impress
}
export default function(appNm){
  let TheApp = AppMap[appNm]
  return mount(<TheApp />, { attachTo: document.getElementById('app') })
}
