'use strict'
import React from 'react'

let SkewControl = React.createClass({
  onMouseDown: function (ev) {
    this.props.onRotateMouseDown(ev, this.props.idx, this.props.axis, 'skew')
  },
  render: function () {
    return <span
      onMouseDown={this.onMouseDown}
      className={"skew-"+this.props.axis}>♢</span>
  }
})
module.exports = SkewControl
