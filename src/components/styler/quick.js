'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'

let QuickStyler = React.createClass({
  render: function () {
    let p = new Palettes()
    console.log(p)
    return <div id="sp-quick-styler">
      test
    </div>
  }
})
module.exports = QuickStyler
