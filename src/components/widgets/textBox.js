'use strict'
import React from 'react'
import lang from 'i18n/lang'
import classNames from 'classnames'

let TextBox = React.createClass({
  render: function () {
    return (
      <div {...this.props}
        className="sp-widget"
        style={{left: this.props.component.x, top: this.props.component.y}}>
        <div className={this.props.className} dangerouslySetInnerHTML={{__html: this.props.component.text}}/>
        {this.props.children}
      </div>)
  }
})
module.exports = TextBox
