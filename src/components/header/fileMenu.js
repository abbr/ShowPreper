import React from 'react'
import { langs } from 'i18n/lang'
import Downloader from 'components/file/download'
import Uploader from 'components/file/upload'
import FileOpener from 'components/file/open'
import FileCreate from 'components/file/create'
import About from 'components/file/about'
import Logo from './logo.svg'
module.exports = class extends React.Component {
  onUpload = () => {
    this.refs.uploader.click()
  }
  onDelete = () => {
    this.props.onDeleteDeck()
  }

  render() {
    let undoTitle =
      langs[this.props.language].undo +
      ' ' +
      this.props.deck.undoStack.stack[this.props.deck.undoStack.current].desc
    let redoTitle =
      langs[this.props.language].redo +
      ' ' +
      (this.props.deck.undoStack.current + 1 <
      this.props.deck.undoStack.stack.length
        ? this.props.deck.undoStack.stack[this.props.deck.undoStack.current + 1]
            .desc
        : '')
    return (
      <div className="dropdown">
        <a
          href="#"
          className="navbar-brand dropdown-toggle"
          data-toggle="dropdown"
          role="button btn-default"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={Logo} />
          ShowPreper
          <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="#" onClick={this.props.onUndo} title={undoTitle}>
              {langs[this.props.language].undo}
              <span className="badge">Ctrl-z</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={this.props.onRedo} title={redoTitle}>
              {langs[this.props.language].redo}
              <span className="badge">Ctrl-y</span>
            </a>
          </li>
          <li>
            <a
              href="#sp-file-new"
              data-toggle="modal"
              title={langs[this.props.language].saveAs}
            >
              {langs[this.props.language].newFile}...
            </a>
          </li>
          <li>
            <a
              href="#sp-file-open"
              data-toggle="modal"
              title={langs[this.props.language].open}
            >
              {langs[this.props.language].open}...
            </a>
          </li>
          <li>
            <a
              href="#sp-file-save-as"
              data-toggle="modal"
              title={langs[this.props.language].saveAs}
            >
              {langs[this.props.language].saveAs}...
            </a>
          </li>
          <li>
            <a
              href="#sp-open-download"
              data-toggle="modal"
              title={langs[this.props.language].download}
            >
              {langs[this.props.language].download}...
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={this.onUpload}
              title={langs[this.props.language].upload}
            >
              {langs[this.props.language].upload}...
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={this.onDelete}
              title={langs[this.props.language].delete}
              style={{ color: 'red' }}
            >
              {langs[this.props.language].delete}
            </a>
          </li>
          <li>
            <a href="#sp-about" data-toggle="modal" title="about">
              {langs[this.props.language].about}...
            </a>
          </li>
        </ul>
        <FileOpener
          onNewDeck={this.props.onNewDeck}
          language={this.props.language}
        />
        <FileCreate
          onNewDeck={this.props.onNewDeck}
          domId="sp-file-save-as"
          mode="saveAs"
          deck={this.props.deck}
          language={this.props.language}
        />
        <FileCreate
          onNewDeck={this.props.onNewDeck}
          domId="sp-file-new"
          mode="newFile"
          deck={this.props.deck}
          language={this.props.language}
        />
        <Downloader {...this.props} />
        <Uploader onNewDeck={this.props.onNewDeck} ref="uploader" />
        <About language={this.props.language} />
      </div>
    )
  }
}
