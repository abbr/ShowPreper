import React from 'react'
import './angleInput.less'
module.exports = React.createClass({
  displayName: 'AngleInput',
  radToDeg: function (rad) {
    return rad * (180 / Math.PI)
  },
  getCenter: function (element) {
    var rect = element.getBoundingClientRect()
    return [
      rect.left + (rect.width / 2),
      rect.top + (rect.height / 2),
    ]
  },
  angle: function (vector, element) {
    var center = this.getCenter(element)
    var x = vector[0] - center[0]
    var y = vector[1] - center[1]
    var deg = this.radToDeg(Math.atan2(x, y))
    deg -= 90
    if (deg < 0) deg += 360
    return deg
  },
  propTypes: {
    defaultValue: React.PropTypes.number,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onInput: React.PropTypes.func,

    className: React.PropTypes.string,
    pivotClassName: React.PropTypes.string,
  },
  getDefaultProps: function () {
    return {
      defaultValue: 0,
      max: 360,
      min: 0,
      step: 1,

      className: 'angle-input',
      pivotClassName: 'angle-input-pivot',
    }
  },
  getInitialState: function () {
    return {value: this.props.defaultValue || 0}
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.defaultValue) {
      this.setState({value: nextProps.defaultValue})
    }
  },
  normalize: function (degree) {
    var max = this.props.max
    var min = this.props.min
    var step = this.props.step || 1
    var n = Math.max(min, Math.min(degree, max))
    var s = n - (n % step)
    var high = Math.ceil(n / step)
    var low = Math.round(n / step)
    return high >= (n / step) ? (high * step == 360) ? 0 : (high * step) : low * step
  },
  _onFocus: function (e) {
    this.beginKeyboardInput()
  },
  _onBlur: function (e) {
    this.endKeyboardInput()
  },
  _onKeyDown: function (e) {
    var max = this.props.max
    var min = this.props.min
    var step = this.props.step || 1
    var value = this.state.value

    var LEFT_ARROW = 37
    var UP_ARROW = 38
    var RIGHT_ARROW = 39
    var DOWN_ARROW = 40

    var dir = 0
    switch (e.keyCode) {
      case UP_ARROW:
      case RIGHT_ARROW:
        dir = 1
        break
      case DOWN_ARROW:
      case LEFT_ARROW:
        dir = -1
        break
    }
    var val = value + (dir * step)
    if (val === max + 1) val = min
    if (val === min - 1) val = max - 1
    val = this.normalize(val)
    if (dir) {
      e.preventDefault()
      this.setState({value: val})
      if (this.props.onChange) {
        this.props.onChange(val)
      }
    }
  },
  _onMouseDown: function (e) {
    this.beginTracking()
  },
  _onMouseMove: function (e) {
    this.updateWithEvent(e, false)
  },
  _onMouseUp: function (e) {
    this.updateWithEvent(e, true)
    this.endTracking()
  },
  beginTracking: function () {
    document.body.addEventListener('mousemove', this._onMouseMove, false)
    document.body.addEventListener('mouseup', this._onMouseUp, false)
    this.tracking = true
  },
  endTracking: function () {
    document.body.removeEventListener('mousemove', this._onMouseMove, false)
    document.body.removeEventListener('mouseup', this._onMouseUp, false)
    this.tracking = false
  },
  updateWithEvent: function (event, done) {
    var $dom = this.refs.container
    var vector = [event.x, event.y]
    var deg = this.angle(vector, $dom)
    var value = this.normalize(deg)
    this.setState({value: value})
    var fx = done ? this.props.onChange : this.props.onInput
    if (fx) fx(value)
  },
  beginKeyboardInput: function () {
    document.body.addEventListener('keydown', this._onKeyDown, false)
    this.keyboardInput = true
  },
  endKeyboardInput: function () {
    document.body.removeEventListener('keydown', this._onKeyDown, false)
    this.keyboardInput = false
  },
  render: function () {
    var className = this.props.className || 'angle-input'
    var pivotClassName = this.props.pivotClassName || 'angle-input-pivot'
    return <div
      ref='container'
      className={className}
      onFocus={this._onFocus}
      onBlur={this._onBlur}
      onMouseDown={this._onMouseDown}
      tabIndex={this.props.tabIndex || 0}
    >
      <span
        key='pivot'
        className={pivotClassName}
        style={{transform: "rotate(-" + this.state.value + "deg)"}}
      >
      </span>
      {this.props.children }
    </div>
  }
})
