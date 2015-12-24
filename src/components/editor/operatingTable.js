'use strict'

let React = require('react')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'
import AutoScale from 'components/mixins/autoScale'
require('components/editor/operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale],
  getInitialState: function () {
    return {selectedWidgets: []}
  },
  onMouseDown: function (ev, i) {
    let selectedWidgets = _.cloneDeep(this.state.selectedWidgets)
    if (!ev.shiftKey) {
      selectedWidgets.splice(0, selectedWidgets.length)
    }
    if (typeof(i) === 'number') {
      selectedWidgets.unshift(i)
    }
    this.setState({
      selectedWidgets: selectedWidgets
    })
    ev.stopPropagation()
  },
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
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
          selected={this.state.selectedWidgets.indexOf(index) >= 0}
          onMouseDown={this.onMouseDown}
        />
      )
    })
    return (
      <div className="sp-operating-table"
           onMouseDown={this.onMouseDown}
      >
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
