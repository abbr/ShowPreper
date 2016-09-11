'use strict'
import React from 'react'
import './index.less'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
import Scalable from 'components/mixins/scalable'
import Selectable from 'components/mixins/selectable'
import Rotatable from 'components/mixins/rotatable'
import lang from 'i18n/lang'
var EditableComponent = require('components/widgets/editableComponent')
let Overview = React.createClass({
  mixins: [AutoScale, Selectable, Draggable(function () {
    return this.props.selectedWidgets
  }, function (e) {
    return {
      x: this.props.component.components[e].x || 0,
      y: this.props.component.components[e].y || 0
    }
  }, function (e, x, y) {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: e
    }, {
      x: x,
      y: y
    })
  }, function (e, x, y) {
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
        container: this.props.component,
        index: e
      }, {
        x: x,
        y: y
      }, lang.moveComponents
    )
  }), Scalable, Rotatable],
  getInitialState: function () {
    return {draggable: true}
  },
  componentWillMount: function () {
    this.mouseDownHdlrs = []
    this.mouseUpHdlrs = []
  },
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  _resized: function () {
    let bb = this.props.deck.boundingBox || this.props.deck.getDefaultDeckBoundingBox()
    let newBB = this._scale(bb)
    if (newBB) {
      this.props.onSelectedWidgetUpdated({container: this.props.deck, index: -1}, {boundingBox: newBB})
    }
  },
  zoom: function (pct) {
    let bb = this.props.deck.boundingBox || this.props.deck.getDefaultDeckBoundingBox()
    let width = bb.right - bb.left
    let height = bb.bottom - bb.top
    let cx = bb.left + width / 2
    let cy = bb.top + height / 2
    let newWidth = width * (1 + pct)
    let newHeight = height * (1 + pct)
    let newLeft = cx - newWidth / 2
    let newRight = cx + newWidth / 2
    let newTop = cy - newHeight / 2
    let newBottom = cy + newHeight / 2
    let newBB = {top: newTop, right: newRight, bottom: newBottom, left: newLeft}
    this.props.onSelectedWidgetUpdated({container: this.props.deck, index: -1}, {boundingBox: newBB})
    this._resized()
  },
  zoomIn: function () {
    this.zoom(-0.1)
    this.zoomInTimer = setInterval(()=>this.zoom(-0.1), 100)
  },
  stopZoomIn: function () {
    clearInterval(this.zoomInTimer)
  },
  zoomOut: function () {
    this.zoom(0.1)
    this.zoomOutTimer = setInterval(()=>this.zoom(0.1), 100)
  },
  stopZoomOut: function () {
    clearInterval(this.zoomOutTimer)
  },
  onMouseUp: function () {
    this.mouseUpHdlrs.forEach(e=>e.apply(this, arguments))
  },
  onMouseDown: function () {
    this.mouseDownHdlrs.forEach(e=>e.apply(this, arguments))
  },
  render: function () {
    let selectedWidgets = this.props.deck.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    let deckView = this.props.deck.components.map((component, index) => {
      if (component.type === 'Slide') {
        let bb = this.props.deck.getSlideBoundingBox(component)
        component.y = bb.top
        component.x = bb.left
        component.width = bb.right - bb.left
        component.height = bb.bottom - bb.top
      }
      return (
        <EditableComponent
          componentStyle={((selectedWidgets.indexOf(index) >= 0) ? this.props.selectedSlidesStyle : null) || component.style || this.props.defaultSlideStyle || this.props.deck.defaultSlideStyle || {}}
          className="sp-overview-component"
          component={component}
          container={this.props.deck}
          key={index}
          idx={index}
          ref={index}
          scale={this.state.scale}
          selected={selectedWidgets.indexOf(index) >= 0}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onScaleMouseDown={this.onScaleMouseDown}
          onRotateMouseDown={this.onRotateMouseDown}
          onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
        />
      )
    })
    return (
      <div
        onMouseDown={this.onSelectionMouseDown}
        className="sp-overview" style={this.props.entirePresentationStyle || this.props.deck.style}>
        <span className='glyphicon glyphicon-zoom-in'
              onMouseDown={this.zoomIn}
              onMouseUp={this.stopZoomIn}
        />
        <span className='glyphicon glyphicon-zoom-out'
              onMouseDown={this.zoomOut}
              onMouseUp={this.stopZoomOut}
        />
        <div
          className="sp-overview-deck"
          style={this.state.scaleStyle}>
          {deckView}
        </div>
      </div>
    )
  }
})

module.exports = Overview
