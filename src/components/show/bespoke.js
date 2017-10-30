'use strict'
import React from 'react'
import DeckStore from 'stores/deck'
import bespoke from 'bespoke'
import bespokeKeys from 'bespoke-keys'
import bespokeClasses from 'bespoke-classes'
import bespokeTouch from 'bespoke-touch'
import Global from './global'
import './bespoke.less'
import { autoScaleMixin } from 'components/mixins/autoScale'

var DisplayableComponent = require('components/widgets/displayableComponent')
export default class extends autoScaleMixin(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      deck: DeckStore.getDefaultDeck(Global.get('deck'))
    }
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    bespoke.from('article', [bespokeKeys(), bespokeClasses(), bespokeTouch()])
    this._resized()
    window.addEventListener('resize', this._windowResized)
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this._windowResized)
  }
  _windowResized = () => {
    this._resized(true)
  }

  _resized = recomputeDomSize => {
    let scaleFactor = this.state.deck.bespokeZoomFactor || 1
    let cx = this.state.deck.slideWidth / 2
    let cy = this.state.deck.slideHeight / 2
    let bb = {
      top: cy - this.state.deck.slideHeight * scaleFactor / 2,
      right: cx + this.state.deck.slideWidth * scaleFactor / 2,
      bottom: cy + this.state.deck.slideHeight * scaleFactor / 2,
      left: cx - this.state.deck.slideWidth * scaleFactor / 2
    }
    this._scale(bb, recomputeDomSize)
  }
  render() {
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
      return (
        <section
          key={index}
          style={{
            width: component.width,
            height: component.height
          }}
        >
          <DisplayableComponent
            ownClassName="sp-slide"
            component={component}
            componentStyle={
              component.style || this.state.deck.defaultSlideStyle || {}
            }
            container={this.state.deck}
            idx={index}
            ref={index}
            combinedTransform={true}
          />
        </section>
      )
    })
    return (
      <div className="sp-bespoke" style={this.state.deck.style}>
        <Global
          values={{
            deck: this.state.deck
          }}
        />
        <article
          className={this.state.deck.bespokeTheme || 'coverflow'}
          style={this.state.scaleStyle}
        >
          {deckView}
        </article>
      </div>
    )
  }
}