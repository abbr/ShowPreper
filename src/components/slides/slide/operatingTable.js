'use strict'

let React = require('react')
let _ = require('lodash')
import EditableComponent  from 'components/widgets/editableComponent'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
import Scalable from 'components/mixins/scalable'
import Selectable from 'components/mixins/selectable'
import Rotatable from 'components/mixins/rotatable'
require('./operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale, Selectable, Draggable, Scalable, Rotatable],
  getInitialState: function () {
    return {}
  },
  componentWillMount: function () {
    this.mouseDownHdlrs = []
    this.mouseUpHdlrs = []
  },
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },
  _resized: function () {
    let deck = this.props.deck
    let slideWidth = deck.slideWidth
    let slideHeight = deck.slideHeight
    this._scale({width: slideWidth, height: slideHeight})
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
    let slide = this.props.deck.getActiveSlide()
    let selectedWidgets = slide.components.reduce((pv, e, i, a)=> {
      if (e.selected) pv.push(i)
      return pv
    }, [])
    let componentsView = slide.components.map((component, index) => {
      return (
        <EditableComponent
          component={component}
          onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
          key={index}
          idx={index}
          scale={this.state.scale}
          selected={selectedWidgets.indexOf(index) >= 0}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onScaleMouseDown={this.onScaleMouseDown}
          onRotateMouseDown={this.onRotateMouseDown}
          ref={index}
        />
      )
    })
    return (
      <div className="sp-operating-table"
           onMouseDown={this.onSelectionMouseDown}
      >
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
