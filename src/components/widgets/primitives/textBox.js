'use strict'
import React from 'react'
let TextBox = React.createClass({
  render: function () {
    return <div
      style={this.props.style}
      className={this.props.className}
    >
      <div
        contentEditable={this.props.editable}
        dangerouslySetInnerHTML={{__html: this.props.component.text}}
      />
    </div>
  }
})
module.exports = TextBox
