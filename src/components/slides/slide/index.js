'use strict'
import React from 'react'
import lang from 'i18n/lang'
import OperatingTable from './operatingTable'
let SlideEditor = React.createClass({
  render: function () {
    return <div className="sp-slide">
      <OperatingTable
        onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
        deck={this.props.deck}/>
    </div>
  }
})

module.exports = SlideEditor
