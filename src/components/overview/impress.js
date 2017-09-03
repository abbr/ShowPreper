'use strict'
import React from 'react'
import './impress.less'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
import Scalable from 'components/mixins/scalable'
import Selectable from 'components/mixins/selectable'
import Rotatable from 'components/mixins/rotatable'
import Killable from 'components/mixins/killable'
import lang from 'i18n/lang'
import _ from 'lodash'
var EditableComponent = require('components/widgets/editableComponent')
module.exports = class extends Draggable.draggableMixin(
  Rotatable.rotatableMixin(
    Scalable.scalableMixin(
      Killable.killableMixin(
        Selectable.selectableMixin(AutoScale.autoScaleMixin(React.Component))
      )
    )
  ),
  function getSelectedWidgets() {
    return this.props.selectedWidgets
  },
  function getInitialWidgetPosition(e) {
    return {
      x: this.props.component.components[e].x || 0,
      y: this.props.component.components[e].y || 0,
      z: this.props.component.components[e].z || 0
    }
  },
  function mouseMoveWidgetUpdateFunction(e, updatedProps) {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        updatedProps
      )
  },
  function mouseUpWidgetUpdateFunction(e, updatedProps) {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        updatedProps,
        lang.moveComponents
      )
  }
) {
  constructor(props) {
    super(props)
    this.state = { draggable: true }
  }
  componentWillMount() {
    super.componentWillMount && super.componentWillMount()
    this.mouseDownHdlrs = []
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    this._resized()
    window.addEventListener('resize', this._windowResized)
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this._windowResized)
  }
  _windowResized = () => {
    this._resized(true)
  }

  _resized = recomputeDomSize => {
    let bb =
      this.props.deck.boundingBox || this.props.deck.getDefaultDeckBoundingBox()
    let newBB = this._scale(bb, recomputeDomSize)
    if (newBB) {
      this.props.onSelectedWidgetUpdated(
        { container: this.props.deck, index: -1 },
        { boundingBox: newBB }
      )
    }
  }
  zoom(pct) {
    let bb =
      this.props.deck.boundingBox || this.props.deck.getDefaultDeckBoundingBox()
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
    let newBB = {
      top: newTop,
      right: newRight,
      bottom: newBottom,
      left: newLeft
    }
    this.props.onSelectedWidgetUpdated(
      { container: this.props.deck, index: -1 },
      { boundingBox: newBB }
    )
    this._resized()
  }
  zoomIn = () => {
    this.zoom(-0.1)
    this.zoomInTimer = setInterval(() => this.zoom(-0.1), 100)
  }
  stopZoomIn = () => {
    clearInterval(this.zoomInTimer)
  }
  zoomOut = () => {
    this.zoom(0.1)
    this.zoomOutTimer = setInterval(() => this.zoom(0.1), 100)
  }
  stopZoomOut = () => {
    clearInterval(this.zoomOutTimer)
  }
  onMouseDown = (...args) => {
    this.mouseDownHdlrs.forEach(
      function(e) {
        e.apply(this, args)
      }.bind(this)
    )
  }
  setDraggable = draggable => {
    this.setState({ draggable: draggable })
  }
  render() {
    let selectedWidgets = this.props.deck.components.reduce((pv, e, i, a) => {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    let deckView = this.props.deck.components.map((e, index) => {
      let component = _.cloneDeep(e)
      if (e.type === 'Slide') {
        let bb = this.props.deck.getSlideBoundingBox(e)
        component.y = bb.top
        component.x = bb.left
        component.width = bb.right - bb.left
        component.height = bb.bottom - bb.top
      }
      return (
        <EditableComponent
          componentStyle={
            (selectedWidgets.indexOf(index) >= 0
              ? this.props.selectedSlidesStyle
              : null) ||
            component.style ||
            this.props.defaultSlideStyle ||
            this.props.deck.defaultSlideStyle ||
            {}
          }
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
          onKillMouseDown={this.onKillMouseDown}
          onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          setDraggable={this.setDraggable}
        />
      )
    })
    let deckStyle = _.clone(this.state.scaleStyle)
    if (deckStyle && this.props.deck.perspective) {
      deckStyle.perspective =
        this.props.deck.perspective / (this.state.scale || 1) + 'px'
    }
    return (
      <div
        onMouseDown={this.onSelectionMouseDown}
        className="sp-overview"
        style={this.props.presentationStyle || this.props.deck.style}
      >
        <span
          className="glyphicon glyphicon-zoom-in"
          onMouseDown={this.zoomIn}
          onMouseUp={this.stopZoomIn}
        />
        <span
          className="glyphicon glyphicon-zoom-out"
          onMouseDown={this.zoomOut}
          onMouseUp={this.stopZoomOut}
        />
        <div className="sp-overview-deck" style={deckStyle}>
          {deckView}
        </div>
      </div>
    )
  }
}
