'use strict'
import React from 'react'
import lang from 'i18n/lang'
import OperatingTable from './operatingTable'
let SlideEditor = class extends React.Component {
  render() {
    try {
      let component = this.props.deck.getActiveSlide()
      let selectedWidgets = component.components.reduce((pv, e, i, a) => {
        if (e.selected) pv.push(i)
        return pv
      }, [])
      return (
        <div className="sp-slide">
          <OperatingTable
            {...this.props}
            component={component}
            selectedWidgets={selectedWidgets}
          />
        </div>
      )
    } catch (ex) {
      return <div />
    }
  }
}

module.exports = SlideEditor
