'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentWillMount = function () {
  this._draggable = {dragging: false}
}

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onMouseMove)
  document.removeEventListener('mouseup', this.onMouseUp)
}

exports.onMouseDown = function (ev) {
  // only left mouse button
  if (ev.button !== 0) return
  if (!this.props.editable) return
  let draggable = this._draggable
  if (!draggable.dragging) {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }
  draggable.dragging = true
  document.onselectstart = function () {
    return false
  }

  let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this))
  draggable.oleft = parseInt(computedStyle.left, 10) || 0
  draggable.otop = parseInt(computedStyle.top, 10) || 0
  draggable.ox = ev.pageX
  draggable.oy = ev.pageY
  return ev._stopPropagation && ev._stopPropagation()
}

exports.onMouseUp = function (ev) {
  let draggable = this._draggable
  draggable.dragging = false
  document.onselectstart = function () {
    return true
  }
  document.removeEventListener('mousemove', this.onMouseMove)
  document.removeEventListener('mouseup', this.onMouseUp)
  let scale = this.props.scale || 1
  this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(this.props.idx, {
      x: draggable.oleft + Math.round((ev.pageX - draggable.ox) / scale),
      y: draggable.otop + Math.round((ev.pageY - draggable.oy) / scale)
    }, lang.moveComponents
  )
  return ev._stopPropagation && ev._stopPropagation()
}

exports.onMouseMove = function (ev) {
  let draggable = this._draggable
  if (!draggable.dragging) return
  let scale = this.props.scale || 1
  this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(this.props.idx, {
    x: draggable.oleft + Math.round((ev.pageX - draggable.ox) / scale),
    y: draggable.otop + Math.round((ev.pageY - draggable.oy) / scale)
  })
  return ev._stopPropagation && ev._stopPropagation()
}

MouseEvent.prototype._stopPropagation = function () {
  this.stopPropagation && this.stopPropagation()
  this.preventDefault && this.preventDefault()
  this.cancelBubble = true
  this.returnValue = false
  return false
}
