'use strict'
import React from "react";
import ReactDOM from "react-dom";

let Importer = React.createClass({
  click: function () {
    let domEle = ReactDOM.findDOMNode(this)
    domEle.value = null
    domEle.click()
  },
  onChange: function (e) {
    let file = e.target.files[0]
    // TODO validate file mime type
    if (file != null) {
      let reader = new FileReader()
      reader.onload = function (e) {
        // TODO parse files
        this.props.onNewDeck(file.name, JSON.parse(e.target.result))
      }.bind(this)
      reader.readAsText(file)
    }
  },
  render: function () {
    return <input type="file" style={{display: "none"}} accept=".spj" onChange={this.onChange}></input>
  }
})
module.exports = Importer
