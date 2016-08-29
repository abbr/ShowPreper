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
            <h4 className="panel-title">
              <input type="radio" readOnly checked={type === 'color'}></input>
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
                 aria-controls="collapseOne" onClick={(evt)=> {
                this.props.updateStyle({background: 'rgb()'})
                return true
              }}>
                color
              </a>
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
            <h4 className="panel-title">
              <input type="radio" readOnly checked={type === 'linear-gradient'}/>
              <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                 aria-expanded="false" aria-controls="collapseTwo" onClick={(evt)=> {
                this.props.updateStyle({background: 'linear-gradient()'})
              }}>
                linear gradient
              </a>
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
            <h4 className="panel-title">
              <input type="radio" readOnly checked={type === 'radial-gradient'}/>
              <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                 href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={(evt)=> {
                this.props.updateStyle({background: 'radial-gradient()'})
              }}>radial gradient
              </a>
            </h4>
          </div>
          <div id="collapseThree"
               className="panel-collapse collapse" role="tabpanel"
               aria-labelledby="headingThree">
            <div className="panel-body">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})
