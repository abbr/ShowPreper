'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'

let PositionControl = React.createClass({
  render: function(){
    return   <div className="positioningCtrls">
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
  }
})

module.exports = PositionControl

