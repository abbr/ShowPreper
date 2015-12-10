import React from 'react'
import lang from 'i18n/lang'
import SlideDeck from 'components/slideDeck'
import SlideEditor from 'components/slideEditor'
module.exports = React.createClass({
  render: () =>
    <div className="showpreper-content">
      <SlideDeck/>
      <SlideEditor/>
    </div>
})
