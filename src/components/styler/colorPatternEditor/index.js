import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import Draggable from '../../mixins/draggable'
import Marker from './marker'
import ReactDOM from 'react-dom'
import parseColor from 'parse-color'

export default React.createClass({
  mixins: [Draggable(function () {
      return [this.state.draggingMarkerAttrs]
    }, function (e) {
      let m = this.getMarkerFromAttrs(e)
      let bb = ReactDOM.findDOMNode(m).getBoundingClientRect()
      return {
        x: (bb && (bb.left + 8)) || 0,
        y: (bb && bb.top) || 0
      }
    },
    function (e, x, y) {
      let m = this.getMarkerFromAttrs(e)
      let bb = ReactDOM.findDOMNode(m).parentNode.getBoundingClientRect()
      let pct = (Math.max(0, Math.min(1, (x - bb.left) / bb.width) * 100)).toFixed(2)
      this.updateMarkerPosition(e, pct)
      e.p = pct
      this.setState({draggingMarkerAttrs: e})
    }, function (e, x, y) {
      let m = this.getMarkerFromAttrs(e)
      let bb = ReactDOM.findDOMNode(m).parentNode.getBoundingClientRect()
      let pct = (Math.max(0, Math.min(1, (x - bb.left) / bb.width) * 100)).toFixed(2)
      this.updateMarkerPosition(e, pct)
      e.p = pct
      this.setState({draggingMarkerAttrs: e})
    })],
  componentWillMount: function () {
    this.mouseDownHdlrs = []
  },
  onMouseDown: function (evt, markerAttrs) {
    evt.persist()
    this.setState({draggingMarkerAttrs: markerAttrs}, function () {
      this.mouseDownHdlrs.forEach(e=>e.apply(this, [evt]))
    })
  },
  getInitialState: () => ({
    draggable: true,
    pressedMarkerAttrs: null,
    draggingMarkerAttrs: null
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
  onMarkerClick: function (evt, markerAttrs) {
    this.setState({
      pressedMarkerAttrs: markerAttrs
    })
  },
  onMarkerPanelMouseDown: function () {
    let evt = arguments[0]
    let x = evt.clientX
    let panelDomRect = evt.target.getBoundingClientRect()
    let pct = (Math.max(0, Math.min(1, (x - panelDomRect.left) / (panelDomRect.width || 1))) * 100).toFixed(2)
    this.updateMarkerPosition(null, pct)
  },
  componentDidUpdate: function () {
    $("#colorpicker").spectrum("set", this.props.currentStyle)
  },
  parseGradientString: function () {
    let gradientString, gradientArr
    let gradientStringMatch = this.props.currentStyle.match(/-gradient\((.*)\)/)
    if (!gradientStringMatch) {
      return {}
    }
    gradientString = gradientStringMatch[1]
    gradientArr = gradientString.match(/((?:rgba.*?\)|#)[^,]*)/g)
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
    return {gradientString: gradientString, gradientArr: gradientArr}
  },
  getMarkerFromAttrs: function (attrs) {
    let g = this.parseGradientString()
    let mi = g.gradientArr.findIndex((x, i) => {
      let e = this.refs['colorMarker' + i]
      let ea = e.props.attrs
      return ea.c === attrs.c && Math.abs(ea.p - attrs.p) < 0.001
    })
    return mi >= 0 ? this.refs['colorMarker' + mi] : null
  },
  composeGradientString: function (gradientArr) {
    let gradientStringArr = gradientArr.sort(function (a, b) {
      return a.p - b.p
    }).map(function (e) {
      return e.c + ' ' + e.p + '%'
    })
    let gradientString = gradientStringArr.join(', ')
    let fullGradientString = this.props.currentStyle.replace(/-gradient\(.*\)/, '-gradient(' + gradientString + ')')
    return fullGradientString
  },
  updateMarkerPosition: function (attrs, pct) {
    let g = this.parseGradientString()
    let gradientArr = g.gradientArr
    if (attrs) {
      // dragging marker
      for (let i = 0; i < gradientArr.length; i++) {
        if (gradientArr[i].c === attrs.c && Math.abs(gradientArr[i].p - attrs.p) < 0.001) {
          gradientArr[i].p = pct
          break
        }
      }
    }
    else {
      // inserting marker
      let rightMarkerIdx = gradientArr.findIndex((e)=>(e.p > pct))
      let leftMarkerIdx = Math.max(0, rightMarkerIdx - 1)
      let leftColor = parseColor(gradientArr[leftMarkerIdx].c).rgba
      let rightColor = parseColor(gradientArr[rightMarkerIdx].c).rgba
      let dist = (gradientArr[rightMarkerIdx].p - gradientArr[leftMarkerIdx].p) || 1
      let ratio = (pct - gradientArr[leftMarkerIdx].p) / dist
      let newColor = []
      for (let i = 0; i < 4; i++) {
        newColor[i] = Math.max(0, Math.min(i < 3 ? 255 : 1, Math.round(leftColor[i] + (rightColor[i] - leftColor[i]) * ratio)))
      }
      let newColorStr = 'rgba(' + newColor.join() + ')'
      let newMarker = {c: newColorStr, p: pct}
      gradientArr.splice(rightMarkerIdx, 0, newMarker)
    }
    let s = this.composeGradientString(gradientArr)
    this.props.updateStyle({background: s})
  },
  render: function () {
    let that = this
    let type, gradientString, gradientArr, gradientMarkers
    if (this.props.currentStyle) {
      let g = this.parseGradientString()
      gradientString = g.gradientString
      gradientArr = g.gradientArr
      if (this.props.currentStyle.match(/^radial-gradient/)) {
        type = 'radial-gradient'
        gradientMarkers = gradientArr.map((e, i) => {
          let pressed = false
          if (this.state.pressedMarkerAttrs && this.state.pressedMarkerAttrs.c === e.c && Math.abs(this.state.pressedMarkerAttrs.p - e.p) < 0.001) {
            pressed = true
          }
          return <Marker
            key={i}
            index={i}
            attrs={e}
            style={{top: 0, left: e.p + '%'}}
            onClick={this.onMarkerClick}
            pressed={pressed}
            ref={'colorMarker' + i}
            onMouseDown={this.onMouseDown}
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
