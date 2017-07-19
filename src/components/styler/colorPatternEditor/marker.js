import React from 'react'
import _ from 'lodash'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import parseColor from 'parse-color'
import uuidv4 from 'uuid/v4'

export default React.createClass({
  componentDidMount() {
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
  },
  componentDidUpdate: function() {
    $(
      '#' + this.props.panelId + '-markerColorPicker' + this.props.index
    ).spectrum('set', this.props.attrs.c)
  },
  getInitialState: () => ({
    uuid: uuidv4()
  }),
  render: function() {
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
              id={this.state.uuid + '-pressed'}
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
              id={this.state.uuid + '-unpressed'}
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
              id={this.state.uuid + '-up-pressed'}
              filter={'url(#' + this.state.uuid + '-pressed)'}
              d="M 8 0 L 16 16 L 0 16 z"
            />
            <path
              id={this.state.uuid + '-down-pressed'}
              filter={'url(#' + this.state.uuid + '-pressed)'}
              d="M 0 0 L 16 0 L 8 16 z"
            />
            <path
              id={this.state.uuid + '-up-unpressed'}
              filter={'url(#' + this.state.uuid + '-unpressed)'}
              d="M 8 0 L 16 16 L 0 16 z"
            />
            <path
              id={this.state.uuid + '-down-unpressed'}
              filter={'url(#' + this.state.uuid + '-unpressed)'}
              d="M 0 0 L 16 0 L 8 16 z"
            />
          </defs>
          <use
            xlinkHref={
              '#' +
              this.state.uuid +
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
})
