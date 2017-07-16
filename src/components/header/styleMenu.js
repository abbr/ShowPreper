'use strict'
import React from 'react'
import lang from 'i18n/lang'
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
            <div>
              {lang.setAppearance}
            </div>
            <div className="btn-label">
              {lang[this.state.selectedStyleTarget]}
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
                {lang.defaultSlide}
              </a>
            </li>
            {(this.props.currentView === 'slides' ||
              this.props.presentationFormat === 'bespoke') &&
              <li>
                <a
                  onClick={() => {
                    this.setState({ selectedStyleTarget: 'thisSlide' })
                  }}
                >
                  {lang.thisSlide}
                </a>
              </li>}
            {this.props.currentView === 'overview' &&
              this.props.presentationFormat === 'impress' &&
              <li>
                <a
                  onClick={() => {
                    this.setState({ selectedStyleTarget: 'selectedSlides' })
                  }}
                >
                  {lang.selectedSlides}
                </a>
              </li>}
            {this.props.currentView === 'overview' &&
              <li>
                <a
                  onClick={() => {
                    this.setState({ selectedStyleTarget: 'presentation' })
                  }}
                >
                  {lang.presentation}
                </a>
              </li>}
          </ul>
        </div>
        <QuickStyler
          selectedStyleTarget={this.state.selectedStyleTarget}
          presentationStyle={this.props.presentationStyle}
          deck={this.props.deck}
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
