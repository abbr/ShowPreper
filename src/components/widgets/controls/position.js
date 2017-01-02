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
    this.props.onSelectedWidgetUpdated({
      container: this.props.container,
      index: this.props.idx
    }, newPropObj, lang.moveComponents)
  },
  onMouseDown: function (axis, ev) {
    this.props.onMouseDown(ev)
    this.props.setDraggable(axis)
  },
  render: function () {
    return <div className="positioningCtrls">
      <span className="sp-position-icon"
            onMouseDown={this.onMouseDown.bind(null, 'x')}
            onTouchStart={this.onMouseDown.bind(null, 'x')}
      >→</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur('x', ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.props.component.x}}/>
      <span className="sp-position-icon"
            onMouseDown={this.onMouseDown.bind(null, 'y')}
            onTouchStart={this.onMouseDown.bind(null, 'y')}
      >↓</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur('y', ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.props.component.y}}/>
      <span className="sp-position-icon"
            onMouseDown={this.onMouseDown.bind(null, 'z')}
            onTouchStart={this.onMouseDown.bind(null, 'z')}
      >↙</span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur('z', ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.props.component.z || 0}}/>
    </div>
  }
})

module.exports = PositionControl

