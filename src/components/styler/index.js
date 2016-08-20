import React from 'react'
import 'spectrum-colorpicker'
import 'spectrum-colorpicker/spectrum.css'
import lang from 'i18n/lang'
export default React.createClass({
  componentDidMount: function () {
    $("#sp-styler-modal").draggable({
      handle: ".modal-header"
    })
    $("#colorpicker").spectrum({
      color: "#f00"
    })
  },
  render: function () {
    return <div className="modal fade" id="sp-styler-modal" tabIndex="-1" role="dialog"
                aria-labelledby="sp-styler-model-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"
                id="sp-styler-model-label">{lang.setAppearance} {lang[this.props.selectedStyleTarget]}</h4>
          </div>
          <div className="modal-body">
            <input id='colorpicker'/>
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
