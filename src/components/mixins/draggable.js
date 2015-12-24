'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentWillMount = function () {
  this._draggable = {dragging: false}
}

exports.componentDidMount = function () {
  if (this.mouseDownHdlrs) {
    this.mouseDownHdlrs.push(this.onDraggableMouseDown)
  }
}

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onMouseMove)
  document.removeEventListener('mouseup', this.onMouseUp)
}

exports.onDraggableMouseDown = function (ev) {
  // only left mouse button
  if (ev.button !== 0) return
  let draggable = this._draggable
  if (!draggable.dragging) {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }
  draggable.dragging = true

  let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this))
  draggable.oleft = parseInt(computedStyle.left, 10) || 0
  draggable.otop = parseInt(computedStyle.top, 10) || 0
  draggable.ox = ev.pageX
  draggable.oy = ev.pageY
  ev.stopPropagation && ev.stopPropagation()
}

exports.onMouseUp = function (ev) {
  let draggable = this._draggable
  draggable.dragging = false
  document.body.style.MozUserSelect = ""
  document.removeEventListener('mousemove', this.onMouseMove)
  document.removeEventListener('mouseup', this.onMouseUp)
  let scale = this.props.scale || 1
  this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(this.props.idx, {
      x: draggable.oleft + Math.round((ev.pageX - draggable.ox) / scale),
      y: draggable.otop + Math.round((ev.pageY - draggable.oy) / scale)
    }, lang.moveComponents
  )
  ev.stopPropagation && ev.stopPropagation()
}

exports.onMouseMove = function (ev) {
  let draggable = this._draggable
  if (!draggable.dragging) return
  document.body.style.MozUserSelect = "none"
  let scale = this.props.scale || 1
  this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(this.props.idx, {
    x: draggable.oleft + Math.round((ev.pageX - draggable.ox) / scale),
    y: draggable.otop + Math.round((ev.pageY - draggable.oy) / scale)
  })
  ev.stopPropagation && ev.stopPropagation()
}
