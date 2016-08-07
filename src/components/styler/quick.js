'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
let QuickStyler = React.createClass({
  onMouseEvent: function (evt, idx) {
    let p = new Palettes()
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        if (evt.type === 'mouseover')
          this.props.setTargetStyle('defaultSlideStyle', p[idx])
        else {
          this.props.setTargetStyle('defaultSlideStyle', this.props.deck.defaultSlideStyle)
        }
        break;
      case 'thisSlide':
        break;
      case 'selectedSlides':
        if (evt.type === 'mouseover')
          this.props.setTargetStyle('selectedSlideStyle', p[idx])
        else {
          this.props.setTargetStyle('selectedSlideStyle', null)
        }
        break;
      case 'entirePresentation':
        if (evt.type === 'mouseover')
          this.props.setTargetStyle('deckStyle', p[idx])
        else {
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
                  key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
    </div>
  }
})
module.exports = QuickStyler
