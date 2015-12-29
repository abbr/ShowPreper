'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'

let PositionControl = React.createClass({
  onBlur: function (p, v) {
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
        onBlur={(ev)=>this.onBlur('x',ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.props.component.x}}/>
      <span className="bottomposition">↓</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur('y',ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.props.component.y}}/>
    </div>
  }
})

module.exports = PositionControl

