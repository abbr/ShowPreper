'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import 'impress.js'
import './impress.less'
import DeckStore from 'stores/deck'

let Presentation = React.createClass({
  componentDidMount: function () {
    if ("ontouchstart" in document.documentElement) {
      document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>"
    }
    window.impress().init()
  },
  render: function () {
    return <div>
      <div className="fallback-message">
        <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a
          simplified version of this presentation.</p>
        <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
      </div>
      <div id="impress">
        <div id="bored" className="step slide" data-x="-1000" data-y="-1500">
          <q>Aren't you just <b>bored</b> with all those slides-based presentations?</q>
        </div>
      </div>
      <div className="hint">
        <p>Use a spacebar or arrow keys to navigate</p>
      </div>
    </div>
  }
})
// Render the main component into the dom
ReactDOM.render(<Presentation />, document.getElementById('app'))
