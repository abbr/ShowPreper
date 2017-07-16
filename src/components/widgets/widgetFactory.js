'use strict'
import './widgets.less'
var constructors = {
  TextBox: require('./primitives/textBox'),
  Slide: require('./primitives/slide'),
  default: require('./primitives/textBox')
}

let WidgetFactory = function(component) {
  let name = component.type || component
  return constructors[name] || constructors['default']
}

module.exports = WidgetFactory
