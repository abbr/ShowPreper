'use strict'
import React from 'react'
import lang from 'i18n/lang'

let Exporter = React.createClass({
  render: function () {
    let blob = new Blob([JSON.stringify(this.props.deck, null, 2)], {
      type: 'application/json'
    })
    let blobURL = window.URL.createObjectURL(blob)
    return <div id="sp-open-download" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{lang.download}</h4>
          </div>
          <div className="modal-body">
            <a href={blobURL} download={this.props.deck._fn + (this.props.deck._fn.endsWith('.spj') ? "" : ".spj")}>{lang.download} {this.props.deck._fn}</a>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{lang.btnCancel}</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onOk}
              data-dismiss="modal"
            >{lang.btnOk}
            </button>
          </div>
        </div>
      </div>
    </div>
  }
})
module.exports = Exporter
