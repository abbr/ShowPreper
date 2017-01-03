'use strict'
import React from 'react'
import lang from 'i18n/lang'
import Downloader from 'components/file/download'
import Uploader from 'components/file/upload'
import FileOpener from 'components/file/open'
import FileSaveAs from 'components/file/saveAs'
import About from 'components/file/about'
import Logo from './logo.svg'
module.exports = React.createClass({
  onUpload: function () {
    this.refs.uploader.click()
  },
  onDelete: function () {
    this.props.onDeleteDeck()
  },
  render: function () {
    let undoTitle = lang.undo + ' ' + this.props.deck.undoStack.stack[this.props.deck.undoStack.current].desc
    let redoTitle = lang.redo + ' ' + ((this.props.deck.undoStack.current + 1 < this.props.deck.undoStack.stack.length) ? this.props.deck.undoStack.stack[this.props.deck.undoStack.current + 1].desc : '')
    return <div className="dropdown">
      <a href="#" className="navbar-brand dropdown-toggle" data-toggle="dropdown" role="button btn-default"
         aria-haspopup="true"
         aria-expanded="false">
        <img src={Logo}/>
         ShowPreper
        <span className="caret"/></a>
      <ul className="dropdown-menu">
        <li><a href="#" onClick={this.props.onUndo} title={undoTitle}>{lang.undo}<span
          className="badge">Ctrl-z</span></a></li>
        <li><a href="#" onClick={this.props.onRedo} title={redoTitle}>{lang.redo}<span
          className="badge">Ctrl-y</span></a></li>
        <li><a href="#sp-file-open" data-toggle="modal" title={lang.open}>{lang.open}...</a>
        </li>
        <li><a href="#sp-file-save-as" data-toggle="modal" title={lang.saveAs}>{lang.saveAs}...</a>
        </li>
        <li><a href="#sp-open-download" data-toggle="modal" title={lang.download}>{lang.download}...</a>
        </li>
        <li><a href="#" onClick={this.onUpload} title={lang.upload}>{lang.upload}...</a>
        </li>
        <li><a href="#" onClick={this.onDelete} title={lang.delete} style={{color: 'red'}}>{lang.delete}</a>
        </li>
        <li><a href="#sp-about" data-toggle="modal" title="about">About...</a>
        </li>
      </ul>
      <FileOpener onNewDeck={this.props.onNewDeck}/>
      <FileSaveAs
        onNewDeck={this.props.onNewDeck}
        deck={this.props.deck}/>
      <Downloader {...this.props}/>
      <Uploader onNewDeck={this.props.onNewDeck} ref="uploader"/>
      <About/>
    </div>
  }
})
