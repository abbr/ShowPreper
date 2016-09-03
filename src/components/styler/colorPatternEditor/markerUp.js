import React from 'react'
export default React.createClass({
  render() {
    return (
      <svg className="marker-up" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red"
           aria-labelledby="title">
        <title>marker up</title>
        <defs>
          <ref id="paramX" param="x" default="3"/>
          <filter id="f1" x="0" y="0" width="150%" height="150%">
            <feOffset result="offOut" in="SourceAlpha" dx={this.props.down ? 1 : 3} dy={this.props.down ? 1 : 3}/>
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation={this.props.down ? 1 : 2}/>
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
          </filter>
        </defs>
        <path id="marker-up" filter="url(#f1)" d="M 8 0 L 16 16 L 0 16 z"></path>
      </svg>
    )
  }
})
