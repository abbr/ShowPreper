'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onRotateMouseMove)
  document.removeEventListener('mouseup', this.onRotateMouseUp)
}

exports.onRotateMouseDown = function (ev, idx) {
  // only left mouse button
  if (ev.button !== 0) return
  document.addEventListener('mousemove', this.onRotateMouseMove)
  document.addEventListener('mouseup', this.onRotateMouseUp)
  document.body.style.WebkitUserSelect = "none"
  document.body.style.MozUserSelect = "none"
  document.body.style.MsUserSelect = "none"

  this._scalable = {}
  this._scalable.rotates = []
  this._scalable.selectedIdx = idx
  let slide = this.props.deck.getSelectedSlide()
  this.selectedWidgets.forEach(e => {
    let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this.refs[e]))
    let scalable = {}
    scalable.oWidth = parseInt(computedStyle.width) || 1
    scalable.oHeight = parseInt(computedStyle.height) || 1
    scalable.osx = (slide.components[e].rotate && slide.components[e].rotate.x) || 1
    scalable.osy = (slide.components[e].rotate && slide.components[e].rotate.y) || 1
    scalable.ox = ev.pageX
    scalable.oy = ev.pageY
    this._scalable.rotates[e] = scalable
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onRotateMouseUp = function (ev) {
  document.body.style.WebkitUserSelect = ""
  document.body.style.MozUserSelect = ""
  document.body.style.MsUserSelect = ""
  document.removeEventListener('mousemove', this.onRotateMouseMove)
  document.removeEventListener('mouseup', this.onRotateMouseUp)
  let deltaRotate = this.computeDeltaRotate(ev)
  this.selectedWidgets.forEach(e=> {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
        rotate: {
          x: this._scalable.rotates[e].osx * deltaRotate,
          y: this._scalable.rotates[e].osy * deltaRotate
        }
      },
      lang.rotateComponents
    )
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onRotateMouseMove = function (ev) {
  let deltaRotate = this.computeDeltaRotate(ev)
  this.selectedWidgets.forEach(e=> {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
      rotate: {
        x: this._scalable.rotates[e].osx * deltaRotate,
        y: this._scalable.rotates[e].osy * deltaRotate
      }
    })
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.computeDeltaRotate = function (ev) {
}
