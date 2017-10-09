'use strict'

// setup enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

beforeEach(() => {
  while (localStorage.length > 0) {
    localStorage.removeItem(localStorage.key(0))
  }
})

let app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(test|helper)\.jsx?$/i)
testsContext.keys().forEach(testsContext)
