import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
export default React.createClass({
  parseBorder: function () {
    let border = {width: {components: []}}
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
  composeBorder: function (parsedBorder) {
    let borderStyleObject = {}
    try {
      borderStyleObject.borderWidth = parsedBorder.width.components.reduce((pv, cv, ci)=> {
        return pv + ' ' + ((typeof cv == 'string') ? cv : (cv.length + cv.uom))
      }, '').trim()
    }
    catch (ex) {
    }
    return borderStyleObject
  },
  onChangeWidthComponentCnt: function (newCnt) {
    let border = this.parseBorder()
    let diff = newCnt - border.width.components.length
    if (diff > 0) {
      let i = 0
      while (i < diff) {
        border.width.components.push({length: 0, uom: 'px'})
        i++
      }
    }
    else {
      border.width.components.splice(newCnt, -diff)
    }
    this.props.updateStyle(this.composeBorder(border))
  },
  onChangeWidthComponent: function (i, prop, newVal) {
    let border = this.parseBorder()
    border.width.components[i][prop] = (newVal instanceof Object) ? newVal.target.value : newVal
    this.props.updateStyle(this.composeBorder(border))
  },
  render: function () {
    let border = this.parseBorder()
    let borderWidthComponents = border.width.components && border.width.components.map((e, i)=> {
        return <div className="col-xs-3" key={i}
                    style={{display: 'inline'}}>
          <input value={e.length}
                 size={1}
                 onChange={this.onChangeWidthComponent.bind(null, i, 'length')
                 }/>
          <DropdownList data={['px', 'em']}
                        value={e.uom}
                        onChange={this.onChangeWidthComponent.bind(null, i, 'uom')}
          />
        </div>
      })
    return <div className="container-fluid">
      <div className="row">
        <div className="col-xs-1">Width:</div>
        <div className="col-xs-11">
          <DropdownList data={[1, 2, 3, 4]}
                        value={border.width.components && border.width.components.length}
                        onChange={this.onChangeWidthComponentCnt}
          /> components
        </div>
      </div>
      <div className="row">
        <div className="col-xs-1"></div>
        <div className="col-xs-11 row">
          {borderWidthComponents}
        </div>

      </div>
    </div>
  }
})
