'use strict'
import React from 'react'
import lang from 'i18n/lang'
import SlideWell from 'components/well/slideWell'
import SlideEditor from 'components/slide/slideEditor'
let Main = React.createClass({
  render: function () {
    return <div className="showpreper-content">
      <SlideWell onSlideClicked={this.props.onSlideClicked} deck={this.props.deck}/>
      <SlideEditor onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
                   deck={this.props.deck}/>
    </div>
  }
})

module.exports = Main
