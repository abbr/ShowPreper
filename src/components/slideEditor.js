import React from 'react'
import lang from 'i18n/lang'
let yeomanImage = require('images/yeoman.png')
module.exports = React.createClass({
  render: () =>
    <div className="slide-editor">
      <img src={yeomanImage} alt="Yeoman Generator"/>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <p>{lang.text}</p>
      <button type="button" className="btn btn-warning">Default</button>
      <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
    </div>
})
