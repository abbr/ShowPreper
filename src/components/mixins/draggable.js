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
  if (!this.state.draggable) return
  document.addEventListener('mousemove', this.onDraggableMouseMove)
  document.addEventListener('mouseup', this.onDraggableMouseUp)
  document.body.style.WebkitUserSelect = "none"
  document.body.style.MozUserSelect = "none"
  document.body.style.MsUserSelect = "none"

  this._draggable = {}
  this._draggable.drags = []
  this._draggable.dragged = false
  this.props.selectedWidgets.forEach(e => {
    let draggable = {}
    draggable.oleft = this.props.component.components[e].x || 0
    draggable.otop = this.props.component.components[e].y || 0
    draggable.ox = ev.pageX
    draggable.oy = ev.pageY
    this._draggable.drags[e] = draggable
  })

  ev.stopPropagation && ev.stopPropagation()
}

exports.onDraggableMouseMove = function (ev) {
  let scale = this.state.scale || 1
  this._draggable.dragged = true
  this.props.selectedWidgets.forEach(e=> {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: e
    }, {
      x: this._draggable.drags[e].oleft + Math.round((ev.pageX - this._draggable.drags[e].ox) / scale),
      y: this._draggable.drags[e].otop + Math.round((ev.pageY - this._draggable.drags[e].oy) / scale)
    })
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onDraggableMouseUp = function (ev) {
  document.body.style.WebkitUserSelect = ""
  document.body.style.MozUserSelect = ""
  document.body.style.MsUserSelect = ""
  document.removeEventListener('mousemove', this.onDraggableMouseMove)
  document.removeEventListener('mouseup', this.onDraggableMouseUp)
  if (!this._draggable.dragged) return
  let scale = this.state.scale || 1
  this.props.selectedWidgets.forEach(e=> {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
        container: this.props.component,
        index: e
      }, {
        x: this._draggable.drags[e].oleft + Math.round((ev.pageX - this._draggable.drags[e].ox) / scale),
        y: this._draggable.drags[e].otop + Math.round((ev.pageY - this._draggable.drags[e].oy) / scale)
      }, lang.moveComponents
    )
  })
  ev.stopPropagation && ev.stopPropagation()
}

