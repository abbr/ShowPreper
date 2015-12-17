'use strict'
import React from 'react'
import SlideWell from 'components/editor/well/slideWell'

let SlideDeck = React.createClass({
  render: function () {
    return <div className="slide-deck">
      <SlideWell
        deck={this.props.deck}
        onSlideClicked={this._slideClicked}
      />
    </div>
  }
})
module.exports = SlideDeck
