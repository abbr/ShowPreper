'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'
import _ from 'lodash'

let ScaleControl = class extends React.Component {
  onBlur = v => {
    if (isNaN(v)) {
      return
    }
    let newPropObj = _.cloneDeep(this.props.component.scale || {})
    newPropObj.x = newPropObj.y = parseFloat(v)
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.container,
        index: this.props.idx
      },
      { scale: newPropObj },
      lang.scaleComponents
    )
  }
  onDoubleClick = () => {
    let newPropObj = _.cloneDeep(this.props.component.scale || {})
    newPropObj.x = newPropObj.y = 1
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.container,
        index: this.props.idx
      },
      { scale: newPropObj },
      lang.scaleComponents
    )
  }
  onMouseDown = ev => {
    this.props.onScaleMouseDown(ev, this.props.idx)
  }
  render() {
    let scale = 1
    try {
      scale = Math.max(
        this.props.component.scale.x || 1,
        this.props.component.scale.y || 1
      ).toFixed(2)
    } catch (ex) {}
    return (
      <span className="scale">
        <span
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          className="sp-scale-icon"
          onDoubleClick={this.onDoubleClick}
          title={lang.scale}
        >
          ↔
        </span>
        <EditableHtmlElement
          eleNm="span"
          idx={this.props.idx}
          onBlur={ev => this.onBlur(ev.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: scale }}
        />
      </span>
    )
  }
}
module.exports = ScaleControl
