'use strict'
import React from 'react'

let RotateControl = React.createClass({
  onMouseDown: function (ev) {
    this.props.onRotateMouseDown(ev, this.props.idx)
  },
  render: function () {
    return <span
      className="rightLabel rotate"
      onMouseDown={this.onMouseDown}
    >↻</span>
  }
})
module.exports = RotateControl

