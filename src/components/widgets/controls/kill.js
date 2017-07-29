'use strict'
import React from 'react'

let KillControl = class extends React.Component {
  render() {
    return (
      <span onMouseDown={this.props.onKillMouseDown} className="kill">
        &times;
      </span>
    )
  }
}
module.exports = KillControl
