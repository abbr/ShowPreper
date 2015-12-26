'use strict'

import React from 'react'
import classNames from 'classnames'
import EditableHtmlElement from './editableHtmlElement'

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
          <div className="positioningCtrls">
            <span className="leftposition">→</span>
            <EditableHtmlElement
              eleNm="span"
              idx={this.props.idx}
              onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
              componentPropName="x"
              dangerouslySetInnerHTML={{__html: this.props.component.x}}/>
            <span className="bottomposition">↓</span>
            <EditableHtmlElement
              eleNm="span"
              idx={this.props.idx}
              onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
              componentPropName="y"
              dangerouslySetInnerHTML={{__html: this.props.component.y}}/>
          </div>
        </div>
      </ComponentView>)
  }
})
module.exports = EditableComponent
