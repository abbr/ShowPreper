'use strict'
import React from 'react'
import classNames from 'classnames'

let DisplayableComponent = React.createClass({
  render: function () {
    const WidgetFactory = require('./widgetFactory')
    let Widget = WidgetFactory(this.props.component)

    let widgetStyle = {transform: ''}, componentStyle = {transform: ''}

    let translate3D = {}
    translate3D.x = this.props.component.x || 0
    translate3D.y = this.props.component.y || 0
    translate3D.z = this.props.component.z || 0
    componentStyle.transform += ' translate3d(' + translate3D.x + 'px,' + translate3D.y + 'px,' + translate3D.z + 'px)'
    this.props.component.width && (componentStyle.width = this.props.component.width)
    this.props.component.height && (componentStyle.height = this.props.component.height)
    let scaleX = (this.props.component.scale && this.props.component.scale.x) || 1
    let scaleY = (this.props.component.scale && this.props.component.scale.y) || 1
    componentStyle.transform += " scale(" + scaleX + "," + scaleY + ")"
    if (this.props.component.rotate) {
      let rotStr = ''
      this.props.component.rotate.z && (rotStr += " rotateZ(" + this.props.component.rotate.z + "rad)")
      this.props.component.rotate.y && (rotStr += " rotateY(" + this.props.component.rotate.y + "rad)")
      this.props.component.rotate.x && (rotStr += " rotateX(" + this.props.component.rotate.x + "rad)")
      if(this.props.combinedTransform){
        componentStyle.transform += rotStr
      }
      else{
        widgetStyle.transform += rotStr
      }
    }
    return (
      <div
        {...this.props}
        className={classNames("sp-component", this.props.ownClassName,this.props.className)}
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
