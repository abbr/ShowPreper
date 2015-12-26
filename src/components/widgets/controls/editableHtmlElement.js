'use strict'
import React from 'react'
import lang from 'i18n/lang'

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
    let newV = parseInt(ev.target.innerHTML)
    let newPropObj = {}
    newPropObj[this.props.componentPropName] = newV
    !isNaN(newV) && this.props.onSelectedWidgetUpdated(this.props.idx, newPropObj, lang.moveComponents)
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
