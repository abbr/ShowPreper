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
        that.updateStyle({background: tinycolor && tinycolor.toRgbString()})
      },
    })
  },
  componentDidUpdate: function () {
    $("#colorpicker").spectrum("set", this.props.currentStyle)
  },
  render: function () {
    let type
    if (this.props.currentStyle) {
      if (this.props.currentStyle.match(/radial-gradient/)) {
        type = 'radio-gradient'
      }
      else if (this.props.currentStyle.match(/linear-gradient/)) {
        type = 'linear-gradient'
      }
      else if (this.props.currentStyle.match(/rgba?\(/)) {
        type = 'color'
      }
    }
    return <div>
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
    </div>
  }
})
