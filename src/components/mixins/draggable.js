'use strict'

module.exports = function (getSelectedWidgets, getInitialWidgetPosition, mouseMoveWidgetUpdateFunction, mouseUpWidgetUpdateFunction) {
  return {
    componentDidMount: function () {
      this.mouseDownHdlrs && this.mouseDownHdlrs.push(this.onDraggableMouseDown)
    },
    componentWillUnmount: function () {
      document.removeEventListener('mousemove', this.onDraggableMouseMove)
      document.removeEventListener('mouseup', this.onDraggableMouseUp)
    },
    onDraggableMouseDown: function (ev) {
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
      let selectedWidgets = getSelectedWidgets.bind(this)()
      selectedWidgets.forEach((e, i) => {
        let draggable = {}
        let p = getInitialWidgetPosition.bind(this, e, i)()
        draggable.oleft = p.x
        draggable.otop = p.y
        draggable.oz = p.z
        draggable.ox = ev.pageX
        draggable.oy = ev.pageY
        this._draggable.drags[i] = draggable
      })
      ev.stopPropagation && ev.stopPropagation()
    },
    onDraggableMouseMove: function (ev) {
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
        if (ev.shiftKey) {
          updatedProps.z = this._draggable.drags[i].oz + Math.round((ev.pageX - this._draggable.drags[i].ox) / scale)
        }
        else {
          updatedProps.x = this._draggable.drags[i].oleft + Math.round((ev.pageX - this._draggable.drags[i].ox) / scale / zScale)
          updatedProps.y = this._draggable.drags[i].otop + Math.round((ev.pageY - this._draggable.drags[i].oy) / scale / zScale)
        }
        mouseMoveWidgetUpdateFunction && mouseMoveWidgetUpdateFunction.bind(this, e, updatedProps)()
      })
      ev.stopPropagation && ev.stopPropagation()
    },
    onDraggableMouseUp: function (ev) {
      document.body.style.WebkitUserSelect = ""
      document.body.style.MozUserSelect = ""
      document.body.style.MsUserSelect = ""
      document.removeEventListener('mousemove', this.onDraggableMouseMove)
      document.removeEventListener('mouseup', this.onDraggableMouseUp)
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
          updatedProps.z = this._draggable.drags[i].oz + Math.round((ev.pageX - this._draggable.drags[i].ox) / scale)
        }
        else {
          updatedProps.x = this._draggable.drags[i].oleft + Math.round((ev.pageX - this._draggable.drags[i].ox) / scale / zScale)
          updatedProps.y = this._draggable.drags[i].otop + Math.round((ev.pageY - this._draggable.drags[i].oy) / scale / zScale)
        }
        mouseUpWidgetUpdateFunction && mouseUpWidgetUpdateFunction.bind(this, e, updatedProps)()
      })
      ev.stopPropagation && ev.stopPropagation()
    }
  }
}




