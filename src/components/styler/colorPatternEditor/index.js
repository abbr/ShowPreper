import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
export default React.createClass({
  componentDidMount: function () {
    let that = this
    $("#colorpicker").spectrum({
      color: this.props.currentStyle,
      showAlpha: true,
      showInput: true,
      allowEmpty: true,
      change: function (tinycolor) {
        that.props.updateStyle({background: tinycolor && tinycolor.toRgbString()})
      },
    })
  },
  componentDidUpdate: function () {
    $("#colorpicker").spectrum("set", this.props.currentStyle)
  },
  render: function () {
    let type
    if (this.props.currentStyle) {
      if (this.props.currentStyle.match(/^radial-gradient/)) {
        type = 'radio-gradient'
      }
      else if (this.props.currentStyle.match(/^linear-gradient/)) {
        type = 'linear-gradient'
      }
      else if (this.props.currentStyle.match(/^(rgba?\(|transparent)/)) {
        type = 'color'
      }
    }
    return <div id="sp-color-pattern-editor">
      <input type="radio" onChange={(evt)=> {
        this.props.updateStyle({background: 'rgb()'})
      }}
             checked={type === 'color'}/>color:
      <input id='colorpicker'/>
      <p/>
      <input type="radio" onChange={(evt)=> {
        this.props.updateStyle({background: 'linear-gradient()'})
      }}
             checked={type === 'linear-gradient'}/>linear gradient
      <p/>
      <input type="radio" onChange={(evt)=> {
        this.props.updateStyle({background: 'radio-gradient()'})
      }}
             checked={type === 'radio-gradient'}/>radio gradient
      <h1>
        <svg width="32" height="32" fill="red">
          <defs>
            <filter id="f1" x="0" y="0" width="150%" height="150%">
              <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3"/>
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2"/>
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
            </filter>
          </defs>
          <path id="marker-up" filter="url(#f1)" d="M 8 0 L 16 16 L 0 16 z"></path>
        </svg>
      </h1>
    </div>
  }
})
