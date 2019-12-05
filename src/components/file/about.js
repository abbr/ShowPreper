import React from 'react'
import { langs } from 'i18n/lang'

module.exports = class extends React.Component {
  render() {
    let gitHashTag
    let gitHash = '$$GIT_HASH$$'
    if (gitHash.length > 0) {
      gitHashTag = <li>Git Hash: {gitHash}</li>
    }
    return (
      <div id="sp-about" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
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
              <h4 className="modal-title">ShowPreper</h4>
            </div>
            <div className="modal-body">
              <span
                dangerouslySetInnerHTML={{
                  __html: langs[this.props.language].copyRightStatement.replace(
                    '@author@',
                    '<a href="https://github.com/abbr">@abbr</a>'
                  )
                }}
              />
              <ul>
                <li>
                  <a href="https://github.com/abbr/showpreper" target="_blank">
                    {langs[this.props.language].sourceCode}
                  </a>
                </li>
                <li>
                  <a href="https://abbr.github.io/ShowPreper/" target="_blank">
                    {langs[this.props.language].productHomePage}
                  </a>
                </li>
                {gitHashTag}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {langs[this.props.language].btnCancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
