'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
let QuickStyler = React.createClass({
  onMouseOver: function (idx) {
    let p = new Palettes()
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        this.props.setTargetStyle('defaultSlideStyle', p[idx])
        break;
      case 'thisSlide':
        break;
      case 'selectedSlides':
        this.props.setTargetStyle('selectedSlideStyle', p[idx])
        break;
      case 'entirePresentation':
        this.props.setTargetStyle('deckStyle', p[idx])
    }
  },
  render: function () {
    let p = new Palettes()
    let pDivs = _.map(p, (e, i)=> {
      return <div className="sp-palette"
                  style={e}
                  onMouseOver={()=> {
                    this.onMouseOver(i)
                  } }
                  key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
    </div>
  }
})
module.exports = QuickStyler
