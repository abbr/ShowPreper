'use strict'
import React from 'react'
import lang from 'i18n/lang'

let FileSaveAs = React.createClass({
  getInitialState: function () {
    return {
      fn: this.props.deck._fn,
      errMsg: ''
    }
  },
  onChange: function (e) {
    let newName = e.target.value + '.spj'
    if (newName !== this.props.deck._fn && Object.keys(localStorage).indexOf(newName) >= 0) {
      this.setState({errMsg: lang.duplicatedFileNameErr})
    }
    else if (newName.length === 4) {
      this.setState({errMsg: lang.emptyFileNameErr})
    }
    else {
      this.setState({errMsg: ''})
    }
    this.setState({fn: newName})
  },
  onOk: function () {
    this.props.onNewDeck(this.refs.fname.value + '.spj', this.props.deck)
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.deck._fn !== this.props.deck._fn) {
      this.setState({
        fn: nextProps.deck._fn,
        errMsg: ''
      })
    }
  },
  render: function () {
    return <div id="fileSaveAs" className="sp-modal-dialog">
      <div>
        <a href="#close" title="Close" className="sp-modal-close">X</a>
        <h2>Save As ...</h2>
        <input type="text" name="fname" onChange={this.onChange}
               value={this.state.fn.replace(/\.spj$/,'')} ref="fname"></input>.spj
        <div style={{color: 'red'}}>{this.state.errMsg}</div>
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
