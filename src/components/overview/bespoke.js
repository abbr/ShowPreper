'use strict'
import React from 'react'
import bespoke from 'bespoke'
import bespokeKeys from 'bespoke-keys'
import bespokeClasses from 'bespoke-classes'
import bespokeTouch from 'bespoke-touch'
import { autoScaleMixin } from 'components/mixins/autoScale'
import './bespoke.less'
import classNames from 'classnames'
import _ from 'lodash'

var DisplayableComponent = require('components/widgets/displayableComponent')
module.exports = class extends autoScaleMixin(React.Component) {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    let beDeck = bespoke.from('article', [
      bespokeKeys(),
      bespokeClasses(),
      bespokeTouch()
    ])
    beDeck.slide(this.props.deck.activeSlide || 0)
    beDeck.on('activate', ev => {
      this.props.deck.activateSlide(ev.index)
    })
    this._resized()
    window.addEventListener('resize', this._resized)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this._resized)
  }
  _resized = () => {
    let scaleFactor = this.props.deck.bespokeZoomFactor || 1
    let cx = this.props.deck.slideWidth / 2
    let cy = this.props.deck.slideHeight / 2
    let bb = {
      top: cy - this.props.deck.slideHeight * scaleFactor / 2,
      right: cx + this.props.deck.slideWidth * scaleFactor / 2,
      bottom: cy + this.props.deck.slideHeight * scaleFactor / 2,
      left: cx - this.props.deck.slideWidth * scaleFactor / 2
    }
    this._scale(bb)
  }
  zoom = delta => {
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.deck,
        index: -1
      },
      { bespokeZoomFactor: (this.props.deck.bespokeZoomFactor || 1) + delta }
    )
    this._resized()
  }
  zoomIn = () => {
    this.zoom(-0.05)
    this.zoomInTimer = setInterval(() => this.zoom(-0.05), 100)
  }
  stopZoomIn = () => {
    clearInterval(this.zoomInTimer)
  }
  zoomOut = () => {
    this.zoom(0.05)
    this.zoomOutTimer = setInterval(() => this.zoom(0.05), 100)
  }
  stopZoomOut = () => {
    clearInterval(this.zoomOutTimer)
  }

  render() {
    let deckView = this.props.deck.components.map((e, index) => {
      let component = _.cloneDeep(e)
      if (e.type === 'Slide') {
        let bb = this.props.deck.getSlideBoundingBox(e)
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
      componentStyle =
        componentStyle ||
        component.style ||
        this.props.defaultSlideStyle ||
        this.props.deck.defaultSlideStyle ||
        {}
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
            componentStyle={componentStyle}
            container={this.props.deck}
            idx={index}
            ref={index}
            combinedTransform={true}
          />
        </section>
      )
    })
    return (
      <div
        className="sp-overview"
        style={this.props.presentationStyle || this.props.deck.style}
      >
        <span
          className="glyphicon glyphicon-zoom-in"
          onMouseDown={this.zoomIn}
          onMouseUp={this.stopZoomIn}
        />
        <span
          className="glyphicon glyphicon-zoom-out"
          onMouseDown={this.zoomOut}
          onMouseUp={this.stopZoomOut}
        />
        <article
          className={classNames(
            'sp-bespoke',
            this.props.deck.bespokeTheme || 'coverflow'
          )}
          style={this.state.scaleStyle}
        >
          {deckView}
        </article>
      </div>
    )
  }
}
