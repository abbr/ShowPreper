'use strict'

var React = require('react')
var DisplayableComponent = require('components/widgets/displayableComponent')
import AutoScale from 'components/mixins/autoScale'
var WellSlide = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    this._resized()
  },
  getInitialState: function () {
    return {}
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
        className={
					"sp-well-slide " + (this.props.model.selected? "selected":'')
				}
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
