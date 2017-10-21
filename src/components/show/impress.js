'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import './impress-vendor.js'
import './impress.less'
import DeckStore from 'stores/deck'
import AutoScale from 'components/mixins/autoScale'
import _ from 'lodash'
import Global from './global'
var DisplayableComponent = require('components/widgets/displayableComponent')

let Presentation = class extends AutoScale.autoScaleMixin(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      deck: DeckStore.getDefaultDeck(Global.get('deck'))
    }
  }

  componentWillMount() {
    super.componentWillMount && super.componentWillMount()
    _.merge(document.body.style, this.state.deck.style)
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    if ('ontouchstart' in document.documentElement) {
      document.querySelector('.hint').innerHTML =
        '<p>Tap on the left or right to navigate</p>'
    }
    window.impress().init()
  }
  render() {
    let deckView = this.state.deck.components.map((component, index) => {
      if (component.type === 'Slide') {
        let bb = this.state.deck.getSlideBoundingBox(component)
        component.y = bb.top
        component.x = bb.left
        component.width = bb.right - bb.left
        component.height = bb.bottom - bb.top
      }
      return (
        <DisplayableComponent
          ownClassName="step slide"
          data-x={component.x + component.width / 2}
          data-y={component.y + component.height / 2}
          data-z={component.z}
          data-width={component.width}
          data-height={component.height}
          data-rotate-x={
            component.rotate && component.rotate.x
              ? component.rotate.x * 180 / Math.PI
              : 0
          }
          data-rotate-y={
            component.rotate && component.rotate.y
              ? component.rotate.y * 180 / Math.PI
              : 0
          }
          data-rotate-z={
            component.rotate && component.rotate.z
              ? component.rotate.z * 180 / Math.PI
              : 0
          }
          data-scale={
            component.scale ? Math.max(component.scale.x, component.scale.y) : 1
          }
          component={component}
          componentStyle={
            component.style || this.state.deck.defaultSlideStyle || {}
          }
          container={this.state.deck}
          key={index}
          idx={index}
          ref={index}
          combinedTransform={true}
        />
      )
    })
    let bb =
      this.state.deck.boundingBox || this.state.deck.getDefaultDeckBoundingBox()
    let overviewX = (bb.left + bb.right) / 2
    let overviewY = (bb.top + bb.bottom) / 2
    let overviewWidth = bb.right - bb.left
    let overviewHeight = bb.bottom - bb.top
    let overviewScale =
      1 /
      this.getFitSquareScaleFactor(
        overviewWidth,
        overviewHeight,
        window.innerWidth,
        window.innerHeight
      )
    let slideScale =
      1 /
      this.getFitSquareScaleFactor(
        this.state.deck.slideWidth,
        this.state.deck.slideHeight,
        window.innerWidth,
        window.innerHeight
      )
    if (isNaN(slideScale)) {
      slideScale = 1
    }
    overviewScale /= slideScale
    deckView.push(
      <div
        id="overview"
        key={this.state.deck.components.length}
        className="step"
        data-x={overviewX}
        data-y={overviewY}
        data-scale={overviewScale}
      />
    )

    return (
      <div>
        <Global
          values={{
            deck: this.state.deck
          }}
        />
        <div className="fallback-message">
          <p>
            Your browser <b>doesn't support the features required</b> by
            impress.js, so you are presented with a simplified version of this
            presentation.
          </p>
          <p>
            For the best experience please use the latest <b>Chrome</b>,{' '}
            <b>Safari</b> or <b>Firefox</b> browser.
          </p>
        </div>
        <div
          id="impress"
          data-max-scale="9999" //virtually disable max scale
          data-perspective={this.state.deck.perspective}
          data-width={this.state.deck.slideWidth}
          data-height={this.state.deck.slideHeight}
        >
          {deckView}
        </div>
        <div className="hint">
          <p>Use a spacebar or arrow keys to navigate</p>
        </div>
      </div>
    )
  }
}
export default Presentation
// Render the main component into the dom
ReactDOM.render(<Presentation />, document.getElementById('app'))
