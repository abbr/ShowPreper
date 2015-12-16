'use strict'
import React from 'react'
import lang from 'i18n/lang'
import OperatingTable from 'components/editor/operatingTable'
let SlideEditor = React.createClass({
  render: function () {
    return <div className="slide-editor">
      <OperatingTable deck={this.props.deck}/>
    </div>
  }
})

module.exports = SlideEditor
