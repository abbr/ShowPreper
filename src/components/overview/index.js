'use strict'
import React from 'react'
import './index.less'
var DisplayableComponent = require('components/widgets/displayableComponent')
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
    let deckView = this.props.deck.slides.map((slide, index) => {
      let componentsView = slide.components.map((component, index)=> {
        return (
          <DisplayableComponent
            component={component}
            key={index}
          />
        )
      })

      let slideStyle = {}
      let bb = this.props.deck.getSlideBoundingBox(slide, index)
      slideStyle.top = bb.top
      slideStyle.left = bb.left
      slideStyle.width = bb.right - bb.left
      slideStyle.height = bb.bottom - bb.top
      return (
        <div
          className="sp-overview-slide"
          key={index}
          style={slideStyle}
        >
          {componentsView}
        </div>
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
