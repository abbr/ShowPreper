'use strict'
import React from 'react'
import lang from 'i18n/lang'
let TextBox = React.createClass({
  render: function () {
    return (
      <div className="sp-widget"
           draggable="true"
           style={{left: this.props.x, top: this.props.y}}
           dangerouslySetInnerHTML={{__html: this.props.text}}>
      </div>)
  }
})
module.exports = TextBox
