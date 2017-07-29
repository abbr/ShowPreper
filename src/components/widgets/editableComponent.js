'use strict'

import React from 'react'
import classNames from 'classnames'
import PositionControl from './controls/position'
import ScaleControl from './controls/scale'
import RotateControl from './controls/rotate'
import SkewControl from './controls/skew'
import KillControl from './controls/kill'
import DisplayableComponent from './displayableComponent'

let EditableComponent = class extends React.Component {
  onMouseDown = ev => {
    this.props.onMouseDown && this.props.onMouseDown(ev, this.props.idx)
  }
  onMouseUp = ev => {
    this.props.onMouseUp && this.props.onMouseUp(ev, this.props.idx)
  }
  render() {
    let cmpClass = classNames(this.props.className, {
      'sp-selected': this.props.selected
    })
    return (
      <DisplayableComponent
        {...this.props}
        className={cmpClass}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        editable={true}
        setDraggable={this.props.setDraggable}
      >
        <div className="sp-edit-ctrls">
          <PositionControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            onMouseDown={this.onMouseDown}
            setDraggable={this.props.setDraggable}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <ScaleControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            onScaleMouseDown={this.props.onScaleMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            axis="z"
            position="right"
            onRotateMouseDown={this.props.onRotateMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            axis="x"
            position="left"
            onRotateMouseDown={this.props.onRotateMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <RotateControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            axis="y"
            onRotateMouseDown={this.props.onRotateMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <SkewControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            axis="x"
            onRotateMouseDown={this.props.onRotateMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <SkewControl
            idx={this.props.idx}
            component={this.props.component}
            container={this.props.container}
            axis="y"
            onRotateMouseDown={this.props.onRotateMouseDown}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          />
          <KillControl onKillMouseDown={this.props.onKillMouseDown} />
        </div>
      </DisplayableComponent>
    )
  }
}
module.exports = EditableComponent
