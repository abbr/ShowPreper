import React from 'react'
import _ from 'lodash'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import parseColor from 'parse-color'
var markerId = 0
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markerId: markerId++
    }
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    $(
      '#' + this.props.panelId + '-markerColorPicker' + this.props.index
    ).spectrum({
      color: this.props.attrs.c,
      showAlpha: true,
      showInput: true,
      allowEmpty: true,
      preferredFormat: 'rgb',
      change: tinycolor => {
        let c = tinycolor.toRgb()
        let rgba = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')'
        this.props.updateMarkerColor(this.props.attrs, rgba)
      }
    })
  }
  componentDidUpdate() {
    super.componentDidUpdate && super.componentDidUpdate()
    $(
      '#' + this.props.panelId + '-markerColorPicker' + this.props.index
    ).spectrum('set', this.props.attrs.c)
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    $(
      '#' + this.props.panelId + '-markerColorPicker' + this.props.index
    ).spectrum('destroy')
  }
  render() {
    let s = _.assign({}, this.props.style, {
      marginLeft: -8,
      marginBottom: -16
    })
    return (
      <div
        className="sp-gradient-marker"
        title=""
        style={s}
        onMouseDown={evt => {
          evt.stopPropagation()
        }}
        onTouchStart={evt => {
          evt.stopPropagation()
          evt.preventDefault()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill={'rgb(' + parseColor(this.props.attrs.c).rgb + ')'}
          aria-labelledby="title"
        >
          <title>marker</title>
          <defs>
            <filter
              id={this.state.markerId + '-pressed'}
              x="0"
              y="0"
              width="150%"
              height="150%"
            >
              <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <filter
              id={this.state.markerId + '-unpressed'}
              x="0"
              y="0"
              width="150%"
              height="150%"
            >
              <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <path
              id={this.state.markerId + '-up-pressed'}
              filter={'url(#' + this.state.markerId + '-pressed)'}
              d="M 8 0 L 16 16 L 0 16 z"
            />
            <path
              id={this.state.markerId + '-down-pressed'}
              filter={'url(#' + this.state.markerId + '-pressed)'}
              d="M 0 0 L 16 0 L 8 16 z"
            />
            <path
              id={this.state.markerId + '-up-unpressed'}
              filter={'url(#' + this.state.markerId + '-unpressed)'}
              d="M 8 0 L 16 16 L 0 16 z"
            />
            <path
              id={this.state.markerId + '-down-unpressed'}
              filter={'url(#' + this.state.markerId + '-unpressed)'}
              d="M 0 0 L 16 0 L 8 16 z"
            />
          </defs>
          <use
            xlinkHref={
              '#' +
              this.state.markerId +
              '-' +
              (this.props.down ? 'down-' : 'up-') +
              (this.props.pressed ? 'pressed' : 'unpressed')
            }
            onMouseDown={evt => {
              this.props.onMouseDown(evt, this.props.attrs)
            }}
            onTouchStart={evt => {
              this.props.onMouseDown(evt, this.props.attrs)
            }}
            onClick={evt => {
              this.props.onClick(evt, this.props.attrs)
            }}
            style={{ cursor: 'pointer' }}
          />
        </svg>
        <div
          style={{
            display: this.props.pressed ? 'block' : 'none',
            position: 'relative',
            width: 50,
            left: -Math.max(0, this.props.attrs.p - 90) * 3
          }}
        >
          <input
            id={this.props.panelId + '-markerColorPicker' + this.props.index}
          />
        </div>
      </div>
    )
  }
}
