'use strict'

import React from 'react'

let EditableComponent = React.createClass({
  render: function () {
    const ComponentViewFactory = require('components/widgets/componentViewFactory')
    let ComponentView = ComponentViewFactory(this.props, false)
    return (
      <ComponentView {...this.props}
        editable="true">
        <div className="sp-position-ctrls">pos</div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
