'use strict'
import React from 'react'

let FileEntry = React.createClass({
  onOpen: function () {
    this.props.onNewDeck(this.props.name)
  },
  render: function () {
    return <div><a href="#" onClick={this.onOpen}>{this.props.name}</a></div>
  }
})
module.exports = FileEntry
