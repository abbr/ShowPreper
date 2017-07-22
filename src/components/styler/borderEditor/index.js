import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import DropdownList from 'react-widgets/lib/DropdownList'
import './index.less'
export default class extends React.Component {
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    $('#sp-border-colorpicker').spectrum({
      color: this.props.currentStyle.borderColor,
      showAlpha: true,
      showInput: true,
      allowEmpty: true,
      preferredFormat: 'rgb',
      change: tinycolor => {
        this.props.updateStyle({
          borderColor: tinycolor && tinycolor.toRgbString()
        })
      }
    })
  }
  componentWillUnmount(){
    super.componentWillUnmount && super.componentWillUnmount()
    $('#sp-border-colorpicker').spectrum('destroy')
  }
  componentDidUpdate() {
    super.componentDidUpdate && super.componentDidUpdate()
    $('#sp-border-colorpicker').spectrum(
      'set',
      this.props.currentStyle.borderColor
    )
  }
  parseBorder() {
    let border = {
      width: { components: [] },
      style: this.props.currentStyle.borderStyle,
      radius: { components: [] }
    }
    try {
      let widthComponentsRaw =
        this.props.currentStyle.borderWidth.trim() === ''
          ? null
          : this.props.currentStyle.borderWidth.split(' ')
      border.width.components = widthComponentsRaw.map((e, i) => {
        let lengthMatch = e.trim().match(/(\d+)(\D+)/)
        if (lengthMatch) {
          return {
            length: parseInt(lengthMatch[1]),
            uom: lengthMatch[2]
          }
        } else {
          return e
        }
      })
    } catch (ex) {}
    try {
      let radiusComponentsRaw =
        this.props.currentStyle.borderRadius.trim() === ''
          ? null
          : this.props.currentStyle.borderRadius.split(' ')
      border.radius.components = radiusComponentsRaw.map((e, i) => {
        let lengthMatch = e.trim().match(/(\d+)(\D+)/)
        if (lengthMatch) {
          return {
            length: parseInt(lengthMatch[1]),
            uom: lengthMatch[2]
          }
        } else {
          return e
        }
      })
    } catch (ex) {}

    return border
  }
  composeBorder(parsedBorder) {
    let borderStyleObject = { borderStyle: parsedBorder.style }
    try {
      borderStyleObject.borderWidth = parsedBorder.width.components
        .reduce((pv, cv, ci) => {
          return pv + ' ' + (typeof cv == 'string' ? cv : cv.length + cv.uom)
        }, '')
        .trim()
    } catch (ex) {}
    try {
      borderStyleObject.borderRadius = parsedBorder.radius.components
        .reduce((pv, cv) => {
          return pv + ' ' + (typeof cv == 'string' ? cv : cv.length + cv.uom)
        }, '')
        .trim()
    } catch (ex) {}
    return borderStyleObject
  }
  onChangeStyle = newStyle => {
    let border = this.parseBorder()
    border.style = newStyle
    this.props.updateStyle(this.composeBorder(border))
  }
  onChangeWidthComponentCnt = newCnt => {
    let border = this.parseBorder()
    let diff = newCnt - border.width.components.length
    if (diff > 0) {
      let i = 0
      while (i < diff) {
        border.width.components.push({ length: 0, uom: 'px' })
        i++
      }
    } else {
      border.width.components.splice(newCnt, -diff)
    }
    this.props.updateStyle(this.composeBorder(border))
  }
  onChangeWidthComponent = (i, prop, newVal) => {
    let border = this.parseBorder()
    border.width.components[i][prop] =
      newVal instanceof Object ? newVal.target.value : newVal
    this.props.updateStyle(this.composeBorder(border))
  }
  onChangeRadiusComponentCnt = newCnt => {
    let border = this.parseBorder()
    let diff = newCnt - border.radius.components.length
    if (diff > 0) {
      let i = 0
      while (i < diff) {
        border.radius.components.push({ length: 0, uom: 'px' })
        i++
      }
    } else {
      border.radius.components.splice(newCnt, -diff)
    }
    this.props.updateStyle(this.composeBorder(border))
  }
  onChangeRadiusComponent = (i, prop, newVal) => {
    let border = this.parseBorder()
    border.radius.components[i][prop] =
      newVal instanceof Object ? newVal.target.value : newVal
    this.props.updateStyle(this.composeBorder(border))
  }
  render() {
    let border = this.parseBorder()
    let borderWidthComponents =
      border.width.components &&
      border.width.components.map((e, i) => {
        return (
          <div className="col-xs-3" key={i} style={{ display: 'inline' }}>
            <input
              value={e.length}
              size={1}
              onChange={this.onChangeWidthComponent.bind(null, i, 'length')}
            />
            <DropdownList
              data={['px', 'em']}
              value={e.uom}
              onChange={this.onChangeWidthComponent.bind(null, i, 'uom')}
            />
          </div>
        )
      })
    let borderRadiusComponents =
      border.radius.components &&
      border.radius.components.map((e, i) => {
        return (
          <div className="col-xs-3" key={i} style={{ display: 'inline' }}>
            <input
              value={e.length}
              size={1}
              onChange={this.onChangeRadiusComponent.bind(null, i, 'length')}
            />
            <DropdownList
              data={['px', 'em', '%']}
              value={e.uom}
              onChange={this.onChangeRadiusComponent.bind(null, i, 'uom')}
            />
          </div>
        )
      })
    return (
      <div className="container-fluid sp-border-editor">
        <div className="row">
          <div className="col-xs-1">Width</div>
          <div className="col-xs-11">
            <DropdownList
              data={[0, 1, 2, 3, 4]}
              value={border.width.components && border.width.components.length}
              onChange={this.onChangeWidthComponentCnt}
            />{' '}
            components
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1" />
          <div className="col-xs-11 row">
            {borderWidthComponents}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1">Style</div>
          <div className="col-xs-11">
            <DropdownList
              data={[
                'none',
                'hidden',
                'dotted',
                'dashed',
                'solid',
                'double',
                'groove',
                'ridge',
                'inset',
                'outset'
              ]}
              value={border.style}
              onChange={this.onChangeStyle}
              className="sp-style-dropdown"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1">Color</div>
          <div className="col-xs-11">
            <input id="sp-border-colorpicker" />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-1">Radius</div>
          <div className="col-xs-11">
            <DropdownList
              data={[0, 1, 2, 3, 4]}
              value={
                border.radius.components && border.radius.components.length
              }
              onChange={this.onChangeRadiusComponentCnt}
            />{' '}
            components
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1" />
          <div className="col-xs-11 row">
            {borderRadiusComponents}
          </div>
        </div>
      </div>
    )
  }
}
