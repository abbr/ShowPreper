import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
import { langs } from 'i18n/lang'
import Styler from './'

let QuickStyler = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { palettes: new Palettes() }
  }

  getStyle = () => {
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
        this.props.deck.components.forEach(e => {
          if (!e.selected) {
            return
          }
          let thisSlideStyle = e.style || this.props.deck.defaultSlideStyle
          if (commonStyle === undefined) {
            commonStyle = thisSlideStyle
          } else if (commonStyle !== thisSlideStyle) {
            commonStyle = null
          }
        })
        s = this.props.selectedSlidesStyle || commonStyle
        break
      case 'presentation':
        s = this.props.presentationStyle || this.props.deck.style
        break
    }
    return s
  }
  updatePalette = i => {
    let s = this.getStyle()
    let p = new Palettes()
    p[i] = s
    p.save()
    this.setState({ palettes: p })
  }
  updateStyle = (evt, idx) => {
    let p = this.state.palettes
    let targetStyle = this.getStyle()
    if (idx) {
      targetStyle = p[idx]
    }
    switch (this.props.selectedStyleTarget) {
      case 'defaultSlide':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              targetStyle = {}
            }
            this.props.setTargetStyle('defaultSlideStyle', targetStyle)
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck,
                  index: -1
                },
                'defaultSlideStyle',
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].defaultSlide
              )
            } else {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck,
                  index: -1
                },
                { defaultSlideStyle: targetStyle },
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].defaultSlide
              )
            }
          default:
            this.props.setTargetStyle('defaultSlideStyle', null)
        }
        break
      case 'thisSlide':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              targetStyle = this.props.deck.defaultSlideStyle
            }
            this.props.setTargetStyle('thisSlideStyle', targetStyle)
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck.getActiveSlide(),
                  index: -1
                },
                'style',
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].thisSlide
              )
            } else {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck.getActiveSlide(),
                  index: -1
                },
                { style: targetStyle },
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].thisSlide
              )
            }
          default:
            this.props.setTargetStyle('thisSlideStyle', null)
        }
        break
      case 'selectedSlides':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              targetStyle = this.props.deck.defaultSlideStyle
            }
            this.props.setTargetStyle('selectedSlidesStyle', targetStyle)
            break
          case 'click':
            this.props.deck.components.forEach(e => {
              if (e.selected) {
                if (idx === '8') {
                  this.props.onSelectedWidgetUpdated(
                    {
                      container: e,
                      index: -1
                    },
                    'style'
                  )
                } else {
                  this.props.onSelectedWidgetUpdated(
                    {
                      container: e,
                      index: -1
                    },
                    { style: targetStyle }
                  )
                }
              }
            })
            this.props.deck.markUndo(
              langs[this.props.language].setAppearance +
                ' ' +
                langs[this.props.language].selectedSlides
            )
          default:
            this.props.setTargetStyle('selectedSlidesStyle', null)
        }
        break
      case 'presentation':
        switch (evt.type) {
          case 'mouseover':
            if (idx === '8') {
              targetStyle = {}
            }
            this.props.setTargetStyle('presentationStyle', targetStyle)
            break
          case 'click':
            if (idx === '8') {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck,
                  index: -1
                },
                'style',
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].presentation
              )
            } else {
              this.props.onSelectedWidgetUpdated(
                {
                  container: this.props.deck,
                  index: -1
                },
                { style: targetStyle },
                langs[this.props.language].setAppearance +
                  ' ' +
                  langs[this.props.language].presentation
              )
            }
          default:
            this.props.setTargetStyle('presentationStyle', null)
        }
    }
  }
  render() {
    let p = _.cloneDeep(this.state.palettes)
    p[8] = p[9] = {}
    let pDivs = _.map(p, (e, i) => {
      let s = _.clone(e)
      let extraCN = '',
        title = ''
      let mouseEvtHdlr = evt => {
        this.updateStyle(evt, i)
      }
      let mouseClickHdlr = mouseEvtHdlr

      switch (i) {
        case '7':
          s.background = 'url(' + require('./transparent.svg') + ')'
          title = langs[this.props.language].setToTransparent
          break
        case '8':
          extraCN = ' special-style glyphicon glyphicon-remove'
          title = langs[this.props.language].removeStyle
          break
        case '9':
          extraCN = ' special-style glyphicon glyphicon-edit'
          title = langs[this.props.language].customizeStyle
          mouseEvtHdlr = null
          mouseClickHdlr = () => {
            $('#sp-styler-modal').modal('show')
          }
          break
        default:
          title = langs[this.props.language].palette + ' ' + (parseInt(i) + 1)
      }
      return (
        <div
          className={'sp-palette' + extraCN}
          style={s}
          title={title}
          onMouseOver={mouseEvtHdlr}
          onMouseLeave={mouseEvtHdlr}
          onClick={mouseClickHdlr}
          key={i}
        />
      )
    })
    return (
      <div id="sp-quick-styler">
        {pDivs}
        <Styler
          selectedStyleTarget={this.props.selectedStyleTarget}
          presentationStyle={this.props.presentationStyle}
          deck={this.props.deck}
          language={this.props.language}
          defaultSlideStyle={this.props.defaultSlideStyle}
          selectedSlidesStyle={this.props.selectedSlidesStyle}
          thisSlideStyle={this.props.thisSlideStyle}
          setTargetStyle={this.props.setTargetStyle}
          updatePalette={this.updatePalette}
          getStyle={this.getStyle}
          updateStyle={this.updateStyle}
          palettes={this.state.palettes}
        />
      </div>
    )
  }
}
module.exports = QuickStyler
