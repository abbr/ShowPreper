'use strict'

import React from 'react'
import classNames from 'classnames'
import PositionControl from './controls/position'
import ScaleControl from './controls/scale'
import RotateControl from './controls/rotate'
import DisplayableComponent from './displayableComponent'

let EditableComponent = React.createClass({
  onMouseDown: function (ev) {
    this.props.onMouseDown(ev, this.props.idx)
  },
  onMouseUp: function (ev) {
    this.props.onMouseUp(ev, this.props.idx)
  },
  render: function () {
    let cmpClass = classNames({
      'selected': this.props.selected
    });
    return (
      <DisplayableComponent {...this.props}
        className={cmpClass}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div className="sp-edit-ctrls">
          <PositionControl
            idx={this.props.idx}
            component={this.props.component}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <ScaleControl
            idx={this.props.idx}
            component={this.props.component}
            onScaleMouseDown={this.props.onScaleMouseDown}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
        </div>
      </DisplayableComponent>)
  }
})
module.exports = EditableComponent
