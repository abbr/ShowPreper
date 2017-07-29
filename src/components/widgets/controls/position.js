'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'

let PositionControl = class extends React.Component {
  onBlur = (p, v) => {
    if (isNaN(v)) {
      return
    }
    let newPropObj = {}
    newPropObj[p] = parseInt(v)
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.container,
        index: this.props.idx
      },
      newPropObj,
      lang.moveComponents
    )
  }
  onDoubleClick = (axis, ev) => {
    let newPropObj = {}
    newPropObj[axis] = 0
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.container,
        index: this.props.idx
      },
      newPropObj,
      lang.moveComponents
    )
    this.props.setDraggable(true)
  }
  onMouseDown = (axis, ev) => {
    this.props.onMouseDown(ev)
    this.props.setDraggable(axis)
  }
  render() {
    return (
      <div className="positioningCtrls">
        <span
          className="sp-position-icon"
          onDoubleClick={this.onDoubleClick.bind(null, 'x')}
          onMouseDown={this.onMouseDown.bind(null, 'x')}
          onTouchStart={this.onMouseDown.bind(null, 'x')}
          title={lang.translate + '-x'}
        >
          →
        </span>
        <EditableHtmlElement
          eleNm="span"
          idx={this.props.idx}
          onBlur={ev => this.onBlur('x', ev.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: this.props.component.x }}
        />
        <span
          className="sp-position-icon"
          onDoubleClick={this.onDoubleClick.bind(null, 'y')}
          onMouseDown={this.onMouseDown.bind(null, 'y')}
          onTouchStart={this.onMouseDown.bind(null, 'y')}
          title={lang.translate + '-y'}
        >
          ↓
        </span>
        <EditableHtmlElement
          eleNm="span"
          idx={this.props.idx}
          onBlur={ev => this.onBlur('y', ev.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: this.props.component.y }}
        />
        <span
          className="sp-position-icon"
          onDoubleClick={this.onDoubleClick.bind(null, 'z')}
          onMouseDown={this.onMouseDown.bind(null, 'z')}
          onTouchStart={this.onMouseDown.bind(null, 'z')}
          title={lang.translate + '-z'}
        >
          ↙
        </span>
        <EditableHtmlElement
          eleNm="span"
          idx={this.props.idx}
          onBlur={ev => this.onBlur('z', ev.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: this.props.component.z || 0 }}
        />
      </div>
    )
  }
}

module.exports = PositionControl
