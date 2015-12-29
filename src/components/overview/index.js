'use strict'
import React from 'react'
import './index.less'
var DisplayableComponent = require('components/widgets/displayableComponent')
import AutoScale from 'components/mixins/autoScale'
let Overview = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    this._resized()
  },
  getInitialState: function () {
    return {}
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
      return (
        <div
          key = {index}
        >
          {componentsView}
        </div>
      )
    })
    return (
      <div
        className="sp-overview">
        <div
          style={this.state.scaleStyle}>
          {deckView}
        </div>
      </div>
    )
  }
})

module.exports = Overview
