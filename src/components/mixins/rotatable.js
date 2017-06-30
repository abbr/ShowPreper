'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'
import _ from 'lodash'

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onRotateMouseMove)
  document.removeEventListener('touchmove', this.onRotateMouseMove)
  document.removeEventListener('mouseup', this.onRotateMouseUp)
  document.removeEventListener('touchend', this.onRotateMouseUp)
}

exports.onRotateMouseDown = function (ev, idx, _axis, _operation) {
  let axis = _axis || 'z'
  let operation = _operation || 'rotate'
  // only left mouse button or touchstart
  if (ev.button !== 0 && ev.type !== 'touchstart') return
  document.addEventListener('mousemove', this.onRotateMouseMove)
  document.addEventListener('touchmove', this.onRotateMouseMove)
  document.addEventListener('mouseup', this.onRotateMouseUp)
  document.addEventListener('touchend', this.onRotateMouseUp)
  document.body.style.WebkitUserSelect = "none"
  document.body.style.MozUserSelect = "none"
  document.body.style.MsUserSelect = "none"

  let rotatable = {}
  rotatable.rotates = []
  this._rotatable = rotatable
  rotatable.selectedIdx = idx
  rotatable.axis = axis.toLowerCase()
  rotatable.operation = operation
  rotatable.sign = (operation === 'skew' && rotatable.axis === 'x') ? -1 : 1
  let computedStyle = ReactDOM.findDOMNode(this.refs[idx]).getBoundingClientRect()
  rotatable.cX = computedStyle.left + computedStyle.width / 2
  rotatable.cY = computedStyle.top + computedStyle.height / 2
  rotatable.oX = ev.targetTouches ? ev.targetTouches[0].clientX : ev.clientX
  rotatable.oY = ev.targetTouches ? ev.targetTouches[0].clientY : ev.clientY
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
  ev.preventDefault && ev.preventDefault()
}

exports.onRotateMouseMove = function (ev) {
  ev.stopPropagation && ev.stopPropagation()
  ev.preventDefault && ev.preventDefault()
  let deltaRotate = this.computeDeltaRotate(ev) * this._rotatable.sign
  this.props.selectedWidgets.forEach(e=> {
    let axis = this._rotatable.axis.toLowerCase()
    let newRotateAngle = (this._rotatable.rotates[e][axis] + deltaRotate) % (2 * Math.PI)
    if (ev.ctrlKey) {
      let deg = newRotateAngle * 180 / Math.PI
      newRotateAngle = Math.round(deg / 10) * 10 * Math.PI / 180
    }
    let newRotate = _.cloneDeep(this._rotatable.rotates[e])
    newRotate[axis] = newRotateAngle
    let newOperation = {}
    newOperation[this._rotatable.operation] = newRotate
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: e
    }, newOperation)
  })
}

exports.onRotateMouseUp = function (ev) {
  document.body.style.WebkitUserSelect = ""
  document.body.style.MozUserSelect = ""
  document.body.style.MsUserSelect = ""
  document.removeEventListener('mousemove', this.onRotateMouseMove)
  document.removeEventListener('touchmove', this.onRotateMouseMove)
  document.removeEventListener('mouseup', this.onRotateMouseUp)
  document.removeEventListener('touchend', this.onRotateMouseUp)
  let deltaRotate = this.computeDeltaRotate(ev) * this._rotatable.sign
  this.props.selectedWidgets.forEach(e=> {
    let axis = this._rotatable.axis.toLowerCase()
    let newRotateAngle = (this._rotatable.rotates[e][axis] + deltaRotate) % (2 * Math.PI)
    if (ev.ctrlKey) {
      let deg = newRotateAngle * 180 / Math.PI
      newRotateAngle = Math.round(deg / 10) * 10 * Math.PI / 180
    }
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
  ev.preventDefault && ev.preventDefault()
}

exports.computeDeltaRotate = function (ev) {
  let rotatable = this._rotatable
  let clientX = ev.clientX
  let clientY = ev.clientY
  if (ev.targetTouches) {
    if (ev.targetTouches.length > 0) {
      clientX = ev.targetTouches[0].clientX
      clientY = ev.targetTouches[0].clientY
    }
    else if (ev.changedTouches && ev.changedTouches.length > 0) {
      clientX = ev.changedTouches[0].clientX
      clientY = ev.changedTouches[0].clientY
    }
  }
  let pC = {
    x: rotatable.cX,
    y: rotatable.cY
  }
  let pN = {
    x: clientX,
    y: clientY
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
