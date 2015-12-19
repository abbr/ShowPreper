'use strict'

var constructors = {
  other: require('./textBox')
}

let ComponentViewFactory = function (component) {
  var name = component.type || component
  return constructors[name] || constructors.other
}

module.exports = ComponentViewFactory
