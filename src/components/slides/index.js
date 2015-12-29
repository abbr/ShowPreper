'use strict'
import React from 'react'
import lang from 'i18n/lang'
import SlideWell from 'components/slides/well/slideWell'
import SlideEditor from 'components/slides/slide/slideEditor'
let Main = React.createClass({
  render: function () {
    return <div className="sp-content">
      <SlideWell onSlideClicked={this.props.onSlideClicked} deck={this.props.deck}/>
      <SlideEditor onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
                   deck={this.props.deck}/>
    </div>
  }
})

module.exports = Main
