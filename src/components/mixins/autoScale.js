'use strict'
import ReactDOM from 'react-dom'

// fit (width, height) into (frameWidth, frameHeight)
exports.getFitSquareScaleFactor = function(
  width,
  height,
  frameWidth,
  frameHeight
) {
  return width / height < frameWidth / frameHeight
    ? frameHeight / height
    : frameWidth / width
}

exports._scale = function(size, recomputeDomSize) {
  let rootElSize, domWidth, domHeight
  domWidth = this.state.domSize && this.state.domSize.domWidth
  domHeight = this.state.domSize && this.state.domSize.domHeight
  if (!this.state.domSize || recomputeDomSize) {
    try {
      rootElSize = window.getComputedStyle(ReactDOM.findDOMNode(this))
      domWidth =
        parseInt(rootElSize.width) -
        parseInt(rootElSize.paddingLeft) -
        parseInt(rootElSize.paddingRight)
      domHeight =
        parseInt(rootElSize.height) -
        parseInt(rootElSize.paddingTop) -
        parseInt(rootElSize.paddingBottom)
      this.setState({
        domSize: {
          domWidth: domWidth,
          domHeight: domHeight
        }
      })
    } catch (ex) {
      return
    }
  }

  let componentWidth,
    componentHeight,
    componentTop,
    componentRight,
    componentBottom,
    componentLeft
  if (size.width || size.height) {
    componentWidth = size.width
    componentHeight = size.height
    componentTop = 0
    componentRight = size.width
    componentBottom = size.height
    componentLeft = 0
  } else {
    componentWidth = size.right - size.left
    componentHeight = size.bottom - size.top
    componentTop = size.top
    componentRight = size.right
    componentBottom = size.bottom
    componentLeft = size.left
  }

  let scale = exports.getFitSquareScaleFactor(
    componentWidth,
    componentHeight,
    domWidth,
    domHeight
  )
  let leftOffset = (domWidth - componentWidth * scale) / 2
  let topOffset = (domHeight - componentHeight * scale) / 2
  let scaleStr = ' scale(' + scale + ')'
  let componentCx = (componentLeft + componentRight) / 2
  let componentCy = (componentTop + componentBottom) / 2
  let domCx = componentWidth * scale / 2
  let domCy = componentHeight * scale / 2
  let translateX = domCx - componentCx
  let translateY = domCy - componentCy
  let translateStr = ' translate(' + translateX + 'px,' + translateY + 'px)'
  let scaleStyle = {
    transform: translateStr + scaleStr,
    marginLeft: leftOffset + 'px',
    marginTop: topOffset + 'px',
    width: componentCx * 2,
    height: componentCy * 2
  }
  this.setState({
    scaleStyle: scaleStyle,
    scale: scale
  })
  if (leftOffset > 1 || topOffset > 1) {
    let suggestedBB = {}
    let suggestedWidth = domWidth / scale
    let suggestedHeight = domHeight / scale
    suggestedBB.left = componentCx - suggestedWidth / 2
    suggestedBB.right = componentCx + suggestedWidth / 2
    suggestedBB.top = componentCy - suggestedHeight / 2
    suggestedBB.bottom = componentCy + suggestedHeight / 2
    return suggestedBB
  }
}

export default exports
export const autoScaleMixin = Base =>
  class extends Base {
    getFitSquareScaleFactor = exports.getFitSquareScaleFactor
    _scale = exports._scale
  }
