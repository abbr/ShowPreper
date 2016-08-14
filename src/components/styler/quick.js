'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
import lang from 'i18n/lang'
let QuickStyler = React.createClass({
  onMouseEvent: function (evt, idx) {
    let p = new Palettes()
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
            this.props.setTargetStyle('selectedSlideStyle', p[idx])
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
            this.props.setTargetStyle('selectedSlideStyle', null)
        }
        break
      case 'entirePresentation':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              p[idx] = {}
            }
            this.props.setTargetStyle('deckStyle', p[idx])
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
            this.props.setTargetStyle('deckStyle', null)
        }
    }
  },
  render: function () {
    let p = new Palettes()
    p[8] = p[9] = {}
    let pDivs = _.map(p, (e, i)=> {
      let s = _.clone(e)
      let extraCN = '', title = ''
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
          title = lang.edit
          break
      }
      return <div
        className={"sp-palette" + extraCN}
        style={s}
        title={title}
        onMouseOver={(evt)=> {
          this.onMouseEvent(evt, i)
        } }
        onMouseLeave={
          (evt)=> {
            this.onMouseEvent(evt, i)
          }
        }
        onClick={
          (evt) => {
            this.onMouseEvent(evt, i)
          }
        }
        key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
    </div>
  }
})
module.exports = QuickStyler
