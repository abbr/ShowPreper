'use strict'
import React from 'react'
import lang from 'i18n/lang'
import OperatingTable from './operatingTable'
let SlideEditor = React.createClass({
  render: function () {
    let component = this.props.deck.getActiveSlide()
    let selectedWidgets = component.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    return <div className="sp-slide">
      <OperatingTable
        onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
        component={component}
        selectedWidgets={selectedWidgets}
        deck={this.props.deck}/>
    </div>
  }
})

module.exports = SlideEditor
