'use strict'
import React from 'react'
import { langs } from 'i18n/lang'
import $script from 'scriptjs'
let TextBox = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editable: false }
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    delete this.editor
  }
  onDoubleClick = ev => {
    let reactEle = this
    this.setState({ editable: true })
    this.props.setDraggable(false)
    if (this.editor) {
      return
    }
    $script.ready('ckeditor', () => {
      let editor = (this.editor = window.CKEDITOR.inline(
        this.refs.editableContent,
        {
          extraPlugins: 'sourcedialog'
        }
      ))
      editor.setData(this.props.component.text)
      editor.on('loaded', function() {
        let editable = editor.editable(this.element)
        editable.hasFocus = true
      })
      editor.on('blur', function() {
        setTimeout(() => {
          this.destroy()
          delete reactEle.editor
        }, 0)
        if (this.getData() !== reactEle.props.component.text) {
          reactEle.props.onSelectedWidgetUpdated &&
            reactEle.props.onSelectedWidgetUpdated(reactEle.props.idx, {
              text: this.getData()
            })
        }
        reactEle.setState({ editable: false })
        reactEle.props.setDraggable(true)
      })
      ev.stopPropagation && ev.stopPropagation()
    })
  }
  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        <div
          contentEditable={this.state.editable}
          title={
            this.props.selected
              ? langs[this.props.language].doubleClickEdit
              : null
          }
          onDoubleClick={this.props.editable && this.onDoubleClick}
          dangerouslySetInnerHTML={{ __html: this.props.component.text }}
          ref="editableContent"
        />
      </div>
    )
  }
}
module.exports = TextBox
