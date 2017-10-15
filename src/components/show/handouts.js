'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import DeckStore from 'stores/deck'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap-webpack'
import './handouts.less'
import Global from './global'

var DisplayableComponent = require('components/widgets/displayableComponent')
let Handouts = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: DeckStore.getDefaultDeck(Global.get('deck'))
    }
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
        <div key={index} className="row">
          <DisplayableComponent
            ownClassName="sp-slide col-xs-6"
            component={component}
            componentStyle={
              component.style || this.state.deck.defaultSlideStyle || {}
            }
            container={this.state.deck}
            idx={index}
            ref={index}
            combinedTransform={true}
          />
          <div className="col-xs-6">
            notes:
            <div>{component.notes}</div>
          </div>
        </div>
      )
    })
    return (
      <div>
        <Global
          values={{
            deck: this.state.deck
          }}
        />
        <div className="sp-handouts container-fluid">
          {deckView}
        </div>
      </div>
    )
  }
}

// Render the main component into the dom
ReactDOM.render(<Handouts />, document.getElementById('app'))
