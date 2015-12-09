import 'normalize.css'
import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import 'styles/App.less'

import React from 'react'
import Header from 'components/header'
import Main from 'components/main'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="showpreper-container">
        <Header/>
        <Main/>
      </div>
    )
  }
}

AppComponent.defaultProps = {}

export default AppComponent
