'use strict'

exports.componentWillMount: function() {
  if(this.state.oPos){}
  document.addEventListener('drag', this.onDrag)
  document.addEventListener('dragstart', this.onDragStart)
  document.addEventListener('dragend', this.onDragEnd)
}

exports.componentWillUnmount = function() {
  document.removeEventListener('drag', this.onDrag)
  document.removeEventListener('dragstart', this.onDragStart)
  document.removeEventListener('dragend', this.onDragEnd)
}
