import ReactDOM from 'react-dom'
import { langs } from 'i18n/lang'

exports.componentWillUnmount = function() {
  document.removeEventListener('mousemove', this.onScaleMouseMove)
  document.removeEventListener('touchmove', this.onScaleMouseMove)
  document.removeEventListener('mouseup', this.onScaleMouseUp)
  document.removeEventListener('touchend', this.onScaleMouseUp)
}

exports.onScaleMouseDown = function(ev, idx) {
  // only left mouse button or touchstart
  if (ev.button !== 0 && ev.type !== 'touchstart') return
  document.addEventListener('mousemove', this.onScaleMouseMove)
  document.addEventListener('touchmove', this.onScaleMouseMove)
  document.addEventListener('mouseup', this.onScaleMouseUp)
  document.addEventListener('touchend', this.onScaleMouseUp)
  document.body.style.WebkitUserSelect = 'none'
  document.body.style.MozUserSelect = 'none'
  document.body.style.MsUserSelect = 'none'

  this._scalable = {}
  this._scalable.scales = []
  this._scalable.selectedIdx = idx
  this.props.selectedWidgets.forEach(e => {
    let computedStyle = window.getComputedStyle(
      ReactDOM.findDOMNode(this.refs[e])
    )
    let scalable = {}
    scalable.oWidth = parseInt(computedStyle.width) || 1
    scalable.oHeight = parseInt(computedStyle.height) || 1
    scalable.osx =
      (this.props.component.components[e].scale &&
        this.props.component.components[e].scale.x) ||
      1
    scalable.osy =
      (this.props.component.components[e].scale &&
        this.props.component.components[e].scale.y) ||
      1
    scalable.ox = ev.targetTouches ? ev.targetTouches[0].pageX : ev.pageX
    scalable.oy = ev.targetTouches ? ev.targetTouches[0].pageY : ev.pageY
    this._scalable.scales[e] = scalable
  })
  ev.stopPropagation && ev.stopPropagation()
  ev.preventDefault && ev.preventDefault()
}

exports.onScaleMouseUp = function(ev) {
  ev.stopPropagation && ev.stopPropagation()
  ev.preventDefault && ev.preventDefault()
  document.body.style.WebkitUserSelect = ''
  document.body.style.MozUserSelect = ''
  document.body.style.MsUserSelect = ''
  document.removeEventListener('mousemove', this.onScaleMouseMove)
  document.removeEventListener('touchmove', this.onScaleMouseMove)
  document.removeEventListener('mouseup', this.onScaleMouseUp)
  document.removeEventListener('touchend', this.onScaleMouseUp)
  let deltaScale = this.computeDeltaScale(ev)
  this.props.selectedWidgets.forEach(e => {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        {
          scale: {
            x: this._scalable.scales[e].osx * deltaScale,
            y: this._scalable.scales[e].osy * deltaScale
          }
        },
        langs[this.props.language].scaleComponents
      )
  })
}

exports.onScaleMouseMove = function(ev) {
  let deltaScale = this.computeDeltaScale(ev)
  this.props.selectedWidgets.forEach(e => {
    this.props.onSelectedWidgetUpdated &&
      this.props.onSelectedWidgetUpdated(
        {
          container: this.props.component,
          index: e
        },
        {
          scale: {
            x: this._scalable.scales[e].osx * deltaScale,
            y: this._scalable.scales[e].osy * deltaScale
          }
        }
      )
  })
  ev.stopPropagation && ev.stopPropagation()
  ev.preventDefault && ev.preventDefault()
}

exports.computeDeltaScale = function(ev) {
  let pageX = ev.pageX
  let pageY = ev.pageY
  if (ev.targetTouches) {
    if (ev.targetTouches.length > 0) {
      pageX = ev.targetTouches[0].pageX
      pageY = ev.targetTouches[0].pageY
    } else if (ev.changedTouches && ev.changedTouches.length > 0) {
      pageX = ev.changedTouches[0].pageX
      pageY = ev.changedTouches[0].pageY
    }
  }

  let scale = this.state.scale || 1
  let widgetOriginalScale = this._scalable.scales[this._scalable.selectedIdx]
  let denominator = Math.max(widgetOriginalScale.osx, widgetOriginalScale.osy)
  let deltaScaleX =
    1 +
    2 *
      (pageX - widgetOriginalScale.ox) /
      scale /
      widgetOriginalScale.oWidth /
      denominator
  let deltaScaleY =
    1 +
    2 *
      (pageY - widgetOriginalScale.oy) /
      scale /
      widgetOriginalScale.oHeight /
      denominator
  return Math.max(deltaScaleX, deltaScaleY, 0)
}

exports.scalableMixin = Base =>
  class extends Base {
    componentWillUnmount() {
      super.componentWillUnmount && super.componentWillUnmount()
      exports.componentWillUnmount.apply(this)
    }

    onScaleMouseDown = exports.onScaleMouseDown.bind(this)
    onScaleMouseUp = exports.onScaleMouseUp.bind(this)
    onScaleMouseMove = exports.onScaleMouseMove.bind(this)
    computeDeltaScale = exports.computeDeltaScale
  }
