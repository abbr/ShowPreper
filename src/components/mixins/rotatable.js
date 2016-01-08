'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'
import _ from 'lodash'

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onRotateMouseMove)
  document.removeEventListener('mouseup', this.onRotateMouseUp)
}

exports.onRotateMouseDown = function (ev, idx, _axis, _operation) {
  let axis = _axis || 'z'
  let operation = _operation || 'rotate'
  // only left mouse button
  if (ev.button !== 0) return
  document.addEventListener('mousemove', this.onRotateMouseMove)
  document.addEventListener('mouseup', this.onRotateMouseUp)
  document.body.style.WebkitUserSelect = "none"
  document.body.style.MozUserSelect = "none"
  document.body.style.MsUserSelect = "none"

  let rotatable = {}
  rotatable.rotates = []
  this._rotatable = rotatable
  rotatable.selectedIdx = idx
  rotatable.axis = axis.toLowerCase()
  rotatable.operation=operation
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
  this.props.selectedWidgets.forEach(e => {
    rotatable.rotates[e] = _.cloneDeep(this.props.component.components[e][operation]) || {x: 0, y: 0, z: 0}
    rotatable.rotates[e][axis] = rotatable.rotates[e][axis] || 0
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onRotateMouseMove = function (ev) {
  let deltaRotate = this.computeDeltaRotate(ev)
  this.props.selectedWidgets.forEach(e=> {
    let axis = this._rotatable.axis.toLowerCase()
    let newRotateAngle = (this._rotatable.rotates[e][axis] + deltaRotate) % (2 * Math.PI)
    let newRotate = _.cloneDeep(this._rotatable.rotates[e])
    newRotate[axis] = newRotateAngle
    let newOperation = {}
    newOperation[this._rotatable.operation] = newRotate
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: e
    }, newOperation)
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
  this.props.selectedWidgets.forEach(e=> {
    let axis = this._rotatable.axis.toLowerCase()
    let newRotateAngle = (this._rotatable.rotates[e][axis] + deltaRotate) % (2 * Math.PI)
    let newRotate = _.cloneDeep(this._rotatable.rotates[e])
    newRotate[axis] = newRotateAngle
    let newOperation = {}
    newOperation[this._rotatable.operation] = newRotate

    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
        container: this.props.component,
        index: e
      }, newOperation,
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
