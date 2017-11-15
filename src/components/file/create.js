'use strict'
import React from 'react'
import { langs } from 'i18n/lang'
import classNames from 'classnames'

export default class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fn: '',
      errMsg: '',
      okBtnDisabled: true
    }
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    $('#' + this.props.domId).on('hidden.bs.modal', () => {
      this.setState({
        fn: '',
        errMsg: '',
        okBtnDisabled: true
      })
    })
  }

  onChange = e => {
    let newName = e.target.value + '.spj'
    if (Object.keys(localStorage).indexOf(newName) >= 0) {
      this.setState({
        errMsg: langs[this.props.language].duplicatedFileNameErr,
        okBtnDisabled: true
      })
    } else if (newName.length === 4) {
      this.setState({
        errMsg: langs[this.props.language].emptyFileNameErr,
        okBtnDisabled: true
      })
    } else {
      this.setState({ errMsg: '', okBtnDisabled: false })
    }
    this.setState({ fn: newName })
  }
  onOk = () => {
    this.props.onNewDeck(
      this.state.fn,
      this.props.mode === 'saveAs' ? this.props.deck : undefined
    )
  }

  render() {
    return (
      <div
        id={this.props.domId}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">
                {langs[this.props.language][this.props.mode]}
              </h4>
            </div>
            <div className="modal-body">
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.fn.replace(/\.spj$/, '')}
              />.spj
              <p />
              <div
                className={classNames(
                  'alert',
                  this.state.errMsg ? 'alert-danger' : 'alert-warning'
                )}
                dangerouslySetInnerHTML={{
                  __html:
                    this.state.errMsg ||
                    langs[this.props.language].saveAsWarning
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {langs[this.props.language].btnCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onOk}
                data-dismiss="modal"
                disabled={this.state.okBtnDisabled}
              >
                {langs[this.props.language].btnOk}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
