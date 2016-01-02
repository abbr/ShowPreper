'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import 'impress.js'
import './impress.less'
import DeckStore from 'stores/deck'

let Presentation = React.createClass({
  render: function () {
    return <div>
      <div className="fallback-message">
        <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a
          simplified version of this presentation.</p>
        <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
      </div>
      todo
    </div>
  }
})
// Render the main component into the dom
ReactDOM.render(<Presentation />, document.getElementById('app'))
