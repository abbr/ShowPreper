import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import Marker from './marker'

export default React.createClass({
  getInitialState: () => ({
    currentColorMarker: null
  }),
  componentDidMount() {
    $("#colorpicker").spectrum({
      color: this.props.currentStyle,
      showAlpha: true,
      showInput: true,
      allowEmpty: true,
      change: (tinycolor) => {
        this.props.updateStyle({background: tinycolor && tinycolor.toRgbString()})
      },
    })
  },
  onMarkerClick: function (evt, marker) {
    this.setState({
      currentColorMarker: marker
    })
  },
  onMarkerPanelMouseDown: function () {
    let evt = arguments[0]
    let x = evt.clientX
    let panelDomRect = evt.target.getBoundingClientRect()
    let pct = Math.min(1, (x - panelDomRect.left) / ((panelDomRect.width - 24) || 1))
    console.log(pct * 100 + '%')
  },
  componentDidUpdate: function () {
    $("#colorpicker").spectrum("set", this.props.currentStyle)
  },
  render: function () {
    let that = this
    let type, gradientString, gradientArr, gradientMarkers
    if (this.props.currentStyle) {
      let gradientStringMatch = this.props.currentStyle.match(/\((.*)\)/)
      if (gradientStringMatch) {
        gradientString = gradientStringMatch[1]
        gradientArr = gradientString.split(',')
        gradientArr = gradientArr.map(function (e, i, a) {
          let ret = {}
          let colorPosArr = e.trim().split(' ')
          let c = colorPosArr[0]
          let p
          if (colorPosArr.length > 1) {
            p = Number(colorPosArr[1].trim().replace('%', ''))
          }
          else {
            if (i == 0) {
              p = 0
            }
            else if (i === (a.length - 1)) {
              p = 100
            }
          }
          ret.c = c
          ret.p = p
          return ret
        })
      }
      if (this.props.currentStyle.match(/^radial-gradient/)) {
        type = 'radial-gradient'
        gradientMarkers = gradientArr.map((e, i) => {
          return <Marker
            key={i}
            style={{top: 0, left: e.p + '%'}}
            onClick={this.onMarkerClick}
            pressed={this.state.currentColorMarker === this.refs['colorMarker' + i]}
            ref={'colorMarker' + i}
          />
        })
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
          <div className="panel-heading" id="headingOne"
               role="button" data-toggle="collapse" data-parent="#accordion"
               aria-expanded="false" aria-controls="collapseOne"
               href="#collapseOne" onClick={(evt)=> {
            this.props.updateStyle({background: 'rgb()'})
            return true
          }}>
            <h4 className="panel-title">
              <span aria-expanded="true"
                    aria-controls="collapseOne">
              <i
                className="material-icons">{type === 'color' ? "radio_button_checked" : "radio_button_unchecked"}</i> &nbsp;
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
          <div className="panel-heading" id="headingTwo"
               role="button" data-toggle="collapse" data-parent="#accordion"
               href="#collapseTwo"
               aria-expanded="false" aria-controls="collapseTwo"
               onClick={(evt)=> {
                 this.props.updateStyle({background: 'linear-gradient()'})
               }}>
            <h4 className="panel-title collapsed">
              <i
                className="material-icons">{type === 'linear-gradient' ? "radio_button_checked" : "radio_button_unchecked"}</i> &nbsp;
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
          <div className="panel-heading" role="button" id="headingThree"
               data-toggle="collapse" data-parent="#accordion"
               aria-expanded="false" aria-controls="collapseThree"
               href="#collapseThree"
               onClick={(evt)=> {
                 this.props.updateStyle({background: 'radial-gradient()'})
               }}>
            <h4 className="panel-title">
              <i
                className="material-icons">{type === 'radial-gradient' ? "radio_button_checked" : "radio_button_unchecked"}</i> &nbsp;
              radial gradient
            </h4>
          </div>
          <div id="collapseThree"
               className="panel-collapse collapse in" role="tabpanel"
               aria-labelledby="headingThree">
            <div className="panel-body">
              <div className="sp-gradient-panel-container">
                <div className="sp-gradient-panel-base">
                  <div className="sp-gradient-panel"
                       ref="gradientPanel"
                       style={{background: 'linear-gradient(to right, ' + gradientString + ')'}}></div>
                </div>
                <div className="sp-gradient-marker-panel"
                     onMouseDown={this.onMarkerPanelMouseDown}>
                  {gradientMarkers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})
