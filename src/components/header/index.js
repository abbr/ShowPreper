'use strict'
import React from 'react'
import { langs } from 'i18n/lang'
import FileMenu from './fileMenu'
import StyleMenu from './styleMenu'
import './index.less'
import _ from 'lodash'
import BespokeThemeMenu from './bespokeThemeMenu'

module.exports = class Header extends React.Component {
  createWidget = type => {
    let deck = this.props.deck
    let activeSlide = deck.getActiveSlide()
    activeSlide.components.forEach(e => {
      delete e.selected
    })
    this.props.onNewWidget(
      activeSlide,
      null,
      {
        type: type,
        x: 0,
        y: 0,
        text:
          '<p><span style="font-size: 26px"><span style="font-family:arial,helvetica,sans-serif">(' +
          langs[this.props.language]['triClickEdt'] +
          ')</span></span></p>',
        selected: true
      },
      langs[this.props.language]['new'] + ' ' + langs[this.props.language][type]
    )
  }

  render() {
    let bespokeThemeMenu, styleMenu
    if (
      this.props.currentView === 'overview' &&
      this.props.presentationFormat === 'bespoke'
    ) {
      bespokeThemeMenu = <BespokeThemeMenu {...this.props} />
    }
    if (
      this.props.currentView === 'slides' ||
      this.props.presentationFormat !== 'handouts'
    ) {
      styleMenu = <StyleMenu {...this.props} />
    }
    return (
      <nav className="navbar navbar-default sp-header">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#sp-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <FileMenu {...this.props} />
          </div>
          <div className="collapse navbar-collapse" id="sp-navbar-collapse-1">
            <div
              className="nav navbar-btn navbar-left"
              style={{
                display:
                  this.props.deck.components.length === 0 ? 'none' : undefined
              }}
            >
              <button
                type="button"
                className="btn btn-default"
                style={{
                  display:
                    this.props.currentView !== 'slides' ? 'none' : undefined
                }}
                onClick={() => {
                  this.createWidget('TextBox')
                }}
              >
                <span className={'glyphicon glyphicon-text-width'} />&nbsp;
                <span className={'glyphicon glyphicon-picture'} />&nbsp;
                <span className={'glyphicon glyphicon-globe'} />
                <div className="btn-label">
                  {langs[this.props.language].insertObject}
                </div>
              </button>
              {bespokeThemeMenu}
              {styleMenu}
            </div>
            <div className="navbar-right">
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="sp-header-lang-dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {this.props.language}
                </button>
                <ul
                  className="dropdown-menu sp-lang-dropdown-menu"
                  aria-labelledby="sp-header-lang-dropdown"
                >
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('en')
                      }}
                    >
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('es')
                      }}
                    >
                      Español
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('fr')
                      }}
                    >
                      français
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('nl')
                      }}
                    >
                      Nederlands
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('de')
                      }}
                    >
                      Deutsch
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('zh')
                      }}
                    >
                      中文
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.props.setLanguage('ru')
                      }}
                    >
                      Русский
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="nav navbar-btn sp-view-btns">
                <li
                  style={
                    this.props.currentView !== 'slides'
                      ? {}
                      : { display: 'none' }
                  }
                >
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => {
                      this.props.changeView('slides')
                      this.setState({ selectedStyleTarget: 'defaultSlide' })
                    }}
                  >
                    <span className={'glyphicon glyphicon-th-list'} />
                    <div className="btn-label">
                      {langs[this.props.language].slides}
                    </div>
                  </button>
                </li>
                <li
                  style={
                    this.props.currentView !== 'overview'
                      ? {}
                      : { display: 'none' }
                  }
                >
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => {
                      this.props.changeView('overview')
                      this.setState({ selectedStyleTarget: 'defaultSlide' })
                    }}
                  >
                    <span className={'glyphicon glyphicon-th'} />
                    <div className="btn-label">
                      {langs[this.props.language].overview}
                    </div>
                  </button>
                </li>
              </ul>
              <div className="nav navbar-btn btn-group">
                <a
                  type="button"
                  className="btn btn-success"
                  href={'./' + this.props.presentationFormat + '.html'}
                  target="_blank"
                >
                  <span className="glyphicon glyphicon-play" />
                  <div>
                    {langs[this.props.language][
                      this.props.presentationFormat
                    ] || _.capitalize(this.props.presentationFormat)}
                  </div>
                </a>
                <button
                  type="button"
                  className="btn btn-success dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="caret" />
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'impress'
                      )}
                    >
                      Impress
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'handouts'
                      )}
                    >
                      {langs[this.props.language].handouts}
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'bespoke'
                      )}
                    >
                      Bespoke
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*<!-- /.navbar-collapse -->*/}
        </div>
        {/*<!-- /.container-fluid -->*/}
      </nav>
    )
  }
}
