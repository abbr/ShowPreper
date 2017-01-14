import React from 'react'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'
import Draggable from '../../mixins/draggable'
export default React.createClass({
  getInitialState: function () {
    return {draggable: 'x', target: 'thisSlide'}
  },
  mixins: [Draggable(function () {
      return [this]
    }, function (e) {
      let bb = ReactDOM.findDOMNode(e).getBoundingClientRect()
      return {
        x: (bb && bb.left) || 0,
        y: (bb && bb.top) || 0,
        z: 0
      }
    },
    function (e, updatedProps) {
      this.resizeSlide(e, updatedProps)
    },
    function (e, updatedProps) {
      this.resizeSlide(e, updatedProps, lang.changeAspectRatio)
    })],
  resizeSlide: function (e, updatedProps, markUndoDesc) {
    // set a minimum  drag threshold to handle click and dbl-click correctly
    if (Math.abs(updatedProps.x - e._draggable.drags[0].oleft) < 5) {
      e._draggable.dragged = false
      return
    }
    let bb = ReactDOM.findDOMNode(e).getBoundingClientRect()
    let slideWidth = this.props.component.width || this.props.deck.slideWidth
    let slideHeight = this.props.component.height || this.props.deck.slideHeight
    let newWidth = Math.round(Math.abs(slideWidth + (updatedProps.x - bb.left) * 2 / this.props.scale))
    let container = this.props.component
    let updatedContainerProps = {width: newWidth, height: slideHeight}
    if (this.state.target === 'defaultSlide') {
      container = this.props.deck
      updatedContainerProps = {slideWidth: newWidth, slideHeight: slideHeight}
    }
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: container,
      index: -1
    }, updatedContainerProps, markUndoDesc, () => {
      this.props.resized && this.props.resized()
    })
  },
  onMouseDown: function () {
    this.mouseDownHdlrs.forEach(e=>e.apply(this, arguments))
  },
  componentWillMount: function () {
    this.mouseDownHdlrs = []
  },
  onClick: function () {
    if (this._draggable && this._draggable.dragged) {
      return
    }
    // if this slide has custom width, it cannot be used to set default slide aspect ratio
    if (this.state.target === 'thisSlide' && this.props.component.width) return
    this.setState({target: this.state.target === 'thisSlide' ? 'defaultSlide' : 'thisSlide'})
  },
  onDblClick: function (ev) {
    ev.stopPropagation && ev.stopPropagation()
    ev.preventDefault && ev.preventDefault()
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: -1
    }, 'width')
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
      container: this.props.component,
      index: -1
    }, 'height')
  },
  render: function () {
    let title
    if (this.state.target === 'thisSlide') {
      title = lang.dragToChangeThisSlideAspectRatio + ';\n'
      if (this.props.component.width) {
        title += lang.doubleClickToResetToDefault
      }
      else {
        title += lang.clickToChangeDefaultSlide
      }
    }
    else {
      title = lang.dragToChangeDefaultSlideAspectRatio + ';\n'
      title += lang.clickToChangeThisSlide
    }
    return <div
      onTouchStart={this.onMouseDown}
      onMouseDown={this.onMouseDown}
      onClick={this.onClick}
      onDoubleClick={this.onDblClick}
      className="sp-ot-dragger"
      title={title}
    >
      <svg width="64" height="64"
           xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <g id="svg-defaultSlide">
            <line x1="29" y1="0" x2="29" y2="64" stroke="#000000"/>
            <line x1="32" y1="0" x2="32" y2="64" stroke="#000000"/>
            <line x1="35" y1="0" x2="35" y2="64" stroke="#000000"/>
          </g>
          <line id="svg-thisSlide" stroke="#000000" y2="64" x2="32" y1="0" x1="32" strokeWidth="5" fill="none"/>
        </defs>
        <g>
          <use xlinkHref={'#svg-' + this.state.target}></use>
          <g>
            <path transform="rotate(45 23.456237792968754,32) "
                  d="m21.072446,34.383791l0,-4.767581l4.767581,4.767581l-4.767581,0z" strokeWidth="5"
                  stroke="#000000"/>
            <path stroke="#000000" transform="rotate(-135 40.54376220703125,32) "
                  d="m38.159972,34.38379l0,-4.76758l4.76758,4.76758l-4.76758,0z" strokeWidth="5"/>
          </g>
        </g>
      </svg>
    </div>
  }
})
