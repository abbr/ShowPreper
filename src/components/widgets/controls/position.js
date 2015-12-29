'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'

let PositionControl = React.createClass({
  onChange: function (p, v) {
    if (isNaN(v)) {
      return
    }
    let newPropObj = {}
    newPropObj[p] = parseInt(v)
    this.props.onSelectedWidgetUpdated(this.props.idx, newPropObj, lang.moveComponents)
  },
  render: function () {
    return <div className="positioningCtrls">
      <span className="leftposition">→</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onChange={(v)=>this.onChange('x',v)}
        dangerouslySetInnerHTML={{__html: this.props.component.x}}/>
      <span className="bottomposition">↓</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onChange={(v)=>this.onChange('y',v)}
        dangerouslySetInnerHTML={{__html: this.props.component.y}}/>
    </div>
  }
})

module.exports = PositionControl

