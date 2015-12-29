'use strict'
import React from 'react'

let EditableHtmlElement = React.createClass({
  getInitialState: function () {
    return {
      contentEditable: false
    }
  },
  onMouseDown: function () {
    this.props.onMouseDown && this.props.onMouseDown.apply(this, arguments)
    this.setState({contentEditable: true})
  },
  onBlur: function () {
    this.props.onBlur && this.props.onBlur.apply(this, arguments)
    this.onChange.apply(this, arguments)
    this.setState({contentEditable: false})
  },
  onChange: function (ev) {
    if (ev.key) {
      if (ev.key === 'Enter') {
        ev.preventDefault()
        $(ev.target).trigger("blur")
      }
      return
    }
    this.props.onChange(ev.target.innerHTML)
  },
  render: function () {
    var { eleNm, ...otherProps } = this.props
    otherProps.contentEditable = this.state.contentEditable
    otherProps.onMouseDown = this.onMouseDown
    otherProps.onBlur = this.onBlur
    otherProps.onKeyDown = this.onChange
    return React.DOM[eleNm]({...otherProps})
  }
})
module.exports = EditableHtmlElement
