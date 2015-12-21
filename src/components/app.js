'use strict'
import 'normalize.css'
import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import 'styles/App.less'

import React from 'react'
import Header from 'components/header'
import Main from 'components/main'
import DeckStore from 'stores/deck'
import _ from 'lodash'

let App = React.createClass({
  getInitialState: () => DeckStore.getDefaultDeck(),
  onSlideClicked: function (i) {
    let deck = this.state.deck
    deck.selectSlide(i)
    this.setState({
      deck: deck
    })
  },
  onSelectedWidgetUpdated: function (widgetIdx, newProps) {
    let deck = this.state.deck
    let selectedSlide = deck.getSelectedSlide()
    let selectedWidget = selectedSlide.components[widgetIdx]
    _.merge(selectedWidget, newProps)
    this.setState({
      deck: deck
    })
  },

  render: function () {
    return <div className="showpreper-container">
      <Header deck={this.state.deck}/>
      <Main deck={this.state.deck}
            onSlideClicked={this.onSlideClicked}
            onSelectedWidgetUpdated={this.onSelectedWidgetUpdated}/>
    </div>
  }
})

module.exports = App
