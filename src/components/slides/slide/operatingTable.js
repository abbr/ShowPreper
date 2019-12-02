'use strict'

let React = require('react')
let _ = require('lodash')
import EditableComponent from 'components/widgets/editableComponent'
import AutoScale from 'components/mixins/autoScale'
import Draggable from 'components/mixins/draggable'
import Scalable from 'components/mixins/scalable'
import Selectable from 'components/mixins/selectable'
import Rotatable from 'components/mixins/rotatable'
import Killable from 'components/mixins/killable'
import { langs } from 'i18n/lang'
import GridImage from './img/grid.svg'
import Dragger from './dragger'

let key = require('mousetrap')

require('./operatingTable.less')

let OperatingTable = class extends Draggable.draggableMixin(
  Rotatable.rotatableMixin(
    Scalable.scalableMixin(
      Killable.killableMixin(
        Selectable.selectableMixin(AutoScale.autoScaleMixin(React.Component))
      )
    )
  ),
  function() {
    return this.props.selectedWidgets
  },
  function(e) {
    return {
      x: this.props.component.components[e].x || 0,
      y: this.props.component.components[e].y || 0,
      z: this.props.component.components[e].z || 0
    }
  },
  function(e, updatedProps) {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        updatedProps
      )
  },
  function(e, updatedProps) {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        updatedProps,
        langs[this.props.language].moveComponents
      )
  }
) {
  constructor(props) {
    super(props)
    this.state = {
      draggable: true,
      ctrlKeyPressed: false,
      slideDragTarget: 'thisSlide'
    }
  }
  toggleSlideDragTarget = () => {
    this.setState({
      slideDragTarget:
        this.state.slideDragTarget === 'thisSlide'
          ? 'defaultSlide'
          : 'thisSlide'
    })
  }
  UNSAFE_componentWillMount() {
    super.UNSAFE_componentWillMount && super.UNSAFE_componentWillMount()
    this.mouseDownHdlrs = []
  }
  UNSAFE_componentWillReceiveProps() {
    super.UNSAFE_componentWillReceiveProps && super.UNSAFE_componentWillReceiveProps()
    this._resized()
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    this._resized()
    window.addEventListener('resize', this._windowResized)
    key.bind('g', this.onToggleGrid)
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this._windowResized)
    key.unbind('g')
  }
  onToggleGrid = () => {
    this.setState({ showGrid: !this.state.showGrid })
  }
  _windowResized = () => {
    this._resized(true)
  }
  _resized = recomputeDomSize => {
    let deck = this.props.deck
    let slideWidth = this.props.component.width || deck.slideWidth
    let slideHeight = this.props.component.height || deck.slideHeight
    this._scale({ width: slideWidth, height: slideHeight }, recomputeDomSize)
  }
  onMouseDown = (...args) => {
    this.mouseDownHdlrs.forEach(e => e.apply(this, args))
  }
  setDraggable = draggable => {
    this.setState({ draggable: draggable })
  }
  render() {
    try {
      let slide = this.props.deck.getActiveSlide()
      let selectedWidgets = slide.components.reduce((pv, e, i) => {
        if (e.selected) pv.push(i)
        return pv
      }, [])
      let componentsView = slide.components.map((component, index) => {
        return (
          <EditableComponent
            component={component}
            language={this.props.language}
            container={slide}
            onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
            key={index}
            idx={index}
            ref={index}
            scale={this.state.scale}
            selected={selectedWidgets.indexOf(index) >= 0}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onScaleMouseDown={this.onScaleMouseDown}
            onRotateMouseDown={this.onRotateMouseDown}
            onKillMouseDown={this.onKillMouseDown}
            setDraggable={this.setDraggable}
          />
        )
      })
      let otSlideStyle = _.merge(
        {},
        this.state.scaleStyle,
        this.props.thisSlideStyle ||
          this.props.component.style ||
          this.props.defaultSlideStyle ||
          this.props.deck.defaultSlideStyle
      )
      if (this.props.deck.perspective) {
        otSlideStyle.perspective =
          this.props.deck.perspective / this.state.scale + 'px'
      }
      if (this.state.showGrid) {
        otSlideStyle.background = 'url(' + GridImage + ')'
      }
      return (
        <div
          className="sp-operating-table"
          onMouseDown={this.onSelectionMouseDown}
        >
          <div className="sp-ot-slide" style={otSlideStyle}>
            <Dragger
              onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
              deck={this.props.deck}
              language={this.props.language}
              component={this.props.component}
              scale={this.state.scale}
              resized={this._resized}
              axis="x"
              toggleSlideDragTarget={this.toggleSlideDragTarget}
              slideDragTarget={this.state.slideDragTarget}
            />
            <Dragger
              onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
              deck={this.props.deck}
              language={this.props.language}
              component={this.props.component}
              scale={this.state.scale}
              resized={this._resized}
              axis="y"
              toggleSlideDragTarget={this.toggleSlideDragTarget}
              slideDragTarget={this.state.slideDragTarget}
            />
            {componentsView}
          </div>
        </div>
      )
    } catch (ex) {
      return <div />
    }
  }
}

module.exports = OperatingTable
