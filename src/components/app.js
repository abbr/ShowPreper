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
let key = require('key-emit')(document)
let App = React.createClass({
  componentDidMount: function () {
    key.down.on('ctrl Z', this.onUndo)
    key.down.on('ctrl Y', this.onRedo)
    key.down.on('left', ()=> console.log('left'))
  },
  getInitialState: () => DeckStore.getDefaultDeck(),
  onSlideClicked: function (i) {
    let deck = this.state.deck
    deck.selectSlide(i)
    deck.save()
    this.setState({
      deck: deck
    })
  },
  onSelectedWidgetUpdated: function (widgetIdx, newProps, markUndoDesc) {
    let deck = this.state.deck
    let selectedSlide = deck.getSelectedSlide()
    let selectedWidget = selectedSlide.components[widgetIdx]
    _.merge(selectedWidget, newProps)
    deck.save()
    if (markUndoDesc) {
      deck.markUndo(markUndoDesc)
    }
    this.setState({
      deck: deck
    })
  },

  onUndo: function () {
    let deck = this.state.deck
    deck.undo()
    deck.save()
    this.setState({
      deck: deck
    })
  },

  onRedo: function () {
    let deck = this.state.deck
    deck.redo()
    deck.save()
    this.setState({
      deck: deck
    })
  },

  render: function () {
    return <div className="showpreper-container">
      <Header deck={this.state.deck}
              onUndo={this.onUndo}
              onRedo={this.onRedo}
      />
      <Main deck={this.state.deck}
            onSlideClicked={this.onSlideClicked}
            onSelectedWidgetUpdated={this.onSelectedWidgetUpdated}/>
    </div>
  }
})

module.exports = App
