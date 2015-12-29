'use strict'

var React = require('react')
var DisplayableComponent = require('components/widgets/displayableComponent')
import AutoScale from 'components/mixins/autoScale'
import classNames from 'classnames'

var WellSlide = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    this._resized()
  },
  getInitialState: function () {
    return {}
  },
  _resized: function () {
    let deck = this.props.deck
    let slideWidth = deck.slideWidth
    let slideHeight = deck.slideHeight
    this._scale({width: slideWidth, height: slideHeight})
  },
  _clicked: function () {
    this.props.onSlideClicked(this.props.index)
  },
  render: function () {
    let componentsView = this.props.model.components.map((component, index) => {
      return (
        <DisplayableComponent
          component={component}
          key={index}
        />
      )
    })
    return (
      <div
        className={classNames("sp-well-slide"
        , {selected: this.props.deck.activeSlide===this.props.index})}
        onClick={this._clicked}>
        <div
          style={this.state.scaleStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = WellSlide
