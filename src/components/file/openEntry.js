import React from 'react'

module.exports = class OpenEntry extends React.Component {
  onOpen = () => {
    this.props.onNewDeck(this.props.name)
  }

  render() {
    return (
      <div>
        <a data-toggle="modal" href="#sp-file-open" onClick={this.onOpen}>
          {this.props.name}
        </a>
      </div>
    )
  }
}
