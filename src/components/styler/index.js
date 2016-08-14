import React from 'react'
export default React.createClass({
  componentDidMount: function () {
    $("#sp-styler-modal").draggable({
      handle: ".modal-header"
    })
  },
  render: function () {
    return <div className="modal fade" id="sp-styler-modal" tabIndex="-1" role="dialog" aria-labelledby="sp-styler-model-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="sp-styler-model-label">Modal title</h4>
          </div>
          <div className="modal-body">
            ...
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
