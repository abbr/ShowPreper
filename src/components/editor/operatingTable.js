'use strict'

let React = require('react')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'
import AutoScale from 'components/mixins/autoScale'
require('components/editor/operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale],
  allowDrop: function (ev) {
    ev.preventDefault()
  },
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  getInitialState: function () {
    return {}
  },
  render: function () {
    let slide = this.props.deck.getSelectedSlide()
    let componentsView = slide.components.map((component, index) => {
      let EditableComponentView = ComponentViewFactory(component, true)
      return (
        <EditableComponentView
          component={component}
          onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          key={index}
          idx={index}
          scale={this.state.scale}
        />
      )
    })
    return (
      <div
        className="sp-operating-table"
        onDragOver={this.allowDrop}>
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
