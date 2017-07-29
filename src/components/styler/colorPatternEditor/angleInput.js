import React from 'react'
import './angleInput.less'
import PropTypes from 'prop-types'
export default class AngleInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.defaultValue || 0 }
  }
  getCenter(element) {
    var rect = element.getBoundingClientRect()
    return [
      parseInt(rect.left + rect.width / 2),
      parseInt(rect.top + rect.height / 2)
    ]
  }
  angle(vector, element) {
    var center = this.getCenter(element)
    var x = vector[0] - center[0]
    var y = vector[1] - center[1]
    return (-parseInt(Math.atan2(x, y) * 180 / Math.PI) + 180 + 360) % 360
  }
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps &&
      super.componentWillReceiveProps(nextProps)
    if (nextProps.defaultValue) {
      this.setState({ value: nextProps.defaultValue })
    }
  }
  normalize(degree) {
    var step = this.props.step || 1
    return (
      (Math.round(degree / this.props.step) * this.props.step % 360 + 360) % 360
    )
  }
  _onMouseDown = e => {
    this.beginTracking()
  }
  _onMouseMove = e => {
    this.updateWithEvent(e, false)
  }
  _onMouseUp = e => {
    this.updateWithEvent(e, true)
    this.endTracking()
  }
  beginTracking() {
    document.body.addEventListener('mousemove', this._onMouseMove, false)
    document.body.addEventListener('mouseup', this._onMouseUp, false)
    this.tracking = true
  }
  endTracking() {
    document.body.removeEventListener('mousemove', this._onMouseMove, false)
    document.body.removeEventListener('mouseup', this._onMouseUp, false)
    this.tracking = false
  }
  updateWithEvent(event, done) {
    var $dom = this.refs.container
    var vector = [event.x, event.y]
    var deg = this.angle(vector, $dom)
    var value = this.normalize(deg)
    this.setState({ value: value })
    var fx = done ? this.props.onChange : this.props.onInput
    if (fx) fx(value)
  }
  render() {
    var className = this.props.className || 'angle-input'
    var pivotClassName = this.props.pivotClassName || 'angle-input-pivot'
    return (
      <div
        ref="container"
        className={className}
        onMouseDown={this._onMouseDown}
        tabIndex={this.props.tabIndex || 0}
      >
        <span
          key="pivot"
          className={pivotClassName}
          style={{ transform: 'rotate(' + (this.state.value - 90) + 'deg)' }}
        />
        {this.props.children}
      </div>
    )
  }
}

AngleInput.propTypes = {
  defaultValue: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  className: PropTypes.string,
  pivotClassName: PropTypes.string
}

AngleInput.defaultProps = {
  defaultValue: 0,
  step: 1,
  className: 'angle-input',
  pivotClassName: 'angle-input-pivot'
}
