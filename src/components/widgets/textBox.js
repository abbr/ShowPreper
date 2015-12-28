'use strict'
import React from 'react'
let TextBox = React.createClass({
  render: function () {
    return <div
      className={this.props.className}
      dangerouslySetInnerHTML={{__html: this.props.component.text}}
    />
  }
})
module.exports = TextBox
