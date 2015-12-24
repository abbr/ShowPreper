'use strict'
import './widgets.less'
var constructors = {
  TextBox: require('./textBox'),
  editable: require('./editableComponent'),
  other: require('./textBox')
}

let ComponentViewFactory = function (component, editable) {
  let name = editable ? 'editable' : (component.type || component)
  return constructors[name] || constructors.other
}

module.exports = ComponentViewFactory
