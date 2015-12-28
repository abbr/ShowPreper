'use strict'

var React = require('react')
var WellSlide = require('./wellSlide')

require('./slideWell.less')

var SlideWell = React.createClass({
  render: function () {
    var slides = this.props.deck.slides.map((slide, index) => {
      return (
        <WellSlide
          deck={this.props.deck}
          model={slide}
          key={slide.id || index}
          index={index}
          onSlideClicked={this.props.onSlideClicked}
        />
      )
    })
    return <div className="slide-deck">
      {slides}
    </div>
  }
})

module.exports = SlideWell
