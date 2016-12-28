'use strict'
import React from 'react'
import OpenEntry from './openEntry'
import lang from 'i18n/lang'

let FileOpener = React.createClass({
  render: function () {
    let keys = []
    for (var key in localStorage) {
      if (key.endsWith('.spj')) {
        keys.push(<OpenEntry
          name={key}
          key={key}
          onNewDeck={this.props.onNewDeck}
        />)
      }
    }
    return <div id="sp-file-open" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{lang.open}</h4>
          </div>
          <div className="modal-body">
            {keys}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{lang.btnCancel}</button>
          </div>
        </div>
      </div>
    </div>
  }
})
module.exports = FileOpener
