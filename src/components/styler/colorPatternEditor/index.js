import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import Marker from './marker'

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
        type = 'radial-gradient'
      }
      else if (this.props.currentStyle.match(/^linear-gradient/)) {
        type = 'linear-gradient'
      }
      else if (this.props.currentStyle.match(/^(rgba?\(|transparent)/)) {
        type = 'color'
      }
    }
    return <div id="sp-color-pattern-editor">
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion"
                href="#collapseOne" onClick={(evt)=> {
              this.props.updateStyle({background: 'rgb()'})
              return true
            }}>
              <span aria-expanded="true"
                    aria-controls="collapseOne">
              <i
                className="material-icons">{type === 'color' ? "radio_button_checked" : "radio_button_unchecked"}</i>
                color
              </span>
            </h4>
          </div>
          <div id="collapseOne" className="panel-collapse collapse"
               role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              <input id='colorpicker'/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingTwo">
            <h4 className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                href="#collapseTwo"
                aria-expanded="false" aria-controls="collapseTwo" onClick={(evt)=> {
              this.props.updateStyle({background: 'linear-gradient()'})
            }}>
              <i
                className="material-icons">{type === 'linear-gradient' ? "radio_button_checked" : "radio_button_unchecked"}</i>
              linear gradient
            </h4>
          </div>
          <div id="collapseTwo" className="panel-collapse collapse"
               role="tabpanel" aria-labelledby="headingTwo">
            <div className="panel-body">2
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingThree">
            <h4 className="panel-title collapsed" role="button"
                data-toggle="collapse" data-parent="#accordion"
                aria-expanded="false" aria-controls="collapseThree"
                href="#collapseThree"
                onClick={(evt)=> {
                  this.props.updateStyle({background: 'radial-gradient()'})
                }}>
              <i
                className="material-icons">{type === 'radial-gradient' ? "radio_button_checked" : "radio_button_unchecked"}</i>

              radial gradient
            </h4>
          </div>
          <div id="collapseThree"
               className="panel-collapse collapse in" role="tabpanel"
               aria-labelledby="headingThree">
            <div className="panel-body">
              <Marker down pressed/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})
