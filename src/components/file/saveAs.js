'use strict'
import React from 'react'

let FileSaveAs = React.createClass({
  render: function () {
    return <div id="fileSaveAs" className="sp-modal-dialog">
      <div>
        <a href="#close" title="Close" className="sp-modal-close">X</a>
        <h2>Save As ...</h2>
      </div>
    </div>
  }
})
module.exports = FileSaveAs
