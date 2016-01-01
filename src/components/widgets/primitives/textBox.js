'use strict'
import React from 'react'
let TextBox = React.createClass({
  render: function () {
    return <div
      style={this.props.style}
      className={this.props.className}
      dangerouslySetInnerHTML={{__html: this.props.component.text}}
    />
  }
})
module.exports = TextBox
