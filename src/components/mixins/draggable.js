'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentWillMount = function () {
}

exports.componentDidMount = function () {
  this.mouseDownHdlrs && this.mouseDownHdlrs.push(this.onDraggableMouseDown)
}

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onDraggableMouseMove)
  document.removeEventListener('mouseup', this.onDraggableMouseUp)
}

exports.onDraggableMouseDown = function (ev) {
  // only left mouse button
  if (ev.button !== 0) return
  document.addEventListener('mousemove', this.onDraggableMouseMove)
  document.addEventListener('mouseup', this.onDraggableMouseUp)

  this._draggable = []
  this.state.selectedWidgets.forEach(e => {
    let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this.refs[e]))
    let draggable = {}
    draggable.oleft = parseInt(computedStyle.left, 10) || 0
    draggable.otop = parseInt(computedStyle.top, 10) || 0
    draggable.ox = ev.pageX
    draggable.oy = ev.pageY
    this._draggable[e] = draggable
  })

  ev.stopPropagation && ev.stopPropagation()
}

exports.onDraggableMouseUp = function (ev) {
  document.body.style.MozUserSelect = ""
  document.removeEventListener('mousemove', this.onDraggableMouseMove)
  document.removeEventListener('mouseup', this.onDraggableMouseUp)
  let scale = this.props.scale || 1

  this.state.selectedWidgets.forEach(e=>{
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
        x: this._draggable[e].oleft + Math.round((ev.pageX - this._draggable[e].ox) / scale),
        y: this._draggable[e].otop + Math.round((ev.pageY - this._draggable[e].oy) / scale)
      }, lang.moveComponents
    )
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onDraggableMouseMove = function (ev) {
  document.body.style.MozUserSelect = "none"
  let scale = this.props.scale || 1
  this.state.selectedWidgets.forEach(e=>{
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
      x: this._draggable[e].oleft + Math.round((ev.pageX - this._draggable[e].ox) / scale),
      y: this._draggable[e].otop + Math.round((ev.pageY - this._draggable[e].oy) / scale)
    })
  })
  ev.stopPropagation && ev.stopPropagation()
}
