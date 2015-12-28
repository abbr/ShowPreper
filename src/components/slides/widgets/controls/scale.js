'use strict'
import React from 'react'

let ScaleControl = React.createClass({
  onMouseDown: function (ev) {
    this.props.onScaleMouseDown(ev, this.props.idx)
  },
  render: function () {
    return <span
      onMouseDown={this.onMouseDown}
      className="scale">↔</span>
  }
})
module.exports = ScaleControl

