'use strict'
import './widgets.less'
var constructors = {
  TextBox: require('./primitives/textBox')
  , Slide: require('./primitives/slide')
}

let WidgetFactory = function (component) {
  let name = component.type || component
  return constructors[name]
}

module.exports = WidgetFactory
