'use strict'
import React from 'react'
import './bespokeFormatMenu.less'
let formats = require.context(
  "./img", // context folder
  true // useSubdirectories
)
module.exports = React.createClass({
  render: function () {
    return <div className="sp-bespoke-format-menu">
      <img src={formats('./cards.png')}/>
    </div>
  }
})
