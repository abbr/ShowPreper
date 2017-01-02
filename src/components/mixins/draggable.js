'use strict'

module.exports = function (getSelectedWidgets, getInitialWidgetPosition, mouseMoveWidgetUpdateFunction, mouseUpWidgetUpdateFunction) {
  return {
    componentDidMount: function () {
      this.mouseDownHdlrs && this.mouseDownHdlrs.push(this.onDraggableMouseDown)
    },
    componentWillUnmount: function () {
      document.removeEventListener('mousemove', this.onDraggableMouseMove)
      document.removeEventListener('touchmove', this.onDraggableMouseMove)
      document.removeEventListener('mouseup', this.onDraggableMouseUp)
      document.removeEventListener('touchend', this.onDraggableMouseUp)
    },
    onDraggableMouseDown: function (ev) {
      // only left mouse button or touchstart
      if (ev.button !== 0 && ev.type !== 'touchstart') return
      if (!this.state.draggable) return
      document.addEventListener('touchmove', this.onDraggableMouseMove)
      document.addEventListener('touchend', this.onDraggableMouseUp)
      document.addEventListener('mousemove', this.onDraggableMouseMove)
      document.addEventListener('mouseup', this.onDraggableMouseUp)
      document.body.style.WebkitUserSelect = "none"
      document.body.style.MozUserSelect = "none"
      document.body.style.MsUserSelect = "none"

      this._draggable = {}
      this._draggable.drags = []
      this._draggable.dragged = false
      let selectedWidgets = getSelectedWidgets.bind(this)()
      selectedWidgets.forEach((e, i) => {
        let draggable = {}
        let p = getInitialWidgetPosition.bind(this, e, i)()
        draggable.oleft = p.x
        draggable.otop = p.y
        draggable.oz = p.z
        draggable.ox = ev.targetTouches ? ev.targetTouches[0].pageX : ev.pageX
        draggable.oy = ev.targetTouches ? ev.targetTouches[0].pageY : ev.pageY
        this._draggable.drags[i] = draggable
      })
      ev.stopPropagation && ev.stopPropagation()
    },
    onDraggableMouseMove: function (ev) {
      ev.preventDefault && ev.preventDefault()
      ev.stopPropagation && ev.stopPropagation()
      let scale = this.state.scale || 1
      let perspective = this.props.deck && this.props.deck.perspective
      this._draggable.dragged = true
      let selectedWidgets = getSelectedWidgets.bind(this)()
      selectedWidgets.forEach((e, i)=> {
        let zScale = 1
        if (perspective) {
          let scaledPerspective = perspective / scale
          let depth = scaledPerspective - this._draggable.drags[i].oz
          zScale = depth === 0 ? Infinity : scaledPerspective / depth
        }
        let updatedProps = {}
        this._draggable.shiftKey = ev.shiftKey
        let pageX = ev.targetTouches ? ev.targetTouches[0].pageX : ev.pageX
        let pageY = ev.targetTouches ? ev.targetTouches[0].pageY : ev.pageY
        if (ev.shiftKey) {
          let dx = Math.round((pageX - this._draggable.drags[i].ox) / scale)
          let dy = Math.round((pageY - this._draggable.drags[i].oy) / scale)
          let d = Math.abs(dx) > Math.abs(dy) ? dx : dy
          updatedProps.z = this._draggable.drags[i].oz + d
          if (ev.ctrlKey) {
            updatedProps.z = 10 * Math.round(updatedProps.z / 10)
          }
        }
        else {
          updatedProps.x = this._draggable.drags[i].oleft + Math.round((pageX - this._draggable.drags[i].ox) / scale / zScale)
          updatedProps.y = this._draggable.drags[i].otop + Math.round((pageY - this._draggable.drags[i].oy) / scale / zScale)
          if (ev.ctrlKey) {
            updatedProps.x = 10 * Math.round(updatedProps.x / 10)
            updatedProps.y = 10 * Math.round(updatedProps.y / 10)
          }
        }
        mouseMoveWidgetUpdateFunction && mouseMoveWidgetUpdateFunction.bind(this, e, updatedProps)()
      })
    },
    onDraggableMouseUp: function (ev) {
      if (ev.type === 'touchend' && ev.targetTouches.length > 0) {
        return
      }
      let pageX = ev.changedTouches ? ev.changedTouches[0].pageX : ev.pageX
      let pageY = ev.changedTouches ? ev.changedTouches[0].pageY : ev.pageY
      document.body.style.WebkitUserSelect = ""
      document.body.style.MozUserSelect = ""
      document.body.style.MsUserSelect = ""
      document.removeEventListener('mousemove', this.onDraggableMouseMove)
      document.removeEventListener('touchmove', this.onDraggableMouseMove)
      document.removeEventListener('mouseup', this.onDraggableMouseUp)
      document.removeEventListener('touchend', this.onDraggableMouseUp)
      if (!this._draggable.dragged) return
      let scale = this.state.scale || 1
      let perspective = this.props.deck && this.props.deck.perspective
      let selectedWidgets = getSelectedWidgets.bind(this)()
      selectedWidgets.forEach((e, i)=> {
        let zScale = 1
        if (perspective) {
          let scaledPerspective = perspective / scale
          let depth = scaledPerspective - this._draggable.drags[i].oz
          zScale = depth === 0 ? Infinity : scaledPerspective / depth
        }
        let updatedProps = {}
        if (this._draggable.shiftKey) {
          let dx = Math.round((pageX - this._draggable.drags[i].ox) / scale)
          let dy = Math.round((pageY - this._draggable.drags[i].oy) / scale)
          let d = Math.abs(dx) > Math.abs(dy) ? dx : dy
          updatedProps.z = this._draggable.drags[i].oz + d
          if (ev.ctrlKey) {
            updatedProps.z = 10 * Math.round(updatedProps.z / 10)
          }
        }
        else {
          updatedProps.x = this._draggable.drags[i].oleft + Math.round((pageX - this._draggable.drags[i].ox) / scale / zScale)
          updatedProps.y = this._draggable.drags[i].otop + Math.round((pageY - this._draggable.drags[i].oy) / scale / zScale)
          if (ev.ctrlKey) {
            updatedProps.x = 10 * Math.round(updatedProps.x / 10)
            updatedProps.y = 10 * Math.round(updatedProps.y / 10)
          }
        }
        mouseUpWidgetUpdateFunction && mouseUpWidgetUpdateFunction.bind(this, e, updatedProps)()
      })
      ev.stopPropagation && ev.stopPropagation()
      ev.preventDefault && ev.preventDefault()
    }
  }
}




