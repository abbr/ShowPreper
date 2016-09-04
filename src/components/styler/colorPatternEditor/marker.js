import React from 'react'
export default React.createClass({
  render() {
    return (
      <svg className="marker-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
           aria-labelledby="title">
        <title>marker</title>
        <defs>
          <filter id="f1" x="0" y="0" width="150%" height="150%">
            <feOffset result="offOut" in="SourceAlpha" dx={this.props.pressed ? 1 : 3} dy={this.props.pressed ? 1 : 3}/>
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation={this.props.pressed ? 1 : 2}/>
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
          </filter>
          <path id="up" filter="url(#f1)" d="M 8 0 L 16 16 L 0 16 z"></path>
          <path id="down" filter="url(#f1)" d="M 0 0 L 16 0 L 8 16 z"></path>
        </defs>
        <use xlinkHref={this.props.down ? '#down' : '#up'}></use>
      </svg>
    )
  }
})
