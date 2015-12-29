'use strict'
import ReactDOM from 'react-dom'

let getFitSquareScaleFactor = function (desiredWidth, desiredHeight, width, height) {
  var xScale = width / desiredWidth
  var yScale = height / desiredHeight

  var newHeight = desiredHeight * xScale
  if (newHeight > height) {
    var scale = yScale
  } else {
    var scale = xScale
  }

  return scale
}

exports._scale = function (size) {
  let slideWidth = size.width
  let slideHeight = size.height
  let rootElSize = window.getComputedStyle(ReactDOM.findDOMNode(this))

  if (!rootElSize)
    return {}

  let width = parseInt(rootElSize.width) - parseInt(rootElSize.paddingLeft) - parseInt(rootElSize.paddingRight)
  let height = parseInt(rootElSize.height) - parseInt(rootElSize.paddingTop) - parseInt(rootElSize.paddingBottom)

  let scale = getFitSquareScaleFactor(
    slideWidth,
    slideHeight,
    width,
    height
  )
  let leftOffset = (width - slideWidth * scale) / 2
  let topOffset = (height - slideHeight * scale) / 2
  this.setState({
    scaleStyle: {
      transform: 'scale(' + scale + ')',
      marginLeft: leftOffset + 'px',
      width: slideWidth,
      height: slideHeight,
      transformOrigin: '0 0'
    },
    scale: scale
  })
}
