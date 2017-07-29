'use strict'
import React from 'react'
var DisplayableComponent = require('../displayableComponent')
import classNames from 'classnames'

let TextBox = class extends React.Component {
  render() {
    let componentsView = this.props.component.components.map(
      (component, index) => {
        return <DisplayableComponent component={component} key={index} />
      }
    )
    return (
      <div
        style={this.props.style}
        className={classNames(this.props.className, 'sp-widget-slide')}
      >
        {componentsView}
      </div>
    )
  }
}
module.exports = TextBox
