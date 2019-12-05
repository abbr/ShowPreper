import React from 'react'
import './bespokeThemeMenu.less'
import { langs } from 'i18n/lang'
let formats = require.context(
  './img', // context folder
  true // useSubdirectories
)
module.exports = class extends React.Component {
  updateBespokeTheme = fileName => {
    let theme = fileName.match(/\.\/(\w+)\.svg/)[1]
    this.props.onSelectedWidgetUpdated(
      {
        container: this.props.deck,
        index: -1
      },
      { bespokeTheme: theme }
    )
  }

  render() {
    let imgs = formats.keys().map((e, i) => {
      return (
        <li key={i}>
          <a onClick={this.updateBespokeTheme.bind(null, e)}>
            <img src={formats(e).default} />
          </a>
        </li>
      )
    })
    return (
      <div className="sp-bespoke-format-menu dropdown">
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
        >
          <div className="btn-label">
            {langs[this.props.language].setBespokeThemeTo}
            <img
              src={formats(
                './' + (this.props.deck.bespokeTheme || 'coverflow') + '.svg'
              ).default}
              className="sp-bespoke-active-theme"
            />
            <span className="caret" />
          </div>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {imgs}
        </ul>
      </div>
    )
  }
}
