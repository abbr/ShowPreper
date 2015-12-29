'use strict'
import React from 'react'
var DisplayableComponent = require('../displayableComponent')
let TextBox = React.createClass({
  render: function () {
    let componentsView = this.props.component.components.map((component, index)=> {
      return (
        <DisplayableComponent
          component={component}
          key={index}
        />
      )
    })
    return <div
      className={this.props.className}
    >
      {componentsView}
    </div>
  }
})
module.exports = TextBox
