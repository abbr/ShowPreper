'use strict'
import React from "react"

let FileEntry = React.createClass({
  render: function () {
    return <div>{this.props.name}</div>
  }
})
module.exports = FileEntry
