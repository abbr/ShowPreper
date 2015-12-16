'use strict'
import React from 'react'
import lang from 'i18n/lang'
import SlideWell from 'components/slideWell'
import SlideEditor from 'components/slideEditor'
let Main = React.createClass({
  render: function () {
    return <div className="showpreper-content">
      <SlideWell deck={this.props.deck}/>
      <SlideEditor deck={this.props.deck}/>
    </div>
  }
})

module.exports = Main
