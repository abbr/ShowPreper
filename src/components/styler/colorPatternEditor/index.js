import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import Draggable from '../../mixins/draggable'
import Marker from './marker'
import ReactDOM from 'react-dom'
import parseColor from 'parse-color'
import _ from 'lodash'
import 'react-widgets/lib/less/react-widgets.less'
import NumberPicker from 'react-widgets/lib/NumberPicker'
import DropdownList from 'react-widgets/lib/DropdownList'
import localizer from 'react-widgets/lib/localizers/simple-number'
localizer()
const gradientExtentSelectionArr = [
  {value: 'closest-corner', text: 'closest-corner'},
  {value: 'closest-side', text: 'closest-side'},
  {value: 'farthest-corner', text: 'farthest-corner'},
  {value: 'farthest-side', text: 'farthest-side'},
  {value: 'percentage', text: 'percentage...'}
]
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
      if (!e) return
      let m = this.getMarkerFromAttrs(e)
      let bb = ReactDOM.findDOMNode(m).parentNode.getBoundingClientRect()
      let pct = (Math.max(0, Math.min(1, (x - bb.left) / bb.width) * 100)).toFixed(2)
      if (y - bb.top > 30) {
        pct = null
      }
      this.updateMarkerPosition(e, pct)
      e.p = pct
      this.setState({draggingMarkerAttrs: pct === null ? null : e})
    }, function (e, x, y) {
      if (!e) return
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
      preferredFormat: 'rgb',
      change: (tinycolor) => {
        this.props.updateStyle({background: tinycolor && tinycolor.toRgbString()})
      },
    })
  },
  onMarkerClick: function (evt, markerAttrs) {
    this.setState({
      pressedMarkerAttrs: _.isEqual(markerAttrs, this.state.pressedMarkerAttrs) ? null : markerAttrs
    })
  },
  onToggleGradientShape: function () {
    let g = this.parseGradientString()
    if (g.gradientFormat) {
      g.gradientFormat.shape = arguments[0].target.value
      if (g.gradientFormat.extent && g.gradientFormat.extent.indexOf('%') >= 0) {
        g.gradientFormat.extent = 'farthest-corner'
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  onChangeGradientExtent: function () {
    let g = this.parseGradientString()
    if (g.gradientFormat) {
      g.gradientFormat.extent = arguments[0].value
      if (arguments[0].value === 'percentage') {
        g.gradientFormat.extent = '100% 100%'
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  onChangeGradientExtentPct: function (dimension, value) {
    let g = this.parseGradientString()
    if (g.gradientFormat && g.gradientFormat.extent) {
      let xyExtArr = g.gradientFormat.extent.split(' ')
      xyExtArr[dimension] = value + '%'
      g.gradientFormat.extent = xyExtArr.join(' ')
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
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
    let gradientString, gradientFormatMatch, gradientFormat = {}, gradientArr
    let gradientStringMatch = this.props.currentStyle.match(/-gradient\((.*)\)/)
    if (!gradientStringMatch) {
      return {}
    }
    gradientString = gradientStringMatch[1]
    gradientFormatMatch = gradientString.match(/(circle|ellipse)\s*(.*?)\s*(?:at\s*(\S*?)\s*(\S*?)\s*)?,/)
    if (gradientFormatMatch) {
      gradientFormat.shape = gradientFormatMatch[1]
      gradientFormat.extent = gradientFormatMatch[2]
      gradientFormat.position = {}
      gradientFormat.position.x = gradientFormatMatch[3]
      gradientFormat.position.y = gradientFormatMatch[4]
    }
    gradientArr = gradientString.match(/((?:rgba?.*?\)|#)[^,]*)/g)
    gradientArr = gradientArr && gradientArr.map(function (e, i, a) {
        let ret = {}
        let colorPosArr = e.trim().match(/(rgba?.*?\)|[\w#\.%]+)/g)
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
    return {gradientString: gradientString, gradientFormat: gradientFormat, gradientArr: gradientArr}
  },
  getGradientItemIndexFromAttrs: function (parsedGradientObject, attrs) {
    return parsedGradientObject && parsedGradientObject.gradientArr && parsedGradientObject.gradientArr.findIndex(x => {
        return x.c === attrs.c && Math.abs(x.p - attrs.p) < 0.001
      })
  },
  getMarkerFromAttrs: function (attrs) {
    let g = this.parseGradientString()
    let mi = this.getGradientItemIndexFromAttrs(g, attrs)
    return mi >= 0 ? this.refs['colorMarker' + mi] : null
  },
  composeGradientString: function () {
    let gradientFormat, gradientArr
    if (arguments[0].constructor === Array) {
      gradientArr = arguments[0]
    }
    else {
      gradientArr = arguments[0].gradientArr
      gradientFormat = arguments[0].gradientFormat
    }
    let gradientFormatString = ''
    if (gradientFormat) {
      gradientFormatString = (gradientFormat.shape || '') + ' '
      gradientFormatString += (gradientFormat.extent || '') + ' '
      gradientFormatString += (gradientFormat.position && (gradientFormat.position.x !== undefined || gradientFormat.position.y !== undefined)) ? ' at ' : ''
      gradientFormatString += ((gradientFormat.position && gradientFormat.position.x !== undefined) ? gradientFormat.position.x : '') + ' '
      gradientFormatString += ((gradientFormat.position && gradientFormat.position.y !== undefined) ? gradientFormat.position.y : '') + ' '
      gradientFormatString = gradientFormatString.replace(/\s+/g, ' ').trim()
      gradientFormatString += ','
    }
    let gradientStringArr = gradientArr.sort(function (a, b) {
      return a.p - b.p
    }).map(function (e) {
      return e.c + ' ' + e.p + '%'
    })
    let gradientString = gradientStringArr.join(', ')
    let fullGradientString = this.props.currentStyle.replace(/-gradient\(.*\)/, '-gradient(' + gradientFormatString + gradientString + ')')
    return fullGradientString
  },
  updateMarkerPosition: function (attrs, pct) {
    let g = this.parseGradientString()
    let gradientArr = g.gradientArr || []
    g.gradientArr = gradientArr
    if (attrs) {
      let mi = this.getGradientItemIndexFromAttrs(g, attrs)
      if (pct !== null) {
        // dragging marker
        mi >= 0 && (gradientArr[mi].p = pct)
      }
      else {
        // removing marker
        mi >= 0 && gradientArr.splice(mi, 1)
      }
    }
    else {
      if (gradientArr.length > 0) {
        // inserting marker
        let rightMarkerIdx = gradientArr.findIndex((e)=>(e.p > pct))
        rightMarkerIdx = rightMarkerIdx < 0 ? gradientArr.length : rightMarkerIdx
        let leftMarkerIdx = Math.max(0, rightMarkerIdx - 1)
        rightMarkerIdx = Math.min(rightMarkerIdx, gradientArr.length - 1)
        let leftColor = parseColor(gradientArr[leftMarkerIdx].c).rgba
        let rightColor = parseColor(gradientArr[rightMarkerIdx].c).rgba
        let dist = (gradientArr[rightMarkerIdx].p - gradientArr[leftMarkerIdx].p) || 1
        let ratio = (pct - gradientArr[leftMarkerIdx].p) / dist
        let newColor = []
        for (let i = 0; i < 4; i++) {
          let decimalVal = leftColor[i] + (rightColor[i] - leftColor[i]) * ratio
          newColor[i] = Math.max(0, Math.min(i < 3 ? 255 : 1, i < 3 ? Math.round(decimalVal) : decimalVal.toFixed(2)))
        }
        let newColorStr = 'rgba(' + newColor.join() + ')'
        let newMarker = {c: newColorStr, p: pct}
        gradientArr.splice(rightMarkerIdx, 0, newMarker)
      }
      else {
        // inserting first marker
        gradientArr.splice(0, 0, {c: 'rgba(255,255,255,1)', p: pct})
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  updateMarkerColor: function (attrs, newColor) {
    let g = this.parseGradientString()
    let gradientArr = g.gradientArr
    let gi = this.getGradientItemIndexFromAttrs(g, attrs)
    gi >= 0 && (gradientArr[gi].c = newColor)
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  render: function () {
    let that = this
    let type, gradientString, gradientArr, gradientMarkers, gradientArrString, gradientFormat, gradientExtentSelect, gradientExtentXExtentPct, gradientExtentYExtentPct
    if (this.props.currentStyle) {
      let g = this.parseGradientString()
      gradientFormat = g.gradientFormat
      gradientExtentSelect = gradientFormat.extent
      if (gradientExtentSelect && gradientExtentSelect.indexOf(' ') >= 0) {
        let xyExtArr = gradientExtentSelect.split(' ')
        gradientExtentXExtentPct = parseInt(xyExtArr[0])
        gradientExtentYExtentPct = parseInt(xyExtArr[1])
        gradientExtentSelect = 'percentage'
      }
      gradientString = g.gradientString
      gradientArr = g.gradientArr
      gradientArrString = gradientArr.map((e, i)=> (e.c + ' ' + e.p + '%')).join(',')
      if (this.props.currentStyle.match(/^radial-gradient/)) {
        type = 'radial-gradient'
        gradientMarkers = gradientArr && gradientArr.map((e, i) => {
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
              updateMarkerColor={this.updateMarkerColor}
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
              <div>Shape:
                <input type="radio" name="shape" value="circle" onClick={this.onToggleGradientShape}
                       defaultChecked={gradientFormat && gradientFormat.shape === 'circle'}/>Circle&nbsp;
                <input type="radio" name="shape" value="ellipse" onClick={this.onToggleGradientShape}
                       defaultChecked={gradientFormat && gradientFormat.shape === 'ellipse'}/>Ellipse
              </div>
              <div>Extent:
                <DropdownList data={gradientExtentSelectionArr}
                              valueField="value" textField="text"
                              value={gradientExtentSelect}
                              onChange={this.onChangeGradientExtent}
                />
                x: <NumberPicker value={gradientExtentXExtentPct} min={0}
                                 onChange={this.onChangeGradientExtentPct.bind(null, 0)}/>%
                y: <NumberPicker value={gradientExtentYExtentPct} min={0}
                                 onChange={this.onChangeGradientExtentPct.bind(null, 1)}/>%
              </div>
              Color Stops:
              <div className="sp-gradient-panel-container">
                <div className="sp-gradient-panel-base">
                  <div className="sp-gradient-panel"
                       ref="gradientPanel"
                       style={{background: 'linear-gradient(to right, ' + gradientArrString + ')'}}></div>
                </div>
                <div className="sp-gradient-marker-panel" title="Insert color stop here"
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
