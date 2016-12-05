'use strict'
import React from 'react'
import Impress from './impress'
import Handouts from './handouts'
module.exports = React.createClass({
  render: function () {
    switch (this.props.presentationFormat) {
      case 'handouts':
        return <Handouts {...this.props}></Handouts>
        break
      case 'impress':
        return <Impress {...this.props}></Impress>
    }
  }
})

