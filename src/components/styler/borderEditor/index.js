import React from 'react'
export default React.createClass({
  parseBorder: function () {
    let border = {width: {}}
    try {
      let widthComponentsRaw = this.props.currentStyle.borderWidth.split(' ')
      border.width.components = widthComponentsRaw.map((e, i)=> {
        let lengthMatch = e.match(/(\d+)(\w+)/)
        if (lengthMatch) {
          return {
            length: parseInt(lengthMatch[1]),
            uom: lengthMatch[2]
          }
        }
        else {
          return e
        }
      })
    }
    catch (ex) {
    }
    return border
  },
  render: function () {
    let border = this.parseBorder()
    return <div>{border.width.components && border.width.components.length}</div>
  }
})
