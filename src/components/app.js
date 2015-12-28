'use strict'
import 'normalize.css'
import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import 'styles/App.less'
import lang from 'i18n/lang'
import React from 'react'
import Header from './header'
import Slides from './slides'
import Overview from './overview'
import DeckStore from 'stores/deck'
import _ from 'lodash'
let key = require('key-emit')(document)
let App = React.createClass({
  componentDidMount: function () {
    key.down.on('ctrl Z', this.onUndo)
    key.down.on('ctrl Y', this.onRedo)
    key.down.on('left', ()=>this.panBy("x", -1))
    key.down.on('right', ()=>this.panBy("x", 1))
    key.down.on('up', ()=>this.panBy("y", -1))
    key.down.on('down', ()=>this.panBy("y", 1))
    key.up.on('left', ()=>this.panBy("x", 0, lang.moveComponents))
    key.up.on('right', ()=>this.panBy("x", 0, lang.moveComponents))
    key.up.on('up', ()=>this.panBy("y", 0, lang.moveComponents))
    key.up.on('down', ()=>this.panBy("y", 0, lang.moveComponents))
  },
  getInitialState: () => ({
    deck: DeckStore.getDefaultDeck(),
    view: 'slides'
  }),
  changeView: function (newView) {
    this.setState({
        view: newView
      }
    )
  },
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

  panBy: function (axis, delta, markUndoDesc) {
    let deck = this.state.deck
    let slide = deck.getSelectedSlide()
    let selectedWidgets = slide.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    selectedWidgets.forEach(e=> {
      let newProp = {}
      newProp[axis] = slide.components[e][axis] + delta
      this.onSelectedWidgetUpdated(e, newProp, markUndoDesc)
    })
  },

  render: function () {
    var Main
    switch (this.state.view) {
      case 'slides':
        Main = <Slides deck={this.state.deck}
                       onSlideClicked={this.onSlideClicked}
                       onSelectedWidgetUpdated={this.onSelectedWidgetUpdated}/>
        break;
      case 'overview':
        Main = <Overview deck={this.state.deck}/>
    }
    return <div className="showpreper-container">
      <Header deck={this.state.deck}
              onUndo={this.onUndo}
              onRedo={this.onRedo}
              changeView={this.changeView}
              currentView={this.state.view}
      />
      {Main}
    </div>
  }
})

module.exports = App
