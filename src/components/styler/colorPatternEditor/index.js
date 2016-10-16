import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import 'react-widgets/lib/less/react-widgets.less'
import NumberPicker from 'react-widgets/lib/NumberPicker'
import DropdownList from 'react-widgets/lib/DropdownList'
import localizer from 'react-widgets/lib/localizers/simple-number'
import ColorStops from './colorStops'
import AngleInput from 'angle-input/react'
import 'angle-input/angle-input.css'
localizer()
const gradientExtentSelectionArr = [
  {value: 'closest-corner', text: 'closest-corner'},
  {value: 'closest-side', text: 'closest-side'},
  {value: 'farthest-corner', text: 'farthest-corner'},
  {value: 'farthest-side', text: 'farthest-side'},
  {value: 'length', text: 'length...'}
]
const linearGradientDirectionArr = [
  {value: 'to left', text: 'to left'},
  {value: 'to right', text: 'to right'},
  {value: 'to top', text: 'to top'},
  {value: 'to bottom', text: 'to bottom'},
  {value: 'to left top', text: 'to left top'},
  {value: 'to right top', text: 'to right top'},
  {value: 'to right bottom', text: 'to right bottom'},
  {value: 'to left bottom', text: 'to left bottom'},
  {value: 'to angle', text: 'to angle'}
]
export default React.createClass({
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
  onToggleGradientShape: function () {
    let g = this.parseGradientString()
    if (g.gradientFormat) {
      g.gradientFormat.shape = arguments[0].target.value
      if (g.gradientFormat.extent && g.gradientFormat.extent.indexOf('px') >= 0) {
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
      if (arguments[0].value === 'length') {
        g.gradientFormat.extent = '100px'
        if (g.gradientFormat.shape === 'ellipse') {
          g.gradientFormat.extent += ' 100px'
        }
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  onChangeGradientExtentPct: function (dimension, value) {
    let g = this.parseGradientString()
    if (g.gradientFormat && g.gradientFormat.extent) {
      let xyExtArr = g.gradientFormat.extent.split(' ')
      xyExtArr[dimension] = value + 'px'
      g.gradientFormat.extent = xyExtArr.join(' ')
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  onChangeGradientDirection: function () {
    let g = this.parseGradientString()
    if (g.gradientFormat) {
      g.gradientFormat.direction = arguments[0].value
      if (arguments[0].value === 'to angle') {
        g.gradientFormat.direction = '0deg'
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },
  onChangeGradientDirectionAngle: function () {
    let g = this.parseGradientString()
    if (g.gradientFormat) {
      g.gradientFormat.direction = (-arguments[0] + 90 + 360) % 360 + 'deg'
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({background: s})
  },

  componentDidUpdate: function () {
    $("#colorpicker").spectrum("set", this.props.currentStyle)
  },
  parseGradientString: function () {
    let gradientType, gradientString, gradientFormatMatch, gradientFormat = {}, gradientArr
    let gradientStringMatch = this.props.currentStyle.match(/(linear|radial)-gradient\((.*)\)/)
    if (!gradientStringMatch) {
      return {}
    }
    gradientType = gradientStringMatch[1]
    gradientString = gradientStringMatch[2]
    switch (gradientType) {
      case 'radial':
        gradientFormatMatch = gradientString.match(/(circle|ellipse)\s*(.*?)\s*(?:at\s*(\S*?)\s*(\S*?)\s*)?,/)
        if (gradientFormatMatch) {
          gradientFormat.shape = gradientFormatMatch[1]
          gradientFormat.extent = gradientFormatMatch[2]
          gradientFormat.position = {}
          gradientFormat.position.x = gradientFormatMatch[3]
          gradientFormat.position.y = gradientFormatMatch[4]
        }
        break
      case 'linear':
        gradientFormatMatch = gradientString.match(/(to.+?|.+?deg),/)
        if (gradientFormatMatch) {
          gradientFormat.direction = gradientFormatMatch[1]
          let gradientDegreeMatch = gradientFormat.direction.trim().match(/(.+)deg/)
          if (gradientDegreeMatch) {
            gradientFormat.directionAngle = gradientDegreeMatch[1]
          }
        }
        break
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
    return {
      gradientType: gradientType,
      gradientString: gradientString,
      gradientFormat: gradientFormat,
      gradientArr: gradientArr
    }
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
      gradientFormatString = (gradientFormat.direction || '') + ' '
      gradientFormatString += (gradientFormat.shape || '') + ' '
      gradientFormatString += (gradientFormat.extent || '') + ' '
      gradientFormatString += (gradientFormat.position && (gradientFormat.position.x !== undefined || gradientFormat.position.y !== undefined)) ? ' at ' : ''
      gradientFormatString += ((gradientFormat.position && gradientFormat.position.x !== undefined) ? gradientFormat.position.x : '') + ' '
      gradientFormatString += ((gradientFormat.position && gradientFormat.position.y !== undefined) ? gradientFormat.position.y : '') + ' '
      gradientFormatString = gradientFormatString.replace(/\s+/g, ' ').trim()
      gradientFormatString += gradientFormatString.length > 0 ? ',' : ''
    }
    let gradientStringArr = gradientArr && gradientArr.sort(function (a, b) {
        return a.p - b.p
      }).map(function (e) {
        return e.c + ' ' + e.p + '%'
      })
    let gradientString = gradientStringArr && gradientStringArr.join(', ')
    let fullGradientString = this.props.currentStyle.replace(/-gradient\(.*\)/, '-gradient(' + gradientFormatString + gradientString + ')')
    return fullGradientString
  },
  render: function () {
    let type, gradientFormat, gradientExtentSelect, gradientExtentXExtentPct, gradientExtentYExtentPct, gradientDirection, gradientAngle
    if (this.props.currentStyle) {
      let g = this.parseGradientString()
      gradientFormat = g.gradientFormat
      if (gradientFormat) {
        gradientExtentSelect = gradientFormat.extent || 'farthest-corner'
        if (gradientExtentSelect && gradientExtentSelect.indexOf('px') >= 0) {
          let xyExtArr = gradientExtentSelect.split(' ')
          gradientExtentXExtentPct = parseInt(xyExtArr[0])
          if (xyExtArr.length > 0) {
            gradientExtentYExtentPct = parseInt(xyExtArr[1])
          }
          gradientExtentSelect = 'length'
        }
        gradientDirection = gradientFormat.direction
        if (gradientDirection && gradientDirection.indexOf('deg') >= 0) {
          gradientDirection = 'to angle'
          gradientAngle = gradientFormat.directionAngle
        }
      }
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
            <div className="panel-body container-fluid">
              <div className="row">
                <div className="col-xs-2">Direction:</div>
                <DropdownList className="col-xs-4" data={linearGradientDirectionArr}
                              valueField="value" textField="text"
                              value={gradientDirection}
                              onChange={this.onChangeGradientDirection}
                />
                <div className="col-xs-1"/>
                <div
                  style={{
                    display: (gradientDirection === 'to angle') ? 'inline' : 'none'
                  }}
                >
                  <AngleInput
                    className="col-xs-1 default-input angle-input noselect"
                    onInput={this.onChangeGradientDirectionAngle}
                    defaultValue={(-parseInt(gradientAngle || 0) + 90 + 360) % 360}
                  >
                    <span className="centered">{gradientAngle}°</span>
                  </AngleInput>
                </div>
              </div>
              Color Stops:
              <ColorStops id="sp-linear-color-stops"
                          parseGradientString={this.parseGradientString}
                          updateStyle={this.props.updateStyle}
                          composeGradientString={this.composeGradientString}
              ></ColorStops>
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
            <div className="panel-body container-fluid">
              <div className="row">
                <div className="col-xs-1">Shape:</div>
                <input className="col-xs-1" type="radio" name="shape" value="circle"
                       onClick={this.onToggleGradientShape}
                       defaultChecked={gradientFormat && gradientFormat.shape === 'circle'}/>Circle&nbsp;
                <input className="col-xs-1" type="radio" name="shape" value="ellipse"
                       onClick={this.onToggleGradientShape}
                       defaultChecked={gradientFormat && gradientFormat.shape === 'ellipse'}/>Ellipse
              </div>
              <div className="row">
                <div className="col-xs-2">Extent:</div>
                <DropdownList data={gradientExtentSelectionArr}
                              valueField="value" textField="text"
                              value={gradientExtentSelect}
                              onChange={this.onChangeGradientExtent}
                              className="col-xs-3"
                />
                <span
                  style={{
                    display: (gradientFormat && gradientFormat.shape === 'circle' && gradientExtentSelect === 'length') ? 'inline' : 'none'
                  }}
                  className="col-xs-3"
                >
                  <NumberPicker value={gradientExtentXExtentPct} min={0}
                                onChange={this.onChangeGradientExtentPct.bind(null, 0)}/>px
                </span>
                <span
                  style={{
                    display: (gradientFormat && gradientFormat.shape === 'ellipse' && gradientExtentSelect === 'length') ? 'inline' : 'none'
                  }}
                  className="col-xs-4"
                >
                  x: <NumberPicker value={gradientExtentXExtentPct} min={0}
                                   onChange={this.onChangeGradientExtentPct.bind(null, 0)}/>px
                y: <NumberPicker value={gradientExtentYExtentPct} min={0}
                                 onChange={this.onChangeGradientExtentPct.bind(null, 1)}/>px
                </span>
              </div>
              Color Stops:
              <ColorStops id="sp-radial-color-stops"
                          parseGradientString={this.parseGradientString}
                          updateStyle={this.props.updateStyle}
                          composeGradientString={this.composeGradientString}
              ></ColorStops>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})
