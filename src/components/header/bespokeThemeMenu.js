'use strict'
import React from 'react'
import './bespokeThemeMenu.less'
let formats = require.context(
  "./img", // context folder
  true // useSubdirectories
)
module.exports = React.createClass({
  updateBespokeTheme: function (fileName) {
    let theme = fileName.match(/\.\/(\w+)\.png/)[1]
    this.props.onSelectedWidgetUpdated({
      container: this.props.deck,
      index: -1
    }, {bespokeTheme: theme})
  },
  render: function () {
    let imgs = formats.keys().map((e, i) => {
      return <li key={i}><a onClick={this.updateBespokeTheme.bind(null, e)}><img src={formats(e)}/></a></li>
    })
    return <div className="sp-bespoke-format-menu dropdown">
      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <div className="btn-label">
          xxx<span className="caret"/>
        </div>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        {imgs}
      </ul>
    </div>
  }
})
