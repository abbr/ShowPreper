'use strict'
import React from 'react'
import bespoke from 'bespoke'
import bespokeKeys from 'bespoke-keys'
import bespokeClasses from 'bespoke-classes'
import bespokeTouch from 'bespoke-touch'
import './bespoke.less'
var DisplayableComponent = require('components/widgets/displayableComponent')
module.exports = React.createClass({
  componentDidMount: function () {
    bespoke.from('article', [bespokeKeys(), bespokeClasses(), bespokeTouch()])
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
          componentStyle={component.style || this.props.deck.defaultSlideStyle || {}}
          container={this.props.deck}
          idx={index}
          ref={index}
          combinedTransform={true}
        />
      </section>
    })
    return <div className="sp-overview">
      <article className="sp-bespoke coverflow" style={this.props.deck.style}>{deckView}</article>
    </div>
  }
})
