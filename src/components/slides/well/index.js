'use strict'

var React = require('react')
var WellSlide = require('./wellSlide')

require('./index.less')

var SlideWell = React.createClass({
  render: function () {
    var slides = this.props.deck.getSlides().map((slide, index) => {
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
    return <div className="sp-well">
      {slides}
    </div>
  }
})

module.exports = SlideWell
