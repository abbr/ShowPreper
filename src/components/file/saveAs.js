'use strict'
import React from 'react'
import lang from 'i18n/lang'

let FileSaveAs = React.createClass({
  onChange: function (e) {
    let newName = e.target.value + '.spj'
    if (newName !== this.props.deck._fn && Object.keys(localStorage).indexOf(newName) >= 0) {
      this.refs.errorMsg.innerHTML = lang.duplicatedFileNameErr
    }
    else if (newName.length === 4) {
      this.refs.errorMsg.innerHTML = lang.emptyFileNameErr
    }
    else {
      this.refs.errorMsg.innerHTML = ''
    }
  },
  onOk: function () {
    this.props.onNewDeck(this.refs.fname.value + '.spj', this.props.deck)
  },
  render: function () {
    return <div id="fileSaveAs" className="sp-modal-dialog">
      <div>
        <a href="#close" title="Close" className="sp-modal-close">X</a>
        <h2>Save As ...</h2>
        <input type="text" name="fname" onChange={this.onChange}
               defaultValue={this.props.deck._fn.replace(/\.spj$/,'')} ref="fname"></input>.spj
        <div style={{color: 'red'}} ref="errorMsg"></div>
        <a
          className="btn btn-primary"
          onClick={this.onOk}
          href="#close"
        >{lang.btnOk}
        </a>
        <a
          href="#close"
          className="btn btn-primary"
        >{lang.btnCancel}
        </a>
      </div>
    </div>
  }
})
module.exports = FileSaveAs
