'use strict'
import React from 'react'
import EditableHtmlElement from './editableHtmlElement'
import lang from 'i18n/lang'
import _ from 'lodash'

let RotateControl = React.createClass({
  onBlur: function (p, v) {
    if (isNaN(v)) {
      return
    }
    let newPropObj = _.cloneDeep(this.props.component.rotate)
    newPropObj[p] = parseInt(v) * Math.PI / 180
    this.props.onSelectedWidgetUpdated({
      container: this.props.container,
      index: this.props.idx
    }, {rotate: newPropObj}, lang.rotateComponents)
  },
  onMouseDown: function (ev) {
    this.props.onRotateMouseDown(ev, this.props.idx, this.props.axis)
  },
  render: function () {
    return <span
      className={"rotate-" + this.props.axis}
    >
      <svg width="1em" height="1em" viewBox="0 0 512 512" cursor="pointer" xmlns="http://www.w3.org/2000/svg"
           onMouseDown={this.onMouseDown}
           style={{verticalAlign: 'text-bottom'}}
      >
        <path fill="#000000" id="path3036"
              d="m255.65625,40.15625c-14.32936,0.027 -28.86966,1.48315 -43.4375,4.5c-116.54269,24.13483 -191.69733,138.58231 -167.5625,255.125c24.13483,116.54269 138.55106,191.6973 255.09375,167.5625l-6.09375,-29.375c-100.66636,20.847 -198.778,-43.61489 -219.625,-144.28125c-20.847,-100.66636 43.6149,-198.80925 144.28125,-219.65625c100.66636,-20.847 198.778,43.61489 219.625,144.28125c8.71412,42.0789 2.57441,85.83876 -17.3125,123.84375l-20.53125,-11.875l-10.1875,98.6875l80.375,-58.15625l-23.65625,-13.65625c23.55886,-44.3912 30.89226,-95.6293 20.6875,-144.90625c-21.11798,-101.97486 -111.35071,-172.28253 -211.65625,-172.09375z"/>
        <text stroke="#000000"
              transform="matrix(15.242178297456174,0,0,13.868955406438625,-2928.0934502277482,-2659.923450317868) "
              xmlSpace="preserve" textAnchor="middle" fontFamily="serif" fontSize="24" id="svg_1" y="218.326696"
              x="208.913934" strokeWidth="0" fill="#000000">{this.props.axis.toUpperCase()}</text>
      </svg>
      <EditableHtmlElement
        eleNm="span"
        idx={this.props.idx}
        onBlur={(ev)=>this.onBlur(this.props.axis, ev.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: (Math.round(this.props.component.rotate[this.props.axis] * 180 / Math.PI) % 360 + 360) % 360}}/>
      <span contentEditable={false}>°</span>
    </span>
  }
})
module.exports = RotateControl

