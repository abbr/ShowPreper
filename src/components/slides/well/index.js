'use strict'

var React = require('react')
import ReactDOM from 'react-dom'
var WellSlide = require('./wellSlide')
import 'jquery-ui/jquery-ui.js'
import 'jquery-ui/themes/smoothness/jquery-ui.min.css'

require('./index.less')

var SlideWell = React.createClass({
  componentDidMount() {
    this.domItems = jQuery(ReactDOM.findDOMNode(this))
    this.domItems.sortable({
      placeholder: "sp-ui-state-highlight",
      tolerance: "pointer",
      start: function (event, ui) {
        ui.item.indexAtStart = ui.item.index()
      },
      stop: (event, ui) => {
        ui.item.indexAtEnd = ui.item.index()
        if (ui.item.indexAtEnd === ui.item.indexAtStart) {
          return
        }
        this.domItems.sortable('cancel')
        this.props.onSlideMoved(ui.item.indexAtStart, ui.item.indexAtEnd)
      }
    })
    this.domItems.disableSelection()
  },
  newSlide: function (index) {
    return () => {
      this.props.onNewWidget(this.props.deck, index + 1, {
        "components": [],
        "type": "Slide",
        "z": 0
      })
    }
  },

  render: function () {
    var slides = this.props.deck.getSlides().map((slide, index) => {
      return (
        <div className="sp-well-slide-wrapper"
             data-sortable={this.props.index}
             key={slide.id || index}
        >
          <WellSlide
            deck={this.props.deck}
            model={slide}
            index={index}
            onSlideClicked={this.props.onSlideClicked}
          />
          <div className="sp-well-slide-creator"
               onClick={this.newSlide(index)}>++++
          </div>
        </div>
      )
    })
    return <div className="sp-well">
      {slides}
    </div>
  }
})

module.exports = SlideWell
