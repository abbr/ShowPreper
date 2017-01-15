import React from 'react'
import './angleInput.less'
module.exports = React.createClass({
  displayName: 'AngleInput',
  getCenter: function (element) {
    var rect = element.getBoundingClientRect()
    return [
      parseInt(rect.left + (rect.width / 2)),
      parseInt(rect.top + (rect.height / 2)),
    ]
  },
  angle: function (vector, element) {
    var center = this.getCenter(element)
    var x = vector[0] - center[0]
    var y = vector[1] - center[1]
    return (-parseInt(Math.atan2(x, y) * 180 / Math.PI) + 180 + 360) % 360
  },
  propTypes: {
    defaultValue: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onInput: React.PropTypes.func,

    className: React.PropTypes.string,
    pivotClassName: React.PropTypes.string,
  },
  getDefaultProps: function () {
    return {
      defaultValue: 0,
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
    var step = this.props.step || 1
    return (Math.round(degree / this.props.step) * this.props.step % 360 + 360) % 360
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
  render: function () {
    var className = this.props.className || 'angle-input'
    var pivotClassName = this.props.pivotClassName || 'angle-input-pivot'
    return <div
      ref='container'
      className={className}
      onMouseDown={this._onMouseDown}
      tabIndex={this.props.tabIndex || 0}
    >
      <span
        key='pivot'
        className={pivotClassName}
        style={{transform: "rotate(" + (this.state.value - 90) + "deg)"}}
      >
      </span>
      {this.props.children }
    </div>
  }
})
