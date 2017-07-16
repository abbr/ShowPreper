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
        break
      case 'impress':
        return <Impress {...this.props} />
        break
      case 'bespoke':
        return <Bespoke {...this.props} />
        break
      default:
        break
    }
  }
}
