'use strict'
import React from 'react'

let KillControl = React.createClass({
  render: function() {
    return (
      <span onMouseDown={this.props.onKillMouseDown} className="kill">
        &times;
      </span>
    )
  }
})
module.exports = KillControl
