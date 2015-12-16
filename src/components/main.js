'use strict'
import React from 'react'
import lang from 'i18n/lang'
import SlideDeck from 'components/slideDeck'
import SlideEditor from 'components/slideEditor'
let Main = React.createClass({
  render: function () {
    return <div className="showpreper-content">
      <SlideDeck slides={this.props.slides}/>
      <SlideEditor slides={this.props.slides}/>
    </div>
  }
})

module.exports = Main
