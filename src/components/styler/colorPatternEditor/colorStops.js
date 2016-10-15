import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import Draggable from '../../mixins/draggable'
import Marker from './marker'
import parseColor from 'parse-color'
import ReactDOM from 'react-dom'
import _ from 'lodash'

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
  onMarkerClick: function (evt, markerAttrs) {
    this.setState({
      pressedMarkerAttrs: _.isEqual(markerAttrs, this.state.pressedMarkerAttrs) ? null : markerAttrs
    })
  },
  onMarkerPanelMouseDown: function () {
    let evt = arguments[0]
    let x = evt.clientX
    let panelDomRect = evt.target.getBoundingClientRect()
    let pct = (Math.max(0, Math.min(1, (x - panelDomRect.left) / (panelDomRect.width || 1))) * 100).toFixed(2)
    this.updateMarkerPosition(null, pct)
  },
  getGradientItemIndexFromAttrs: function (parsedGradientObject, attrs) {
    return parsedGradientObject && parsedGradientObject.gradientArr && parsedGradientObject.gradientArr.findIndex(x => {
        return x.c === attrs.c && Math.abs(x.p - attrs.p) < 0.001
      })
  },
  getMarkerFromAttrs: function (attrs) {
    let g = this.props.parseGradientString()
    let mi = this.getGradientItemIndexFromAttrs(g, attrs)
    return mi >= 0 ? this.refs['colorMarker' + mi] : null
  },
  updateMarkerPosition: function (attrs, pct) {
    let g = this.props.parseGradientString()
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
    let s = this.props.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  updateMarkerColor: function (attrs, newColor) {
    let g = this.props.parseGradientString()
    let gradientArr = g.gradientArr
    let gi = this.getGradientItemIndexFromAttrs(g, attrs)
    gi >= 0 && (gradientArr[gi].c = newColor)
    let s = this.props.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  render: function () {
    let gradientString, gradientArr, gradientMarkers, gradientArrString
    try {
      let g = this.props.parseGradientString()
      gradientString = g.gradientString
      gradientArr = g.gradientArr
      if (gradientArr) {
        gradientArrString = gradientArr.map((e, i)=> (e.c + ' ' + e.p + '%')).join(',')
      }
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
    catch (ex) {
    }
    return <div className="sp-gradient-panel-container">
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
  }
})
