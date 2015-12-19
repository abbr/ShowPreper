'use strict'

let React = require('react')
let Geometry = require('math/geometry')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'

require('components/editor/operatingTable.less')
import ReactDOM from 'react-dom'

let OperatingTable = React.createClass({
  _computeOtsSquare: function () {
    let deck = this.props.deck
    let slideWidth = deck.slideWidth
    let slideHeight = deck.slideHeight

    let rootElSize = window.getComputedStyle(ReactDOM.findDOMNode(this))

    if (!rootElSize)
      return {}

    let width = parseInt(rootElSize.width)
    let height = parseInt(rootElSize.height)

    let scale = Geometry.getFitSquareScaleFactor(
      slideWidth,
      slideHeight,
      width,
      height - 20
    )

    let leftOffset = (width - slideWidth * scale) / 2
    let topOffset = (height - slideHeight * scale) / 2

    return [
      scale,
      {
        transform: 'scale(' + scale + ')',
        marginLeft: leftOffset + 'px',
        width: slideWidth,
        height: slideHeight
      }
    ]
  },

  _resized: function () {
    let style = this._computeOtsSquare()
    this.setState({
      otsStyle: style[1],
      scale: style[0]
    })
  },

  onClick() {
    let slide = this.props.deck.getSelectedSlide()
    if (slide) {
      slide.unselectComponents()
      slide.stopEditingComponents()
    }
  },

  getInitialState: function () {
    return {}
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
      let ComponentView = ComponentViewFactory(component)
      return (
        <ComponentView {...component}
          key = {index}
        />
      )
    })
    return (
      <div
        className="sp-operating-table"
        onClick={this.onClick}>
        <div className="sp-ot-slide" style={this.state.otsStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable
