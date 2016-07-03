'use strict'

var React = require('react')
let _ = require('lodash')
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
    let componentsView = this.props.component.components.map((component, index) => {
      return (
        <DisplayableComponent
          component={component}
          key={index}
        />
      )
    })
    return (
      <div className="sp-well-slide-container"
           onClick={this._clicked}>
        <div
          className={classNames("sp-well-slide",
          {"sp-selected": this.props.deck.activeSlide===this.props.index})}
          style={_.merge({},this.state.scaleStyle, this.props.selectedSlideStyle || this.props.component.style || this.props.defaultSlideStyle)}>
          {this.props.children}
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = WellSlide
