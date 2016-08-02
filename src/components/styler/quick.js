'use strict'
import React from 'react'
import './quick.less'
import Palettes from 'stores/palettes'
import _ from 'lodash'
let QuickStyler = React.createClass({
  render: function () {
    let p = new Palettes()
    let pDivs = _.map(p, (e, i)=> {
      return <div className="sp-palette"
                  style={e}
                  key={i}></div>
    })
    return <div id="sp-quick-styler">
      {pDivs}
    </div>
  }
})
module.exports = QuickStyler
