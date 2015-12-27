'use strict'

let React = require('react')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
import Scalable from 'components/mixins/scalable'
import Selectable from 'components/mixins/selectable'
require('components/editor/operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale, Selectable, Draggable, Scalable],
  componentWillMount: function () {
    this.mouseDownHdlrs = []
    this.mouseUpHdlrs = []
  },
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  onMouseUp: function () {
    this.mouseUpHdlrs.forEach(e=>e.apply(this, arguments))
  },
  onMouseDown: function () {
    this.mouseDownHdlrs.forEach(e=>e.apply(this, arguments))
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
          onScaleMouseDown ={this.onScaleMouseDown}
          ref={index}
        />
      )
    })
    return (
      <div className="sp-operating-table"
           onMouseDown={this.onSelectionMouseDown}
      >
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {this.componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
