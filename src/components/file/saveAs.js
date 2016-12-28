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
    this.props.onNewDeck(this.state.fn, this.props.deck)
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
    return <div id="sp-file-save-as" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{lang.saveAs}</h4>
          </div>
          <div className="modal-body">
            <input type="text" onChange={this.onChange}
                   value={this.state.fn.replace(/\.spj$/,'')}></input>.spj
            <div style={{color: 'red'}}>{this.state.errMsg}</div>
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
module.exports = FileSaveAs
