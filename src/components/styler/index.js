import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import lang from 'i18n/lang'
import './index.less'
import _ from 'lodash'
import ColorPatternEditor from './colorPatternEditor'

export default React.createClass({
  componentDidMount: function () {
    let that = this
    $("#sp-styler-modal").draggable({
      handle: ".modal-header"
    })
    $('#sp-styler-modal').on('hide.bs.modal', function (e) {
      that.props.setTargetStyle(that.props.selectedStyleTarget + 'Style', null)
    })
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
  updateStyle: function (newStyleComponent) {
    let s = this.getStyle()
    let targetStyle = _.mergeWith({}, s, newStyleComponent, (ov, sv, k, o, s) => {
      if (sv === undefined) {
        delete o[k]
      }
    })
    this.props.setTargetStyle(this.props.selectedStyleTarget + 'Style', targetStyle)
  },
  render: function () {
    let s, sDisp, attrs = []
    s = this.getStyle()
    sDisp = _.reduce(s, (p, e, k)=> {
      var capitalLtrs = k.match(/([A-Z])/)
      if (capitalLtrs) {
        for (let i = 1; i < capitalLtrs.length; i++) {
          let capitalLtr = capitalLtrs[i]
          let lowerLtr = capitalLtr.toLowerCase()
          k = k.replace(capitalLtr, '-' + lowerLtr)
        }
      }
      attrs.push(k)
      p.push(<div key={p.length}>{k}: {e}</div>)
      return p
    }, [])
    return <div className="modal fade" id="sp-styler-modal" tabIndex="-1" role="dialog"
                aria-labelledby="sp-styler-modal-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"
                    aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"
                id="sp-styler-modal-label">{lang.setAppearance} {lang[this.props.selectedStyleTarget]}</h4>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <div className="sp-styler-transparent-marker">
                  <div className="sp-styler-preview"
                       style={s}></div>
                </div>
              </div>
              <div className="col-md-8">
                {sDisp}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <ul className="nav nav-tabs">
                  <li className="active"><a data-toggle="tab" href="#spStylerTabBackground">{lang.background}</a></li>
                  <li><a data-toggle="tab" href="#spStylerTabBorder">{lang.border}</a></li>
                </ul>
                <div className="tab-content">
                  <div id="spStylerTabBackground" className="tab-pane fade in active">
                    <ColorPatternEditor
                      currentStyle={s.background}
                      updateStyle={this.updateStyle}
                    ></ColorPatternEditor>
                  </div>
                  <div id="spStylerTabBorder" className="tab-pane fade">
                    <h3>{lang.border}</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  }
})
