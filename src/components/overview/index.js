'use strict'
import React from 'react'
import './index.less'
var EditableComponent = require('components/widgets/editableComponent')
import AutoScale from 'components/mixins/autoScale'
let Overview = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  getInitialState: function () {
    return {}
  },
  _resized: function () {
    let bb = this.props.deck.boundingBox || this.props.deck.getDefaultDeckBoundingBox()
    this._scale({width: bb.right - bb.left, height: bb.bottom - bb.top})
  },
  render: function () {
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
          className="sp-overview-component"
          component={component}
          key={index}
          idx={index}
          ref={index}
        />
      )
    })
    return (
      <div
        className="sp-overview">
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
