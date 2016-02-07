'use strict'
import 'normalize.css'
import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import './app.less'
import lang from 'i18n/lang'
import React from 'react'
import Header from './header'
import Slides from './slides'
import Overview from './overview'
import DeckStore from 'stores/deck'
import _ from 'lodash'
let key = require('mousetrap')
let App = React.createClass({
  componentDidMount: function () {
    key.bind('ctrl+z', this.onUndo)
    key.bind('ctrl+y', this.onRedo)
    key.bind('del', this.deleteWidgets)
    key.bind('left', ()=>this.panBy("x", -1), "keydown")
    key.bind('left', ()=>this.panBy("x", 0, lang.moveComponents), "keyup")
    key.bind('shift+left', ()=>this.panBy("x", -10), "keydown")
    key.bind('shift+left', ()=> {
      this.panBy("x", 0, lang.moveComponents)
    }, "keyup")
    key.bind('right', ()=>this.panBy("x", 1), "keydown")
    key.bind('right', ()=>this.panBy("x", 0, lang.moveComponents), "keyup")
    key.bind('shift+right', ()=>this.panBy("x", 10), "keydown")
    key.bind('shift+right', ()=> {
      this.panBy("x", 0, lang.moveComponents)
    }, "keyup")
    key.bind('up', ()=>this.panBy("y", -1), "keydown")
    key.bind('up', ()=>this.panBy("y", 0, lang.moveComponents), "keyup")
    key.bind('shift+up', ()=>this.panBy("y", -10), "keydown")
    key.bind('shift+up', ()=> {
      this.panBy("y", 0, lang.moveComponents)
    }, "keyup")
    key.bind('down', ()=>this.panBy("y", 1), "keydown")
    key.bind('down', ()=>this.panBy("y", 0, lang.moveComponents), "keyup")
    key.bind('shift+down', ()=>this.panBy("y", 10), "keydown")
    key.bind('shift+down', ()=> {
      this.panBy("y", 0, lang.moveComponents)
    }, "keyup")
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
    deck.activateSlide(i)
    deck.save()
    this.setState({
      deck: deck
    })
  },
  onSelectedWidgetUpdated: function (widget, newProps, markUndoDesc) {
    let component, widgetIdx
    let deck = this.state.deck
    switch (typeof(widget)) {
      case 'number':
        component = deck.getActiveSlide()
        widgetIdx = widget
        break
      case 'object':
        component = widget.container
        widgetIdx = widget.index
        break
    }
    if (newProps) {
      // create new widget
      if (widgetIdx === component.components.length) {
        component.components.push({})
      }
      let selectedWidget = (widgetIdx >= 0) ? component.components[widgetIdx] : component
      _.merge(selectedWidget, newProps)
    }
    else {
      component.components.splice(widgetIdx, 1)
    }
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

  deleteWidgets: function () {
    let deck = this.state.deck
    let component
    switch (this.state.view) {
      case 'slides':
        component = deck.getActiveSlide()
        break
      case 'overview':
        component = deck
        break
    }
    let i = component.components.length
    let hasDeletedSomething = false
    while (i > 0) {
      --i
      let e = component.components[i]
      if (e.selected) {
        this.onSelectedWidgetUpdated({
          container: component,
          index: i
        })
        hasDeletedSomething = true
      }
    }
    hasDeletedSomething && deck.markUndo(lang.delete)
  },
  panBy: function (axis, delta, markUndoDesc) {
    let deck = this.state.deck
    let component
    switch (this.state.view) {
      case 'slides':
        component = deck.getActiveSlide()
        break
      case 'overview':
        component = deck
        break
    }
    let selectedWidgets = component.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    selectedWidgets.forEach(e=> {
      let newProp = {}
      newProp[axis] = component.components[e][axis] + delta
      this.onSelectedWidgetUpdated({container: component, index: e}, newProp, markUndoDesc)
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
        let selectedWidgets = this.state.deck.components.reduce((pv, e, i, a)=> {
          if (e.selected) pv.push(i)
          return pv
        }, [])
        Main = <Overview
          deck={this.state.deck}
          component={this.state.deck}
          selectedWidgets={selectedWidgets}
          onSelectedWidgetUpdated={this.onSelectedWidgetUpdated}
        />
    }
    return <div className="sp-container">
      <Header deck={this.state.deck}
              onUndo={this.onUndo}
              onRedo={this.onRedo}
              changeView={this.changeView}
              currentView={this.state.view}
              onSelectedWidgetUpdated={this.onSelectedWidgetUpdated}
      />
      {Main}
    </div>
  }
})

module.exports = App
