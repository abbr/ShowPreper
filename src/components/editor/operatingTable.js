'use strict'

let React = require('react')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
require('components/editor/operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale, Draggable],
  componentWillMount: function () {
    this.mouseDownHdlrs = []
    this.mouseUpHdlrs = []
  },
  componentDidMount: function () {
    this.mouseDownHdlrs.unshift(this.onSelectionMouseDown)
    this.mouseUpHdlrs.unshift(this.onSelectionMouseUp)
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  getInitialState: function () {
    return {selectedWidgets: []}
  },

  onMouseUp: function () {
    this.mouseUpHdlrs.forEach(e=>e.apply(this, arguments))
  },
  onSelectionMouseUp: function (ev, i) {
  },
  onMouseDown: function () {
    this.mouseDownHdlrs.forEach(e=>e.apply(this, arguments))
  },
  onSelectionMouseDown: function (ev, i) {
    ev.stopPropagation && ev.stopPropagation()
    let selectedWidgets = _.cloneDeep(this.state.selectedWidgets)
    if (!ev.shiftKey) {
      if (selectedWidgets.length > 1 && typeof(i) === 'number') {
        return false
      }
      selectedWidgets.splice(0, selectedWidgets.length)
    }
    if (typeof(i) === 'number') {
      selectedWidgets.unshift(i)
    }
    // call this.state.selectedWidgets redundantly to avoid event racing
    this.state.selectedWidgets = selectedWidgets
    this.setState({
      selectedWidgets: selectedWidgets
    })
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  render: function () {
    let slide = this.props.deck.getSelectedSlide()
    this.componentsView = slide.components.map((component, index) => {
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
          onMouseUp={this.onMouseUp}
          ref={index}
        />
      )
    })
    return (
      <div className="sp-operating-table"
           onMouseDown={this.onSelectionMouseDown}
           onMouseUp={this.onSelectionMouseUp}
      >
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {this.componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
