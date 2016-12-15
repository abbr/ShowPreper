'use strict'
import React from 'react'
import './bespokeThemeMenu.less'
let formats = require.context(
  "./img", // context folder
  true // useSubdirectories
)
module.exports = React.createClass({
  updateBespokeTheme: function(name){

  },
  render: function () {
    let imgs = formats.keys().map(function (e, i) {
      return <li key={i}><a onClick={()=> {
        console.log('here')
      }}><img src={formats(e)}/></a></li>
    })
    return <div className="sp-bespoke-format-menu dropdown">
      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <div className="btn-label">
          xxx<span className="caret"/>
        </div>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        {imgs}
      </ul>
    </div>
  }
})
