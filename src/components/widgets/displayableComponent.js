'use strict'
import React from 'react'
import classNames from 'classnames'
let _ = require('lodash')

let DisplayableComponent = class extends React.Component {
  render() {
    const {
      component,
      container,
      onSelectedWidgetUpdated,
      idx,
      onScaleMouseDown,
      onRotateMouseDown,
      onKillMouseDown,
      setDraggable,
      editable,
      componentStyle,
      ownClassName,
      combinedTransform,
      ...rest
    } = this.props
    const WidgetFactory = require('./widgetFactory')
    let Widget = WidgetFactory(component)

    let widgetStyle = _.merge({ transform: '' }, componentStyle || {}),
      thisComponentStyle = { transform: '' }

    if (component.perspective) {
      thisComponentStyle.transform +=
        ' perspective(' + component.perspective + 'px)'
    }
    let translate3D = {}
    translate3D.x = component.x || 0
    translate3D.y = component.y || 0
    translate3D.z = component.z || 0
    if (!(translate3D.x === 0 && translate3D.y === 0 && translate3D.z === 0)) {
      thisComponentStyle.transform +=
        ' translate3d(' +
        translate3D.x +
        'px,' +
        translate3D.y +
        'px,' +
        translate3D.z +
        'px)'
    }
    component.width && (thisComponentStyle.width = component.width)
    component.height && (thisComponentStyle.height = component.height)
    let scaleX = (component.scale && component.scale.x) || 1
    let scaleY = (component.scale && component.scale.y) || 1
    if (!(scaleX === 1 && scaleY === 1)) {
      thisComponentStyle.transform += ' scale(' + scaleX + ',' + scaleY + ')'
    }
    if (component.rotate) {
      let rotStr = ''
      component.rotate.x &&
        (rotStr += ' rotateX(' + component.rotate.x + 'rad)')
      component.rotate.y &&
        (rotStr += ' rotateY(' + component.rotate.y + 'rad)')
      component.rotate.z &&
        (rotStr += ' rotateZ(' + component.rotate.z + 'rad)')
      if (this.props.combinedTransform) {
        thisComponentStyle.transform += rotStr
      } else {
        widgetStyle.transform += rotStr
      }
    }
    if (component.skew) {
      let rotStr = ''
      component.skew.y && (rotStr += ' skewY(' + component.skew.y + 'rad)')
      component.skew.x && (rotStr += ' skewX(' + component.skew.x + 'rad)')
      if (this.props.combinedTransform) {
        thisComponentStyle.transform += rotStr
      } else {
        widgetStyle.transform += rotStr
      }
    }
    if (widgetStyle.transform === '') {
      delete widgetStyle.transform
    }
    if (thisComponentStyle.transform === '') {
      delete thisComponentStyle.transform
    }
    return (
      <div
        {...rest}
        className={classNames(
          'sp-component',
          this.props.ownClassName,
          this.props.className
        )}
        style={thisComponentStyle}
      >
        <div className={this.props.className} style={{ height: '100%' }}>
          <Widget
            {...this.props}
            className="sp-widget"
            style={widgetStyle}
            setDraggable={this.props.setDraggable}
          />
        </div>
        {this.props.children}
      </div>
    )
  }
}
module.exports = DisplayableComponent
