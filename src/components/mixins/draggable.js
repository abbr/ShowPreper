'use strict'
import ReactDOM from 'react-dom'

exports.componentWillMount = function () {
  this._draggable = this._draggable || {}
}
exports.onDragStart = function(ev){
  let draggable = this._draggable
  let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this))
  draggable.oleft = parseInt(computedStyle.left, 10) || 0
  draggable.otop = parseInt(computedStyle.top, 10) || 0
  draggable.ox = ev.pageX
  draggable.oy = ev.pageY
  // hide drag ghost image
  var dragImgEl = document.createElement('span');
  ev.dataTransfer.setDragImage(dragImgEl, 0, 0);
}

exports.onDrag = function(ev){
  let draggable = this._draggable
  let scale = this.props.scale || 1
  this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(this.props.idx,{
    x: draggable.oleft + Math.round((ev.pageX-draggable.ox)/scale),
    y: draggable.otop + Math.round((ev.pageY-draggable.oy)/scale)
  })
}
