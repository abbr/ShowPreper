'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'
import _ from 'lodash'

let ScaleControl = React.createClass({
  onBlur: function (v) {
    if (isNaN(v)) {
      return
    }
    let newPropObj = _.cloneDeep(this.props.component.scale || {})
    newPropObj.x = newPropObj.y = parseFloat(v)
    this.props.onSelectedWidgetUpdated({
      container: this.props.container,
      index: this.props.idx
    }, {scale: newPropObj}, lang.scaleComponents)
  },
  onMouseDown: function (ev) {
    this.props.onScaleMouseDown(ev, this.props.idx)
  },
  render: function () {
    let scale = 1
    try {
      scale = Math.max(this.props.component.scale.x, this.props.component.scale.y).toFixed(2)
    }
    catch (ex) {
    }
    return <span className="scale">
              <span
                onMouseDown={this.onMouseDown}
                className="sp-scale-icon"
              >↔</span>
              <EditableHtmlElement
                eleNm="span"
                idx={this.props.idx}
                onBlur={(ev)=>this.onBlur(ev.target.innerHTML)}
                dangerouslySetInnerHTML={{__html: scale}}/>
            </span>
  }
})
module.exports = ScaleControl

