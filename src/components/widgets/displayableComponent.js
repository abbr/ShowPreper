'use strict'
import React from 'react'
import classNames from 'classnames'

let DisplayableComponent = React.createClass({
  render: function () {
    const WidgetFactory = require('./widgetFactory')
    let Widget = WidgetFactory(this.props.component)

    let widgetStyle = {}, componentStyle = {}
    this.props.component.x && (componentStyle.left = this.props.component.x)
    this.props.component.y && (componentStyle.top = this.props.component.y)
    this.props.component.width && (componentStyle.width = this.props.component.width)
    this.props.component.height && (componentStyle.height = this.props.component.height)
    let scaleX = (this.props.component.scale && this.props.component.scale.x) || 1
    let scaleY = (this.props.component.scale && this.props.component.scale.y) || 1

    componentStyle.transform = "scale(" + scaleX + "," + scaleY + ")"
    if (this.props.component.rotate) {
      widgetStyle.transform = "rotate(" + this.props.component.rotate + "rad)"
    }
    return (
      <div
        {...this.props}
        className={classNames("sp-component",this.props.className)}
        style={componentStyle}>
        <div
          className={this.props.className}
        >
          <Widget
            className="sp-widget"
            component={this.props.component}
            style={widgetStyle}
          />
        </div>
        {this.props.children}
      </div>)
  }
})
module.exports = DisplayableComponent
