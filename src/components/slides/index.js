import React from 'react'
import SlideWell from 'components/slides/well'
import SlideEditor from 'components/slides/slide'
import './index.less'

let Main = class extends React.Component {
  render() {
    return (
      <div className="sp-slides">
        <SlideWell {...this.props} />
        <SlideEditor {...this.props} />
      </div>
    )
  }
}

module.exports = Main
