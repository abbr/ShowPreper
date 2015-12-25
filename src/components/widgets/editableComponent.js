'use strict'

import React from 'react'
import classNames from 'classnames'

let EditableComponent = React.createClass({
  onMouseDown: function (ev) {
    this.props.onMouseDown(ev, this.props.idx)
  },
  onMouseUp: function (ev) {
    this.props.onMouseUp(ev, this.props.idx)
  },
  render: function () {
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
          <div className="positioningCtrls">
            <span className="leftposition">→</span>
            <input className="position" type="text" defaultValue="1"/>
            <span className="bottomposition">↓</span>
            <input className="position" type="text" defaultValue="2"/>
          </div>
        </div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
