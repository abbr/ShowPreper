'use strict'

exports.componentWillMount = function () {
  if (!this.props.editable) return
  this.onDrag && document.addEventListener('drag', this.onDrag)
  this.onDragStart && document.addEventListener('dragstart', this.onDragStart)
  this.onDragEnd && document.addEventListener('dragend', this.onDragEnd)
}

exports.componentWillUnmount = function () {
  if (!this.props.editable) return
  this.onDrag && document.removeEventListener('drag', this.onDrag)
  this.onDragStart && document.removeEventListener('dragstart', this.onDragStart)
  this.onDragEnd && document.removeEventListener('dragend', this.onDragEnd)
}
