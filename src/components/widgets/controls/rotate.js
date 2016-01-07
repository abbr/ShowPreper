'use strict'
import React from 'react'

let RotateControl = React.createClass({
  onMouseDown: function (ev) {
    this.props.onRotateMouseDown(ev, this.props.idx, this.props.axis)
  },
  render: function () {
    return <span
      className={"rotate-"+this.props.axis}
      onMouseDown={this.onMouseDown}
    >↻</span>
  }
})
module.exports = RotateControl

