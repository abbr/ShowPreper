'use strict'
import React from 'react'
import bespoke from 'bespoke'
import bespokeKeys from 'bespoke-keys'
import bespokeClasses from 'bespoke-classes'
import bespokeTouch from 'bespoke-touch'
import AutoScale from 'components/mixins/autoScale'
import './bespoke.less'
import classNames from 'classnames'
var DisplayableComponent = require('components/widgets/displayableComponent')
module.exports = React.createClass({
  mixins: [AutoScale],
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    let beDeck = bespoke.from('article', [bespokeKeys(), bespokeClasses(), bespokeTouch()])
    beDeck.slide(this.props.deck.activeSlide || 0)
    beDeck.on('activate', (ev)=> {
      this.props.deck.activateSlide(ev.index)
    })
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  _resized: function () {
    let bb = {width: this.props.deck.slideWidth, height: this.props.deck.slideHeight}
    this._scale(bb)
  },

  render: function () {
    let deckView = this.props.deck.components.map((component, index) => {
      if (component.type === 'Slide') {
        let bb = this.props.deck.getSlideBoundingBox(component)
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
      let componentStyle = null
      if (index === this.props.deck.activeSlide) {
        componentStyle = this.props.thisSlideStyle
      }
      componentStyle = componentStyle || component.style || this.props.defaultSlideStyle || this.props.deck.defaultSlideStyle || {}
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
          componentStyle={componentStyle}
          container={this.props.deck}
          idx={index}
          ref={index}
          combinedTransform={true}
        />
      </section>
    })
    return <div className="sp-overview" style={this.props.presentationStyle || this.props.deck.style}>
      <article className={classNames('sp-bespoke', this.props.deck.bespokeTheme || 'coverflow')}
               style={this.state.scaleStyle}>{deckView}</article>
    </div>
  }
})
