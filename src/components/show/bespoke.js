'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import DeckStore from 'stores/deck'
import bespoke from 'bespoke'
import bespokeKeys from 'bespoke-keys'
import bespokeClasses from 'bespoke-classes'
import bespokeTouch from 'bespoke-touch'
import './bespoke.less'
import AutoScale from 'components/mixins/autoScale'
var DisplayableComponent = require('components/widgets/displayableComponent')
let BeSpoke = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    bespoke.from('article', [bespokeKeys(), bespokeClasses(), bespokeTouch()])
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  _resized: function () {
    let bb = {width: this.state.deck.slideWidth, height: this.state.deck.slideHeight}
    this._scale(bb)
  },

  getInitialState: () => ({
    deck: DeckStore.getDefaultDeck()
  }),
  render: function () {
    let deckView = this.state.deck.components.map((component, index) => {
      if (component.type === 'Slide') {
        let bb = this.state.deck.getSlideBoundingBox(component)
        // don't transform slides
        delete component.x
        delete component.y
        delete component.z
        delete component.scale
        delete component.rotate
        delete component.skew

        component.width = bb.right - bb.left
        component.height = bb.bottom - bb.top
      }
      return <section
        key={index}
        style={{
          width: component.width,
          height: component.height
        }}
      >
        <DisplayableComponent
          ownClassName="sp-slide"
          component={component}
          componentStyle={component.style || this.state.deck.defaultSlideStyle || {}}
          container={this.state.deck}
          idx={index}
          ref={index}
          combinedTransform={true}
        />
      </section>
    })
    return <div className="sp-bespoke" style={this.state.deck.style}>
      <article className="coverflow" style={this.state.scaleStyle}>{deckView}</article>
    </div>
  }
})

// Render the main component into the dom
ReactDOM.render(<BeSpoke />, document.getElementById('app'))
