'use strict'
import React from 'react'
import lang from 'i18n/lang'
let TextBox = React.createClass({
  render: function () {
    return <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
  }
})
module.exports = TextBox
