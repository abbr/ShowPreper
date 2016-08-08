'use strict'

var React = require('react')
import ReactDOM from 'react-dom'
import 'jquery-ui/jquery-ui.js'
import 'jquery-ui/themes/smoothness/jquery-ui.min.css'
import lang from 'i18n/lang'
var WellSlide = require('./wellSlide')

require('./index.less')

var SlideWell = React.createClass({
  componentDidMount() {
    this.domItems = jQuery(ReactDOM.findDOMNode(this.refs['slides']))
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
  deleteSlide: function (index) {
    return () => {
      this.props.onSelectedWidgetUpdated({container: this.props.deck, index: index}, null, lang.delete)
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
            component={slide}
            index={index}
            onSlideClicked={this.props.onSlideClicked}
            defaultSlideStyle={this.props.defaultSlideStyle}
            thisSlideStyle={this.props.thisSlideStyle}
          >
            <div className="sp-well-slide-killer"
                 onClick={this.deleteSlide(index)}>
              <span className="glyphicon glyphicon-remove-sign" title={lang.delete}></span>
            </div>
          </WellSlide>
          <div className="sp-well-slide-creator"
          ><span className='glyphicon glyphicon-plus btn-success centered-child'
                 onClick={this.newSlide(index)} title={lang.new}
          ></span>
          </div>
        </div>
      )
    })
    return <div className="sp-well">
      <div className="sp-well-slide-creator">
        <span className='glyphicon glyphicon-plus btn-success centered-child'
              onClick={this.newSlide(-1)} title={lang.new}
        ></span>
      </div>
      <div ref="slides">
        {slides}
      </div>
    </div>
  }
})

module.exports = SlideWell
