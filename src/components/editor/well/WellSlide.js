'use strict'

var React = require('react')
var ComponentViewFactory = require('components/widgets/componentViewFactory')
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
      let ComponentView = ComponentViewFactory(component)
      return (
        <ComponentView component={component}
          key = {index}
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
