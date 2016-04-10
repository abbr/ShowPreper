'use strict'
import React from "react";

let Importer = React.createClass({
  click: function () {
    this.refs.fileUploader.click()
  },
  onChange: function (e) {
    let file = e.target.files[0]
    // TODO validate file mime type
    if (file != null) {
      let reader = new FileReader()
      reader.onload = function (e) {
        // TODO parse files
        this.props.onNewDeck(file.name, e.target.result)
      }.bind(this)
      reader.readAsText(file)
    }
  },
  render: function () {
    return <input type="file" style={{display: "none"}} ref="fileUploader" onChange={this.onChange}></input>
  }
})
module.exports = Importer
