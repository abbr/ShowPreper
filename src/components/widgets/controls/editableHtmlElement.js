'use strict'
import React from 'react'

let EditableHtmlElement = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentEditable: false
    }
  }
  onMouseDown = () => {
    this.props.onMouseDown && this.props.onMouseDown.apply(this, arguments)
    this.setState({ contentEditable: true })
  }
  onBlur = () => {
    this.props.onBlur && this.props.onBlur.apply(this, arguments)
    this.setState({ contentEditable: false })
  }
  onKeyPress = ev => {
    if (ev.key !== 'Enter') {
      return
    }
    ev.preventDefault()
    $(ev.target).trigger('blur')
  }
  render() {
    var { eleNm, idx, ...otherProps } = this.props
    otherProps.contentEditable = this.state.contentEditable
    otherProps.onMouseDown = this.onMouseDown
    otherProps.onBlur = this.onBlur
    otherProps.onKeyPress = this.onKeyPress
    return React.DOM[eleNm]({ ...otherProps })
  }
}
module.exports = EditableHtmlElement
