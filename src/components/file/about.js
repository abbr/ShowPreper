'use strict'
import React from 'react'
import lang from 'i18n/lang'

module.exports = React.createClass({
  render: function () {
    let gitHashTag
    let gitHash = '$$GIT_HASH$$'
    if (gitHash.length > 0) {
      gitHashTag = <li>Git Hash: {gitHash}</li>
    }
    return <div id="sp-about" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">ShowPreper</h4>
          </div>
          <div className="modal-body">
            Copyright © 2017 <a href="https://github.com/abbr">@abbr</a> under MIT license.
            <ul>
              <li><a href="https://github.com/abbr/showpreper" target="_blank">Source Code</a>
              </li>
              <li><a href="https://abbr.github.io/ShowPreper/" target="_blank">Product Home Page</a>
              </li>
              {gitHashTag}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{lang.btnCancel}</button>
          </div>
        </div>
      </div>
    </div>
  }
})
