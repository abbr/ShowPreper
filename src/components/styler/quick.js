'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
import lang from 'i18n/lang'
import Styler from './'

let QuickStyler = React.createClass({
  getInitialState: function () {
    return {palettes: new Palettes()}
  },
  getStyle: function () {
    let s
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        s = this.props.defaultSlideStyle || this.props.deck.defaultSlideStyle
        break
      case 'thisSlide':
        s = this.props.thisSlideStyle || this.props.deck.getActiveSlide().style
        break
      case 'selectedSlides':
        let commonStyle
        this.props.deck.components.forEach((e) => {
          if (!e.selected) {
            return
          }
          let thisSlideStyle = e.style || this.props.deck.defaultSlideStyle
          if (commonStyle === undefined) {
            commonStyle = thisSlideStyle
          }
          else if (commonStyle !== thisSlideStyle) {
            commonStyle = null
          }
        })
        s = this.props.selectedSlidesStyle || commonStyle
        break
      case 'entirePresentation':
        s = this.props.entirePresentationStyle || this.props.deck.style
        break
    }
    return s
  },
  updatePalette: function (i) {
    let s = this.getStyle()
    let p = new Palettes()
    p[i] = s
    p.save()
    this.setState({palettes: p})
  },
  onMouseEvent: function (evt, idx) {
    let p = this.state.palettes
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              p[idx] = {}
            }
            this.props.setTargetStyle('defaultSlideStyle', p[idx])
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck,
                index: -1
              }, 'defaultSlideStyle', lang.setAppearance + ' ' + lang.defaultSlide)
            }
            else {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck,
                index: -1
              }, {defaultSlideStyle: p[idx]}, lang.setAppearance + ' ' + lang.defaultSlide)
            }
          default:
            this.props.setTargetStyle('defaultSlideStyle', null)
        }
        break
      case 'thisSlide':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              p[idx] = this.props.deck.defaultSlideStyle
            }
            this.props.setTargetStyle('thisSlideStyle', p[idx])
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck.getActiveSlide(),
                index: -1
              }, 'style', lang.setAppearance + ' ' + lang.thisSlide)
            }
            else {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck.getActiveSlide(),
                index: -1
              }, {style: p[idx]}, lang.setAppearance + ' ' + lang.thisSlide)
            }
          default:
            this.props.setTargetStyle('thisSlideStyle', null)
        }
        break
      case 'selectedSlides':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              p[idx] = this.props.deck.defaultSlideStyle
            }
            this.props.setTargetStyle('selectedSlidesStyle', p[idx])
            break
          case 'click':
            this.props.deck.components.forEach((e)=> {
              if (e.selected) {
                if (idx === '8') {
                  this.props.onSelectedWidgetUpdated({
                    container: e,
                    index: -1
                  }, 'style')
                }
                else {
                  this.props.onSelectedWidgetUpdated({
                    container: e,
                    index: -1
                  }, {style: p[idx]})
                }
              }
            })
            this.props.deck.markUndo(lang.setAppearance + ' ' + lang.selectedSlides)
          default:
            this.props.setTargetStyle('selectedSlidesStyle', null)
        }
        break
      case 'entirePresentation':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              p[idx] = {}
            }
            this.props.setTargetStyle('entirePresentationStyle', p[idx])
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck,
                index: -1
              }, 'style', lang.setAppearance + ' ' + lang.entirePresentation)
            }
            else {
              this.props.onSelectedWidgetUpdated({
                container: this.props.deck,
                index: -1
              }, {style: p[idx]}, lang.setAppearance + ' ' + lang.entirePresentation)
            }
          default:
            this.props.setTargetStyle('entirePresentationStyle', null)
        }
    }
  },
  render: function () {
    let p = _.cloneDeep(this.state.palettes)
    p[8] = p[9] = {}
    let pDivs = _.map(p, (e, i)=> {
      let s = _.clone(e)
      let extraCN = '', title = ''
      let mouseEvtHdlr = (evt)=> {
        this.onMouseEvent(evt, i)
      }
      let mouseClickHdlr = mouseEvtHdlr

      switch (i) {
        case "7":
          s.background = 'url(' + require('./transparent.svg') + ')'
          title = lang.setToTransparent
          break
        case "8":
          extraCN = ' special-style glyphicon glyphicon-remove'
          title = lang.removeStyle
          break
        case "9":
          extraCN = ' special-style glyphicon glyphicon-edit'
          title = lang.customizeStyle
          mouseEvtHdlr = null
          mouseClickHdlr = (evt) => {
            $('#sp-styler-modal').modal('show')
          }
          break
      }
      return <div
        className={"sp-palette" + extraCN}
        style={s}
        title={title}
        onMouseOver={mouseEvtHdlr}
        onMouseLeave={mouseEvtHdlr}
        onClick={mouseClickHdlr}
        key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
      <Styler selectedStyleTarget={this.props.selectedStyleTarget}
              entirePresentationStyle={this.props.entirePresentationStyle}
              deck={this.props.deck}
              defaultSlideStyle={this.props.defaultSlideStyle}
              selectedSlidesStyle={this.props.selectedSlidesStyle}
              thisSlideStyle={this.props.thisSlideStyle}
              setTargetStyle={this.props.setTargetStyle}
              onSelectedWidgetUpdated={this.props.onSelectedWidgetUpdated}
              updatePalette={this.updatePalette}
              getStyle={this.getStyle}
              palettes={this.state.palettes}
      ></Styler>
    </div>
  }
})
module.exports = QuickStyler
