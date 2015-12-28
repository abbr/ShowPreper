'use strict'
import './widgets.less'
var constructors = {
  TextBox: require('./textBox')
}

let WidgetFactory = function (component) {
  let name = component.type || component
  return constructors[name] || constructors.other
}

module.exports = WidgetFactory
