'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.getInitialState = function () {
  return {selectedWidgets: []}
}

exports.componentDidMount = function () {
  this.mouseDownHdlrs.unshift(this.onSelectionMouseDown)
}
exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onScaleMouseMove)
}
exports.onSelectionMouseDown = function (ev, i) {
  ev.stopPropagation && ev.stopPropagation()
  let selectedWidgets = _.cloneDeep(this.state.selectedWidgets)
  if (!ev.shiftKey) {
    if (selectedWidgets.length > 1 && typeof(i) === 'number') {
      return false
    }
    selectedWidgets.splice(0, selectedWidgets.length)
  }
  if (typeof(i) === 'number') {
    selectedWidgets.unshift(i)
  }
  // call this.state.selectedWidgets redundantly to avoid event racing
  this.state.selectedWidgets = selectedWidgets
  this.setState({
    selectedWidgets: selectedWidgets
  })
}
