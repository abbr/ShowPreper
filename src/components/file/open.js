'use strict'
import React from 'react'
import OpenEntry from './openEntry'

let FileOpener = React.createClass({
  render: function () {
    let keys = []
    for (var key in localStorage) {
      if (key.endsWith('.spj')) {
        keys.push(<OpenFileEntry
          name={key}
          key={key}
          onNewDeck={this.props.onNewDeck}
        />)
      }
    }
    return <div id="fileOpen" className="sp-modal-dialog">
      <div>
        <a href="#close" title="Close" className="sp-modal-close">X</a>
        <h2>Open ...</h2>
        {keys}
      </div>
    </div>
  }
})
module.exports = FileOpener
