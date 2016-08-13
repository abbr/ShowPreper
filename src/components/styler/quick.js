'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
import lang from 'i18n/lang'
let QuickStyler = React.createClass({
  onMouseEvent: function (evt, idx) {
    let p = new Palettes()
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        switch (evt.type) {
          case 'mouseover':
            this.props.setTargetStyle('defaultSlideStyle', p[idx])
            break
          case 'click':
            this.props.onSelectedWidgetUpdated({
              container: this.props.deck,
              index: -1
            }, {defaultSlideStyle: p[idx]}, lang.setAppearance + ' ' + lang.defaultSlide)
          default:
            this.props.setTargetStyle('defaultSlideStyle', null)
        }
        break
      case 'thisSlide':
        switch (evt.type) {
          case 'mouseover':
            this.props.setTargetStyle('thisSlideStyle', p[idx])
            break
          case 'click':
            this.props.onSelectedWidgetUpdated({
              container: this.props.deck.getActiveSlide(),
              index: -1
            }, {style: p[idx]}, lang.setAppearance + ' ' + lang.thisSlide)
          default:
            this.props.setTargetStyle('thisSlideStyle', null)
        }
        break
      case 'selectedSlides':
        switch (evt.type) {
          case 'mouseover':
            this.props.setTargetStyle('selectedSlideStyle', p[idx])
            break
          case 'click':
          default:
            this.props.setTargetStyle('selectedSlideStyle', null)
        }
        break
      case 'entirePresentation':
        switch (evt.type) {
          case 'mouseover':
            this.props.setTargetStyle('deckStyle', p[idx])
            break
          case 'click':
          default:
            this.props.setTargetStyle('deckStyle', this.props.deck.style)
        }
    }
  },
  render: function () {
    let p = new Palettes()
    let pDivs = _.map(p, (e, i)=> {
      return <div className="sp-palette"
                  style={e}
                  onMouseOver={(evt)=> {
                    this.onMouseEvent(evt, i)
                  } }
                  onMouseLeave={
                    (evt)=> {
                      this.onMouseEvent(evt, i)
                    }
                  }
                  onClick={
                    (evt) => {
                      this.onMouseEvent(evt, i)
                    }
                  }
                  key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
    </div>
  }
})
module.exports = QuickStyler
