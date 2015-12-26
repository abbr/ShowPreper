'use strict'

import React from 'react'
import classNames from 'classnames'
import PositionControl from './controls/position'
import ScaleControl from './controls/scale'

let EditableComponent = React.createClass({
  onMouseDown: function (ev) {
    this.props.onMouseDown(ev, this.props.idx)
  },
  onMouseUp: function (ev) {
    this.props.onMouseUp(ev, this.props.idx)
  },
  render: function () {
    this.x = this.props.component.x
    const ComponentViewFactory = require('components/widgets/componentViewFactory')
    let ComponentView = ComponentViewFactory(this.props, false)
    let cmpClass = classNames({
      'selected': this.props.selected
    });
    return (
      <ComponentView {...this.props}
        className={cmpClass}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div className="sp-edit-ctrls">
          <PositionControl
            idx={this.props.idx}
            component={this.props.component}
          />
          <ScaleControl
            idx={this.props.idx}
            component={this.props.component}
          />
        </div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
