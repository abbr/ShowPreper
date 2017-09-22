'use strict'
import React from 'react'
import Impress from './impress'
import Handouts from './handouts'
import Bespoke from './bespoke'
module.exports = class extends React.Component {
  render() {
    switch (this.props.presentationFormat) {
      case 'handouts':
        return <Handouts {...this.props} />
      case 'impress':
        return <Impress {...this.props} />
      case 'bespoke':
        return <Bespoke {...this.props} />
      default:
        break
    }
  }
}
