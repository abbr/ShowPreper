import React from 'react'
import { langs } from 'i18n/lang'
import './index.less'
import _ from 'lodash'
import BackgroundEditor from './backgroundEditor'
import BorderEditor from './borderEditor'

export default class extends React.Component {
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    $('#sp-styler-modal-content').draggable({
      handle: '.modal-header'
    })
    $('#sp-styler-modal').on('hide.bs.modal', () => {
      this.props.setTargetStyle(this.props.selectedStyleTarget + 'Style', null)
    })
  }
  updateStyle = newStyleComponent => {
    let s = this.props.getStyle()
    let targetStyle = _.mergeWith({}, s, newStyleComponent, (ov, sv, k, o) => {
      if (sv === undefined) {
        delete o[k]
      }
    })
    this.props.setTargetStyle(
      this.props.selectedStyleTarget + 'Style',
      targetStyle
    )
  }
  render() {
    let s,
      sDisp,
      attrs = []
    s = this.props.getStyle() || {}
    sDisp = _.reduce(
      s,
      (p, e, k) => {
        var capitalLtrs = k.match(/([A-Z])/)
        if (capitalLtrs) {
          for (let i = 1; i < capitalLtrs.length; i++) {
            let capitalLtr = capitalLtrs[i]
            let lowerLtr = capitalLtr.toLowerCase()
            k = k.replace(capitalLtr, '-' + lowerLtr)
          }
        }
        attrs.push(k)
        p.push(
          <div key={p.length}>
            {k}: {e}
          </div>
        )
        return p
      },
      []
    )

    let p = _.cloneDeep(this.props.palettes)
    delete p[7]
    let pDivs = _.map(p, (e, i) => {
      let s = _.clone(e)
      let title = 'palette ' + (1 + parseInt(i))
      let mouseEvtHdlr = () => {
        this.props.updatePalette(i)
      }
      return (
        <div
          className={'sp-palette'}
          style={s}
          title={title}
          onClick={mouseEvtHdlr}
          key={i}
        />
      )
    })
    return (
      <div
        className="modal fade"
        id="sp-styler-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="sp-styler-modal-label"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" id="sp-styler-modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="sp-styler-modal-label">
                {langs[this.props.language].setAppearance}{' '}
                {langs[this.props.language][this.props.selectedStyleTarget]}
              </h4>
            </div>
            <div className="modal-body">
              <div className="row" style={{ marginBottom: '5px' }}>
                <div className="col-md-4">
                  <div className="sp-styler-transparent-marker">
                    <div className="sp-styler-preview" style={s} />
                  </div>
                </div>
                <div className="col-md-8">{sDisp}</div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        href="#spStylerTabBackground"
                        aria-expanded={true}
                      >
                        {langs[this.props.language].background}
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#spStylerTabBorder">
                        {langs[this.props.language].border}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="spStylerTabBackground"
                      className="tab-pane fade in active"
                    >
                      <BackgroundEditor
                        language={this.props.language}
                        currentStyle={s && s.background}
                        updateStyle={this.updateStyle}
                      />
                    </div>
                    <div id="spStylerTabBorder" className="tab-pane fade">
                      <BorderEditor
                        language={this.props.language}
                        currentStyle={s}
                        updateStyle={this.updateStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div style={{ float: 'left' }}>
                <div style={{ textAlign: 'left' }}>
                  {langs[this.props.language].replacePalette}
                </div>
                {pDivs}
              </div>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {langs[this.props.language].btnClose}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={evt => {
                  this.props.updateStyle(evt)
                  $('#sp-styler-modal').modal('hide')
                }}
              >
                {langs[this.props.language].applyStyle}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
