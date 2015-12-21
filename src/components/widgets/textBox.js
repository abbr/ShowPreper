'use strict'
import React from 'react'
import lang from 'i18n/lang'
import Draggable from 'components/mixins/draggable'
let TextBox = React.createClass({
  mixins: [Draggable],
  render: function () {
    return (
      <div className="sp-widget"
           draggable={this.props.editable || false}
           onDrag={this.onDrag}
           onDragStart={this.onDragStart}
           style={{left: this.props.x, top: this.props.y}}
           dangerouslySetInnerHTML={{__html: this.props.text}}>
      </div>)
  }
})
module.exports = TextBox
