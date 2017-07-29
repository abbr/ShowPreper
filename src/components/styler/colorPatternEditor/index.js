import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import './index.less'
import 'react-widgets/lib/less/react-widgets.less'
import DropdownList from 'react-widgets/lib/DropdownList'
import localizer from 'react-widgets/lib/localizers/simple-number'
import ColorStops from './colorStops'
import AngleInput from './angleInput'
import classNames from 'classnames'
localizer()
const gradientExtentSelectionArr = [
  { value: 'closest-corner', text: 'closest-corner' },
  { value: 'closest-side', text: 'closest-side' },
  { value: 'farthest-corner', text: 'farthest-corner' },
  { value: 'farthest-side', text: 'farthest-side' },
  { value: 'length', text: 'length...' }
]
const linearGradientDirectionArr = [
  { value: 'to left', text: 'to left' },
  { value: 'to right', text: 'to right' },
  { value: 'to top', text: 'to top' },
  { value: 'to bottom', text: 'to bottom' },
  { value: 'to left top', text: 'to left top' },
  { value: 'to right top', text: 'to right top' },
  { value: 'to right bottom', text: 'to right bottom' },
  { value: 'to left bottom', text: 'to left bottom' },
  { value: 'to angle', text: 'to angle' }
]
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGradientAngleBeingDragged: false
    }
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    $('#sp-background-solid-colorpicker').spectrum({
      color: this.props.currentStyle,
      showAlpha: true,
      showInput: true,
      allowEmpty: true,
      preferredFormat: 'rgb',
      change: tinycolor => {
        this.props.updateStyle({
          background: tinycolor && tinycolor.toRgbString()
        })
      }
    })
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    $('#sp-background-solid-colorpicker').spectrum('destroy')
  }
  onToggleGradientShape = (...args) => {
    let g = this.parseGradientString()
    if (g) {
      g.shape = args[0].target.value
      if (g.extent && g.extent.indexOf('px') >= 0) {
        g.extent = 'farthest-corner'
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onToggleIsRepeating = evt => {
    let g = this.parseGradientString()
    if (!g) {
      return
    }
    g.isRepeating = evt.target.checked
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onChangeGradientExtent = (...args) => {
    let g = this.parseGradientString()
    if (g) {
      g.extent = args[0].value
      if (args[0].value === 'length') {
        g.extent = '100px'
        if (!g.shape || g.shape === 'ellipse') {
          g.extent += ' 100px'
        }
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onChangeGradientExtentPct = (dimension, ev) => {
    let g = this.parseGradientString()
    if (g && g.extent) {
      let xyExtArr = g.extent.split(' ')
      xyExtArr[dimension] = ev.target.value + 'px'
      g.extent = xyExtArr.join(' ')
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onChangeGradientPosition = (dimension, ev) => {
    let g = this.parseGradientString()
    g.position = g.position || {}
    if (dimension) {
      if (!isNaN(ev.target.value)) {
        g.position[dimension] = ev.target.value + 'px'
      } else {
        g.position.x = '0px'
        g.position.y = '0px'
      }
    } else {
      delete g.position
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onChangeGradientDirection = (...args) => {
    let g = this.parseGradientString()
    if (g) {
      g.direction = args[0].value
      if (args[0].value === 'to angle') {
        g.direction = '0deg'
      }
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }
  onGradientDirectionAngleInputKeydown = (...args) => {
    if (args[0].key !== 'Enter') {
      return
    }
    args[0].preventDefault && args[0].preventDefault()
    args[0].target.blur()
  }
  onChangeGradientDirectionAngle = (...args) => {
    document.addEventListener('mouseup', this.onGradientDirectionAngleMouseUp)
    let g = this.parseGradientString()
    let newAngle
    switch (typeof args[0]) {
      case 'number':
        newAngle = (args[0] + 360) % 360
        this.setState({ isGradientAngleBeingDragged: true })
        break
      case 'object':
        newAngle = parseInt(args[0].target.innerHTML)
    }
    if (g) {
      g.direction = newAngle + 'deg'
    }
    let s = this.composeGradientString(g)
    this.props.updateStyle({ background: s })
  }

  onGradientDirectionAngleEdit = ev => {
    ev.stopPropagation && ev.stopPropagation()
  }
  onGradientDirectionAngleMouseUp = () => {
    this.setState({ isGradientAngleBeingDragged: false })
    document.removeEventListener(
      'mouseup',
      this.onGradientDirectionAngleMouseUp
    )
  }

  componentDidUpdate() {
    super.componentDidUpdate && super.componentDidUpdate()
    $('#sp-background-solid-colorpicker').spectrum(
      'set',
      this.props.currentStyle
    )
  }
  parseGradientString = () => {
    let gradientString,
      gradientFormatMatch,
      gradientFormat = {}
    let gradientStringMatch = this.props.currentStyle.match(
      /(repeating-)?(linear|radial)-gradient\((.*)\)/
    )
    if (!gradientStringMatch) {
      return {}
    }
    gradientFormat.isRepeating = gradientStringMatch[1] !== undefined
    gradientFormat.type = gradientStringMatch[2]
    gradientString = gradientStringMatch[3]
    switch (gradientFormat.type) {
      case 'radial':
        gradientFormat.shape = 'ellipse'
        gradientFormatMatch = gradientString.match(
          /(circle|ellipse)\s*(.*?)\s*(?:at\s*(\S*?)\s*(\S*?)\s*)?,/
        )
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
          let gradientDegreeMatch = gradientFormat.direction
            .trim()
            .match(/(.+)deg/)
          if (gradientDegreeMatch) {
            gradientFormat.directionAngle = gradientDegreeMatch[1]
          }
        }
        break
    }
    gradientFormat.colorStops = gradientString.match(/((?:rgba?.*?\)|#)[^,]*)/g)
    gradientFormat.colorStops =
      gradientFormat.colorStops &&
      gradientFormat.colorStops.map(function(e, i, a) {
        let ret = {}
        let colorPosArr = e.trim().match(/(rgba?.*?\)|[\w#\.%]+)/g)
        let c = colorPosArr[0]
        let p
        if (colorPosArr.length > 1) {
          p = Number(colorPosArr[1].trim().replace('%', ''))
        } else {
          if (i == 0) {
            p = 0
          } else if (i === a.length - 1) {
            p = 100
          }
        }
        ret.c = c
        ret.p = p
        return ret
      })
    return gradientFormat
  }
  composeGradientString = (...args) => {
    let gradientFormat, colorStops
    if (args[0].constructor === Array) {
      colorStops = args[0]
    } else {
      colorStops = args[0].colorStops
      gradientFormat = args[0]
    }
    let gradientFormatString = ''
    if (gradientFormat) {
      gradientFormatString =
        (gradientFormat.type === 'linear' && gradientFormat.direction
          ? gradientFormat.direction
          : '') + ' '
      gradientFormatString +=
        (gradientFormat.type === 'radial'
          ? gradientFormat.shape || 'ellipse'
          : '') + ' '
      gradientFormatString += (gradientFormat.extent || '') + ' '
      gradientFormatString +=
        gradientFormat.position &&
        (gradientFormat.position.x !== undefined ||
          gradientFormat.position.y !== undefined)
          ? ' at '
          : ''
      gradientFormatString +=
        (gradientFormat.position && gradientFormat.position.x !== undefined
          ? gradientFormat.position.x
          : '') + ' '
      gradientFormatString +=
        (gradientFormat.position && gradientFormat.position.y !== undefined
          ? gradientFormat.position.y
          : '') + ' '
      gradientFormatString = gradientFormatString.replace(/\s+/g, ' ').trim()
      gradientFormatString += gradientFormatString.length > 0 ? ',' : ''
    }
    let gradientStringArr =
      colorStops &&
      colorStops
        .sort(function(a, b) {
          return a.p - b.p
        })
        .map(function(e) {
          return e.c + ' ' + e.p + '%'
        })
    let gradientString = gradientStringArr ? gradientStringArr.join(', ') : ''
    let fullGradientString = this.props.currentStyle.replace(
      /-gradient\(.*\)/,
      '-gradient(' + gradientFormatString + gradientString + ')'
    )
    if (gradientFormat) {
      fullGradientString = fullGradientString.replace(
        /(repeating-)?(linear|radial)-gradient/,
        (match, p1, p2) =>
          (gradientFormat.isRepeating ? 'repeating-' : '') +
          gradientFormat.type +
          '-gradient'
      )
    }
    return fullGradientString
  }
  render() {
    let type,
      gradientExtentSelect,
      gradientExtentXExtentPct,
      gradientExtentYExtentPct,
      gradientDirection,
      gradientAngle,
      gradientFormat,
      gradientExtentXPosition = '',
      gradientExtentYPosition = ''
    if (this.props.currentStyle) {
      gradientFormat = this.parseGradientString()
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
        if (gradientFormat.position && gradientFormat.position.x) {
          gradientExtentXPosition = parseInt(gradientFormat.position['x'])
          try {
            gradientExtentYPosition = parseInt(gradientFormat.position['y'])
          } catch (ex) {}
        }
      }
      if (this.props.currentStyle.match(/^(repeating-)?radial-gradient/)) {
        type = 'radial-gradient'
      } else if (
        this.props.currentStyle.match(/^(repeating-)?linear-gradient/)
      ) {
        type = 'linear-gradient'
      } else if (this.props.currentStyle.match(/^(rgba?\(|transparent)/)) {
        type = 'color'
      }
    }
    let gradientExtentInput
    if (gradientFormat && gradientExtentSelect === 'length') {
      switch (gradientFormat.shape) {
        case 'circle':
          gradientExtentInput = (
            <span className="col-xs-4">
              <input
                type="text"
                value={gradientExtentXExtentPct}
                size={1}
                onChange={this.onChangeGradientExtentPct.bind(null, 0)}
              />px
            </span>
          )
          break
        case 'ellipse':
          gradientExtentInput = (
            <span className="col-xs-4">
              x:{' '}
              <input
                type="text"
                value={gradientExtentXExtentPct}
                size={1}
                onChange={this.onChangeGradientExtentPct.bind(null, 0)}
              />px y:{' '}
              <input
                type="text"
                value={gradientExtentYExtentPct}
                size={1}
                onChange={this.onChangeGradientExtentPct.bind(null, 1)}
              />px
            </span>
          )
          break
      }
    }
    return (
      <div
        id="sp-color-pattern-editor"
        className={this.state.isGradientAngleBeingDragged ? 'noselect' : ''}
      >
        <div
          className="panel-group"
          id="accordion"
          role="tablist"
          aria-multiselectable="false"
        >
          <div className="panel panel-default">
            <div
              className="panel-heading"
              id="headingOne"
              role="button"
              data-toggle="collapse"
              data-parent="#accordion"
              aria-expanded="false"
              aria-controls="collapseOne"
              href="#collapseOne"
              onClick={evt => {
                if (type !== 'color') {
                  this.props.updateStyle({ background: 'rgb()' })
                }
              }}
            >
              <h4 className="panel-title">
                <span aria-expanded="true" aria-controls="collapseOne">
                  <i className="material-icons">
                    {type === 'color'
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </i>{' '}
                  &nbsp; color
                </span>
              </h4>
            </div>
            <div
              id="collapseOne"
              className={classNames(
                'panel-collapse',
                'collapse',
                type === 'color' ? 'in' : null
              )}
              role="tabpanel"
              aria-labelledby="headingOne"
            >
              <div className="panel-body">
                <input id="sp-background-solid-colorpicker" />
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div
              className="panel-heading"
              id="headingTwo"
              role="button"
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              onClick={evt => {
                if (type !== 'linear-gradient') {
                  this.props.updateStyle({ background: 'linear-gradient()' })
                }
              }}
            >
              <h4 className="panel-title collapsed">
                <i className="material-icons">
                  {type === 'linear-gradient'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </i>{' '}
                &nbsp; linear gradient
              </h4>
            </div>
            <div
              id="collapseTwo"
              className={classNames(
                'panel-collapse',
                'collapse',
                type === 'linear-gradient' ? 'in' : null
              )}
              role="tabpanel"
              aria-labelledby="headingTwo"
            >
              <div className="panel-body container-fluid">
                <div className="row">
                  <div className="col-xs-2">Repeating</div>
                  <div className="col-xs-1">
                    <input
                      type="checkbox"
                      onClick={this.onToggleIsRepeating}
                      defaultChecked={
                        gradientFormat && gradientFormat.isRepeating
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-2">Direction</div>
                  <div className="col-xs-4">
                    <DropdownList
                      data={linearGradientDirectionArr}
                      valueField="value"
                      textField="text"
                      value={gradientDirection}
                      onChange={this.onChangeGradientDirection}
                    />
                  </div>
                  <div className="col-xs-1" />
                  <div
                    style={{
                      display:
                        gradientDirection === 'to angle' ? 'inline' : 'none'
                    }}
                  >
                    <AngleInput
                      className="col-xs-1 default-input angle-input"
                      onInput={this.onChangeGradientDirectionAngle}
                      onChange={this.onChangeGradientDirectionAngle}
                      defaultValue={(parseInt(gradientAngle || 0) + 360) % 360}
                    >
                      <span className="centered">
                        <span
                          contentEditable={
                            this.state.isGradientAngleBeingDragged
                              ? false
                              : true
                          }
                          onMouseDown={this.onGradientDirectionAngleEdit}
                          onKeyDown={this.onGradientDirectionAngleInputKeydown}
                          onBlur={this.onChangeGradientDirectionAngle}
                          dangerouslySetInnerHTML={{ __html: gradientAngle }}
                        />°
                      </span>
                    </AngleInput>
                  </div>
                </div>
                Color Stops
                <ColorStops
                  id="sp-linear-color-stops"
                  parseGradientString={this.parseGradientString}
                  updateStyle={this.props.updateStyle}
                  composeGradientString={this.composeGradientString}
                />
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div
              className="panel-heading"
              role="button"
              id="headingThree"
              data-toggle="collapse"
              data-parent="#accordion"
              aria-expanded="false"
              aria-controls="collapseThree"
              href="#collapseThree"
              onClick={evt => {
                if (type !== 'radial-gradient') {
                  this.props.updateStyle({ background: 'radial-gradient()' })
                }
              }}
            >
              <h4 className="panel-title">
                <i className="material-icons">
                  {type === 'radial-gradient'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </i>{' '}
                &nbsp; radial gradient
              </h4>
            </div>
            <div
              id="collapseThree"
              className={classNames(
                'panel-collapse',
                'collapse',
                type === 'radial-gradient' ? 'in' : null
              )}
              role="tabpanel"
              aria-labelledby="headingThree"
            >
              <div className="panel-body container-fluid">
                <div className="row">
                  <div className="col-xs-2">Repeating</div>
                  <div className="col-xs-1">
                    <input
                      type="checkbox"
                      onClick={this.onToggleIsRepeating}
                      defaultChecked={
                        gradientFormat && gradientFormat.isRepeating
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-2">Shape</div>
                  <div className="col-xs-2">
                    <input
                      type="radio"
                      name="shape"
                      value="circle"
                      onChange={this.onToggleGradientShape}
                      checked={
                        !!(gradientFormat && gradientFormat.shape === 'circle')
                      }
                    />Circle
                  </div>
                  <div className="col-xs-2">
                    <input
                      type="radio"
                      name="shape"
                      value="ellipse"
                      onChange={this.onToggleGradientShape}
                      checked={
                        !!(gradientFormat && gradientFormat.shape === 'ellipse')
                      }
                    />Ellipse
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-2">Extent</div>
                  <div className="col-xs-4">
                    <DropdownList
                      data={gradientExtentSelectionArr}
                      valueField="value"
                      textField="text"
                      value={gradientExtentSelect}
                      onChange={this.onChangeGradientExtent}
                    />
                  </div>
                  {gradientExtentInput}
                </div>
                <div className="row">
                  <div className="col-xs-2">Position</div>
                  <div className="col-xs-2">
                    <input
                      type="radio"
                      name="position"
                      value="center"
                      onChange={this.onChangeGradientPosition.bind(null, null)}
                      checked={
                        !!(
                          !gradientFormat ||
                          !gradientFormat.position ||
                          !gradientFormat.position.x
                        )
                      }
                    />Center
                  </div>
                  <div className="col-xs-8">
                    <input
                      type="radio"
                      name="position"
                      value="position"
                      onChange={this.onChangeGradientPosition.bind(null, 'x')}
                      checked={
                        !!(
                          gradientFormat &&
                          gradientFormat.position &&
                          gradientFormat.position.x
                        )
                      }
                    />
                    x:{' '}
                    <input
                      type="text"
                      value={gradientExtentXPosition}
                      size={1}
                      onChange={this.onChangeGradientPosition.bind(null, 'x')}
                    />px y:{' '}
                    <input
                      value={gradientExtentYPosition}
                      size={1}
                      onChange={this.onChangeGradientPosition.bind(null, 'y')}
                    />px
                  </div>
                </div>
                Color Stops
                <ColorStops
                  id="sp-radial-color-stops"
                  parseGradientString={this.parseGradientString}
                  updateStyle={this.props.updateStyle}
                  composeGradientString={this.composeGradientString}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
