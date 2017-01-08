import React from 'react'
import lang from 'i18n/lang'
export default React.createClass({
  getInitialState: function () {
    return {draggable: true, target: 'thisSlide'}
  },
  componentWillMount: function () {
    this.mouseDownHdlrs = []
  },
  onClick: function () {
    this.setState({target: this.state.target === 'thisSlide' ? 'defaultSlide' : 'thisSlide'})
  },
  render: function () {
    return <svg className="sp-ot-dragger" width="64" height="64"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.onClick}>
      <defs>
        <g id="svg-defaultSlide">
          <line x1="29" y1="0" x2="29" y2="64" stroke="#000000"/>
          <line x1="32" y1="0" x2="32" y2="64" stroke="#000000"/>
          <line x1="35" y1="0" x2="35" y2="64" stroke="#000000"/>
        </g>
        <line id="svg-thisSlide" stroke="#000000" y2="64" x2="32" y1="0" x1="32" strokeWidth="5" fill="none"/>
      </defs>
      <g>
        <title>{lang.dragToChangeAspectRatio + ';\n' + (this.state.target === 'thisSlide' ? lang.clickToChangeDefaultSlide : lang.clickToChangeThisSlide)}</title>
        <use xlinkHref={'#svg-' + this.state.target}></use>
        <g>
          <path transform="rotate(45 23.456237792968754,32) "
                d="m21.072446,34.383791l0,-4.767581l4.767581,4.767581l-4.767581,0z" strokeWidth="5"
                stroke="#000000"/>
          <path stroke="#000000" transform="rotate(-135 40.54376220703125,32) "
                d="m38.159972,34.38379l0,-4.76758l4.76758,4.76758l-4.76758,0z" strokeWidth="5"/>
        </g>
      </g>
    </svg>
  }
})
