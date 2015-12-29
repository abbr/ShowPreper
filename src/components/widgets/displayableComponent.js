'use strict'
import React from 'react'
import classNames from 'classnames'

let DisplayableComponent = React.createClass({
  render: function () {
    const WidgetFactory = require('./widgetFactory')
    let Widget = WidgetFactory(this.props.component)

    let widgetStyle = {}
    this.props.component.x && (widgetStyle.left = this.props.component.x)
    this.props.component.y && (widgetStyle.top = this.props.component.y)
    this.props.component.width && (widgetStyle.width = this.props.component.width)
    this.props.component.height && (widgetStyle.height = this.props.component.height)
    let scaleX = (this.props.component.scale && this.props.component.scale.x) || 1
    let scaleY = (this.props.component.scale && this.props.component.scale.y) || 1
    widgetStyle.transform = "scale(" + scaleX + "," + scaleY + ")"
    if (this.props.component.rotate) {
      widgetStyle.transform += " rotate(" + this.props.component.rotate + "rad)"
    }
    return (
      <div
        {...this.props}
        className={classNames("sp-widget",this.props.className)}
        style={widgetStyle}>
        <Widget
          className={this.props.className}
          component={this.props.component}
        />
        {this.props.children}
      </div>)
  }
})
module.exports = DisplayableComponent
