'use strict'
import React from 'react'
import './index.less'

let Exporter = React.createClass({
  render: function () {
    let blob = new Blob([JSON.stringify(this.props.deck, null, 2)], {
      type: 'application/json'
    })
    let blobURL = window.URL.createObjectURL(blob)
    return <div id="openExport" className="sp-modal-dialog">
      <div>
        <a href="#close" title="Close" className="sp-modal-close">X</a>
        <h2>Export ...</h2>
        <p>This is a sample modal box that can be created using the powers of CSS3.</p>
        <p>You could do a lot of things here like have a pop-up ad that shows when your website loads, or
          create a login/register form for users.</p>
        <a href={blobURL} download={this.props.deck._fn + (this.props.deck._fn.endsWith('.json')?"":".json")}>download</a>
      </div>
    </div>
  }
})
module.exports = Exporter
