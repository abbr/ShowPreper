'use strict'

import React from 'react'
import Draggable from 'components/mixins/draggable'

let EditableComponent = React.createClass({
  mixins: [Draggable],
  render: function () {
    const ComponentViewFactory = require('components/widgets/componentViewFactory')
    let ComponentView = ComponentViewFactory(this.props, false)
    return (
      <ComponentView {...this.props}
        onMouseDown={this.onMouseDown}>
        <div className="sp-position-ctrls">pos</div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
