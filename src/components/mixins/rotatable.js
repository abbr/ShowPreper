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

  let scale = this.state.scale || 1
  let rotatable = {}
  rotatable.rotates = []
  this._rotatable = rotatable
  rotatable.selectedIdx = idx
  let slide = this.props.deck.getSelectedSlide()
  let computedStyle = ReactDOM.findDOMNode(this.refs[idx]).getBoundingClientRect()
  rotatable.cX = computedStyle.left + computedStyle.width / 2
  rotatable.cY = computedStyle.top + computedStyle.height / 2
  rotatable.oX = ev.clientX
  rotatable.oY = ev.clientY
  let pC = {
    x: rotatable.cX,
    y: rotatable.cY
  }
  let pO = {
    x: rotatable.oX,
    y: rotatable.oY
  }
  rotatable.aO = this.computeAngle(pC, pO)

  if(!this.selectedWidgets) {
    this.selectedWidgets = slide.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
  }

  this.selectedWidgets.forEach(e => {
    rotatable.rotates[e] = slide.components[e].rotate
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onRotateMouseMove = function (ev) {
  let deltaRotate = this.computeDeltaRotate(ev)
  this.selectedWidgets.forEach(e=> {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
      rotate: this._rotatable.rotates[e] + deltaRotate
    })
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
        rotate: this._rotatable.rotates[e] + deltaRotate
      },
      lang.rotateComponents
    )
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.computeDeltaRotate = function (ev) {
  let rotatable = this._rotatable
  let pC = {
    x: rotatable.cX,
    y: rotatable.cY
  }
  let pN = {
    x: ev.clientX,
    y: ev.clientY
  }
  let aN = this.computeAngle(pC, pN)
  return aN - rotatable.aO
}

exports.computeAngle = function (o, p) {
  let lPO = Math.sqrt(Math.pow(p.x - o.x, 2) + Math.pow(p.y - o.y, 2))
  let a = Math.asin((p.y - o.y) / lPO)
  if (p.x >= o.x) {
    if (a < 0) a += 2 * Math.PI
  }
  else {
    a = Math.PI - a
  }
  return a
}
