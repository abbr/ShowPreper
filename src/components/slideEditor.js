'use strict'
import React from 'react'
import lang from 'i18n/lang'
let SlideEditor = React.createClass({
  render: function () {
    return <div className="slide-editor">
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>end</p>
      <button type="button" className="btn btn-warning">Default</button>
      <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
    </div>
  }
})

module.exports = SlideEditor
