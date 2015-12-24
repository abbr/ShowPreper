'use strict'
import React from 'react'
import lang from 'i18n/lang'
let TextBox = React.createClass({
  render: function () {
    return (
      <div {...this.props}
        className="sp-widget"
        style={{left: this.props.component.x, top: this.props.component.y}}>
        <div dangerouslySetInnerHTML={{__html: this.props.component.text}}/>
        {this.props.children}
      </div>)
  }
})
module.exports = TextBox
