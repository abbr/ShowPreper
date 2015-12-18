'use strict'
import 'normalize.css'
import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import 'styles/App.less'

import React from 'react'
import Header from 'components/header'
import Main from 'components/main'
import DeckStore from 'stores/deck'

let App = React.createClass({
  getInitialState: () => DeckStore.getDefaultDeck(),
  onSlideClicked: function(i) {
    var deck = this.state.deck;
    deck.selectSlide(i);
    this.setState({
      deck: deck
    });
  },

  render: function () {
    return <div className="showpreper-container">
      <Header deck={this.state.deck}/>
      <Main deck={this.state.deck} onSlideClicked={this.onSlideClicked}/>
    </div>
  }
})

module.exports = App
