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
  onChangeX: function (ev) {
    if (ev.key){
      if(ev.key === 'Enter') {
        ev.preventDefault()
        $(ev.target).trigger("blur")
      }
      return
    }
    let newV = parseInt(ev.target.innerHTML)
    !isNaN(newV) && this.props.onSelectedWidgetUpdated(this.props.idx, {x: newV})
  },
  onChangeY: function (ev) {
    if (ev.key){
      if(ev.key === 'Enter') {
        ev.preventDefault()
        $(ev.target).trigger("blur")
      }
      return
    }
    let newV = parseInt(ev.target.innerHTML)
    !isNaN(newV) && this.props.onSelectedWidgetUpdated(this.props.idx, {y: newV})
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
          <div className="positioningCtrls">
            <span className="leftposition">→</span>
            <span contentEditable="true"
                  onKeyDown={this.onChangeX}
                  onBlur = {this.onChangeX}
                  tabIndex = "-1"
                  dangerouslySetInnerHTML={{__html: this.props.component.x}}/>
            <span className="bottomposition">↓</span>
            <span contentEditable="true"
                  onKeyDown={this.onChangeY}
                  onBlur = {this.onChangeY}
                  tabIndex = "-1"
                  dangerouslySetInnerHTML={{__html: this.props.component.y}}/>
          </div>
        </div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
