'use strict'
import React from 'react'
import { langs } from 'i18n/lang'
import _ from 'lodash'

module.exports = class Exporter extends React.Component {
  render() {
    let blob = new Blob([JSON.stringify(this.props.deck, null, 2)], {
      type: 'application/json'
    })
    let blobURL = window.URL.createObjectURL(blob)
    return (
      <div
        id="sp-open-download"
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
                {langs[this.props.language].download}
              </h4>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a
                    href="#sp-project"
                    aria-controls="project"
                    role="tab"
                    data-toggle="tab"
                  >
                    {langs[this.props.language].project}
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#sp-presentation"
                    aria-controls="presentation"
                    role="tab"
                    data-toggle="tab"
                  >
                    {langs[this.props.language].presentation}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className="tab-pane fade in active"
                  id="sp-project"
                >
                  <div className="alert alert-info">
                    {langs[this.props.language].downloadProjectFileExplain}
                  </div>
                  <div className="alert alert-success">
                    <a
                      href={blobURL}
                      download={
                        this.props.deck._fn +
                        (this.props.deck._fn.endsWith('.spj') ? '' : '.spj')
                      }
                    >
                      {langs[this.props.language].download}{' '}
                      {this.props.deck._fn}
                    </a>
                  </div>
                </div>
                <div
                  role="tabpanel"
                  className="tab-pane fade"
                  id="sp-presentation"
                >
                  <div className="alert alert-info">
                    {langs[this.props.language].downloadRenderedPresentation}
                    <ol>
                      <li>{langs[this.props.language].closeThisDialog}</li>
                      <li>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: langs[
                              this.props.language
                            ].clickRenderButton.replace(
                              '{BTN}',
                              `<a type="button" class="btn btn-success">
                          <span class="glyphicon glyphicon-play" />
                          <div>${langs[this.props.language][
                            this.props.presentationFormat
                          ] ||
                            _.capitalize(this.props.presentationFormat)}</div>
                        </a>`
                            )
                          }}
                        />
                      </li>
                      <li>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: langs[this.props.language].pressCtrlSToSave
                              .replace('{CtrlS}', '<code>Ctrl+S</code>')
                              .replace('{CmdS}', '<code>⌘+S</code>')
                          }}
                        />
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {langs[this.props.language].btnClose}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
