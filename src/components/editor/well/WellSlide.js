'use strict'

var React = require('react')
var ComponentViewFactory = require('components/widgets/componentViewFactory')
var WellSlide = React.createClass({
  _clicked: function () {
    this.props.onSlideClicked(this.props.index)
  },
  render: function () {
    let componentsView = this.props.model.components.map((component, index) => {
      let ComponentView = ComponentViewFactory(component)
      return (
        <ComponentView {...component}
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
        {componentsView}
      </div>
    )
  }
})

module.exports = WellSlide
