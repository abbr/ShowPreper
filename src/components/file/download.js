'use strict'
import React from 'react'
import lang from 'i18n/lang'

module.exports = class Exporter extends React.Component {
  render() {
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
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#sp-project" aria-controls="project" role="tab"
                                                            data-toggle="tab">{lang.project}</a></li>
              <li role="presentation"><a href="#sp-presentation" aria-controls="presentation" role="tab"
                                         data-toggle="tab">{lang.presentation}</a></li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane fade in active" id="sp-project">
                <div className="alert alert-info">
                  {lang.downloadProjectFileExplain}
                </div>
                <div className="alert alert-success">
                  <a href={blobURL}
                     download={this.props.deck._fn + (this.props.deck._fn.endsWith('.spj') ? "" : ".spj")}>{lang.download} {this.props.deck._fn}</a>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane fade" id="sp-presentation">
                <div className="alert alert-info">The most effective way to archive your rendered presentation is to:
                  <ol>
                    <li>Click the
                      <a type="button" className="btn btn-success">
                        <span className="glyphicon glyphicon-play"/>
                        <div>{this.props.presentationFormat}</div>
                      </a>

                      button
                    </li>
                    <li>Press <code>Ctrl+S</code>(windows) or <code>⌘+S</code>(Mac) to save the entire presentation to
                      disk.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{lang.btnClose}</button>
          </div>
        </div>
      </div>
    </div>
  }
}

