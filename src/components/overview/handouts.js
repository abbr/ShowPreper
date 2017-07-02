'use strict'
import React from 'react'
import './handouts.less'
import _ from 'lodash'

var DisplayableComponent = require('components/widgets/displayableComponent')
module.exports = class extends React.Component {
  updateNotes = (index, markUndoDesc, e) => {
    this.props.onSelectedWidgetUpdated({
      container: this.props.deck,
      index: index
    }, {notes: e.target.value}, markUndoDesc)
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
      return <div
        key={index}
        className="row"
      >
        <DisplayableComponent
          ownClassName="slide col-xs-1"
          component={component}
          componentStyle={component.style || this.props.deck.defaultSlideStyle || {}}
          container={this.props.deck}
          idx={index}
          ref={index}
          combinedTransform={true}
        />
        <div className="col-xs-1">Notes:
          <textarea value={component.notes} onBlur={this.updateNotes.bind(null, index, 'notes')}
                    onChange={this.updateNotes.bind(null, index, null)}></textarea>
        </div>
      </div>
    })
    return <div className="sp-handouts sp-overview container-fluid">{deckView}</div>
  }
}

