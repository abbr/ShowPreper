'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'
import _ from 'lodash'

let SkewControl = React.createClass({
  onBlur: function (p, v) {
    if (isNaN(v)) {
      return
    }
    let newPropObj = _.cloneDeep(this.props.component.skew || {})
    newPropObj[p] = (parseInt(v) % 360) * Math.PI / 180
    this.props.onSelectedWidgetUpdated({
      container: this.props.container,
      index: this.props.idx
    }, {skew: newPropObj}, lang.skewComponents)
  },
  onDoubleClick: function () {
    let newPropObj = _.cloneDeep(this.props.component.skew || {})
    newPropObj[this.props.axis] = 0
    this.props.onSelectedWidgetUpdated({
      container: this.props.container,
      index: this.props.idx
    }, {skew: newPropObj}, lang.skewComponents)
  },
  onMouseDown: function (ev) {
    this.props.onRotateMouseDown(ev, this.props.idx, this.props.axis, 'skew')
  },
  render: function () {
    let skew = 0
    try {
      skew = this.props.component.skew[this.props.axis] || 0
    }
    catch (ex) {
    }
    return <span
      className={"skew-" + this.props.axis}>
      <span
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
        className={"sp-skew-" + this.props.axis + "-icon"}
        onDoubleClick={this.onDoubleClick}
        title={lang.skew + '-' + this.props.axis}
      >♢
      </span>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur(this.props.axis, ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: (Math.round(skew * 180 / Math.PI) % 360 )}}/>
      <span contentEditable={false}>°</span>
      </span>
  }
})
module.exports = SkewControl
