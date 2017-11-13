import React from 'react'
import ReactDOM from 'react-dom'
import { langs } from 'i18n/lang'
import Draggable from '../../mixins/draggable'
import ClassNames from 'classnames'
export default class extends Draggable.draggableMixin(
  React.Component,
  function() {
    return [this]
  },
  function(e) {
    let bb = ReactDOM.findDOMNode(e).getBoundingClientRect()
    return {
      x: (bb && bb.left) || 0,
      y: (bb && bb.top) || 0,
      z: 0
    }
  },
  function(e, updatedProps) {
    this.resizeSlide(e, updatedProps)
  },
  function(e, updatedProps) {
    this.resizeSlide(e, updatedProps, langs[this.props.language].changeAspectRatio)
  }
) {
  constructor(props) {
    super(props)
    this.state = { draggable: this.props.axis }
  }

  resizeSlide(e, updatedProps, markUndoDesc) {
    // set a minimum  drag threshold to handle click and dbl-click correctly
    if (
      Math.abs(
        updatedProps[this.props.axis] -
          e._draggable.drags[0][this.props.axis === 'x' ? 'oleft' : 'oright']
      ) < 5
    ) {
      e._draggable.dragged = false
      return
    }
    let bb = ReactDOM.findDOMNode(e).getBoundingClientRect()
    let slideWidth = this.props.component.width || this.props.deck.slideWidth
    let slideHeight = this.props.component.height || this.props.deck.slideHeight
    let newWidth = slideWidth
    let newHeight = slideHeight
    switch (this.props.axis) {
      case 'x':
        newWidth = Math.round(
          Math.abs(
            slideWidth + (updatedProps.x - bb.left) * 2 / this.props.scale
          )
        )
        break
      case 'y':
        newHeight = Math.round(
          Math.abs(
            slideHeight + (updatedProps.y - bb.top) * 2 / this.props.scale
          )
        )
        newWidth = slideWidth * slideHeight / newHeight
        break
      default:
    }
    let container = this.props.component
    let updatedContainerProps = { width: newWidth, height: slideHeight }
    if (this.props.slideDragTarget === 'defaultSlide') {
      container = this.props.deck
      updatedContainerProps = { slideWidth: newWidth, slideHeight: slideHeight }
    }
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: container,
          index: -1
        },
        updatedContainerProps,
        markUndoDesc,
        () => {
          this.props.resized && this.props.resized()
        }
      )
  }
  onMouseDown = (...args) => {
    this.mouseDownHdlrs.forEach(e => e.apply(this, args))
  }
  componentWillMount() {
    super.componentWillMount && super.componentWillMount()
    this.mouseDownHdlrs = []
  }
  onClick = () => {
    if (this._draggable && this._draggable.dragged) {
      return
    }
    // if this slide has custom width, it cannot be used to set default slide aspect ratio
    if (
      this.props.slideDragTarget === 'thisSlide' &&
      this.props.component.width
    )
      return
    this.props.toggleSlideDragTarget()
  }
  onDblClick = ev => {
    ev.stopPropagation && ev.stopPropagation()
    ev.preventDefault && ev.preventDefault()
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: -1
        },
        'width'
      )
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: -1
        },
        'height'
      )
  }
  render() {
    let title
    if (this.props.slideDragTarget === 'thisSlide') {
      title = langs[this.props.language].dragToChangeThisSlideAspectRatio + ';\n'
      if (this.props.component.width) {
        title += langs[this.props.language].doubleClickToResetToDefault
      } else {
        title += langs[this.props.language].clickToChangeDefaultSlide
      }
    } else {
      title = langs[this.props.language].dragToChangeDefaultSlideAspectRatio + ';\n'
      title += langs[this.props.language].clickToChangeThisSlide
    }
    return (
      <div
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        onClick={this.onClick}
        onDoubleClick={this.onDblClick}
        className={ClassNames(
          'sp-ot-dragger',
          'sp-ot-dragger' + '-' + this.props.axis
        )}
        title={title}
        style={{
          transform:
            'scale(' +
            1 / this.props.scale +
            ')' +
            (this.props.axis === 'y' ? ' rotate(90deg)' : '')
        }}
      >
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g id="svg-defaultSlide">
              <line x1="29" y1="0" x2="29" y2="64" stroke="#000000" />
              <line x1="32" y1="0" x2="32" y2="64" stroke="#000000" />
              <line x1="35" y1="0" x2="35" y2="64" stroke="#000000" />
            </g>
            <line
              id="svg-thisSlide"
              stroke="#000000"
              y2="64"
              x2="32"
              y1="0"
              x1="32"
              strokeWidth="5"
              fill="none"
            />
          </defs>
          <g>
            <use xlinkHref={'#svg-' + this.props.slideDragTarget} />
            <g>
              <path
                transform="rotate(45 23.456237792968754,32) "
                d="m21.072446,34.383791l0,-4.767581l4.767581,4.767581l-4.767581,0z"
                strokeWidth="5"
                stroke="#000000"
              />
              <path
                stroke="#000000"
                transform="rotate(-135 40.54376220703125,32) "
                d="m38.159972,34.38379l0,-4.76758l4.76758,4.76758l-4.76758,0z"
                strokeWidth="5"
              />
            </g>
          </g>
        </svg>
      </div>
    )
  }
}
