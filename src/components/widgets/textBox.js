'use strict'
import React from 'react'
import lang from 'i18n/lang'
import classNames from 'classnames'

let TextBox = React.createClass({
  render: function () {
    let widgetStyle = {}
    this.props.component.x && (widgetStyle.left = this.props.component.x)
    this.props.component.y && (widgetStyle.top = this.props.component.y)
    let scaleX = (this.props.component.scale && this.props.component.scale.x) || 1
    let scaleY = (this.props.component.scale && this.props.component.scale.y) || 1
    widgetStyle.transform = "scale(" + scaleX + "," + scaleY + ")"
    widgetStyle.transformOrigin = '0 0'

    return (
      <div
        {...this.props}
        className={classNames("sp-widget",this.props.className)}
        style={widgetStyle}>
        <div
          className={this.props.className}
          dangerouslySetInnerHTML={{__html: this.props.component.text}}
        />
        {this.props.children}
      </div>)
  }
})
module.exports = TextBox
