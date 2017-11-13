'use strict'
import React from 'react'
import { langs } from 'i18n/lang'
import QuickStyler from 'components/styler/quick'
import './styleMenu.less'
module.exports = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStyleTarget: 'defaultSlide'
    }
  }

  render() {
    return (
      <div className="sp-navbar-style">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
          >
            <div>{langs[this.props.language].setAppearance}</div>
            <div className="btn-label">
              {langs[this.props.language][this.state.selectedStyleTarget]}
              <span className="caret" />
            </div>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>
              <a
                onClick={() => {
                  this.setState({ selectedStyleTarget: 'defaultSlide' })
                }}
              >
                {langs[this.props.language].defaultSlide}
              </a>
            </li>
            {(this.props.currentView === 'slides' ||
              this.props.presentationFormat === 'bespoke') && (
                <li>
                  <a
                    onClick={() => {
                      this.setState({ selectedStyleTarget: 'thisSlide' })
                    }}
                  >
                    {langs[this.props.language].thisSlide}
                  </a>
                </li>
              )}
            {this.props.currentView === 'overview' &&
              this.props.presentationFormat === 'impress' && (
                <li>
                  <a
                    onClick={() => {
                      this.setState({ selectedStyleTarget: 'selectedSlides' })
                    }}
                  >
                    {langs[this.props.language].selectedSlides}
                  </a>
                </li>
              )}
            {this.props.currentView === 'overview' && (
              <li>
                <a
                  onClick={() => {
                    this.setState({ selectedStyleTarget: 'presentation' })
                  }}
                >
                  {langs[this.props.language].presentation}
                </a>
              </li>
            )}
          </ul>
        </div>
        <QuickStyler
          selectedStyleTarget={this.state.selectedStyleTarget}
          presentationStyle={this.props.presentationStyle}
          deck={this.props.deck}
          language={this.props.language}
          defaultSlideStyle={this.props.defaultSlideStyle}
          selectedSlidesStyle={this.props.selectedSlidesStyle}
          thisSlideStyle={this.props.thisSlideStyle}
          setTargetStyle={this.props.setTargetStyle}
          onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
        />
      </div>
    )
  }
}
