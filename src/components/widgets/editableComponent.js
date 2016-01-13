'use strict'

import React from 'react'
import classNames from 'classnames'
import PositionControl from './controls/position'
import ScaleControl from './controls/scale'
import RotateControl from './controls/rotate'
import SkewControl from './controls/skew'
import KillControl from './controls/kill'
import DisplayableComponent from './displayableComponent'

let EditableComponent = React.createClass({
  onMouseDown: function (ev) {
    this.props.onMouseDown && this.props.onMouseDown(ev, this.props.idx)
  },
  onMouseUp: function (ev) {
    this.props.onMouseUp && this.props.onMouseUp(ev, this.props.idx)
  },
  render: function () {
    let cmpClass = classNames(this.props.className, {
      'sp-selected': this.props.selected
    });
    return (
      <DisplayableComponent {...this.props}
        className={cmpClass}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        editable={true}
      >
        <div className="sp-edit-ctrls">
          <PositionControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
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
            axis="z"
            position="right"
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            axis="x"
            position="left"
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            axis="y"
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
          <SkewControl
            idx={this.props.idx}
            component={this.props.component}
            axis="x"
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
          <SkewControl
            idx={this.props.idx}
            component={this.props.component}
            axis="y"
            onRotateMouseDown={this.props.onRotateMouseDown}
          />
          <KillControl
            onKillMouseDown={this.props.onKillMouseDown}
          />
        </div>
      </DisplayableComponent>)
  }
})
module.exports = EditableComponent
