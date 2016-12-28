'use strict'
import React from 'react'
import lang from 'i18n/lang'
import Exporter from 'components/file/export'
import Importer from 'components/file/import'
import FileOpener from 'components/file/open'
import FileSaveAs from 'components/file/saveAs'

module.exports = React.createClass({
  onImport: function () {
    this.refs.importer.click()
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
         aria-expanded="false">ShowPreper<span className="caret"/></a>
      <ul className="dropdown-menu">
        <li><a href="#" onClick={this.props.onUndo} title={undoTitle}>{lang.undo}<span
          className="badge">Ctrl-z</span></a></li>
        <li><a href="#" onClick={this.props.onRedo} title={redoTitle}>{lang.redo}<span
          className="badge">Ctrl-y</span></a></li>
        <li><a href="#sp-file-open" data-toggle="modal" title={lang.open}>{lang.open}</a>
        </li>
        <li><a href="#sp-file-save-as" data-toggle="modal" title={lang.saveAs}>{lang.saveAs}</a>
        </li>
        <li><a href="#openExport" title={lang.download}>{lang.download}</a>
        </li>
        <li><a href="#" onClick={this.onImport} title={lang.upload}>{lang.upload}</a>
        </li>
        <li><a href="#" onClick={this.onDelete} title={lang.delete} style={{color: 'red'}}>{lang.delete}</a>
        </li>
      </ul>
      <FileOpener onNewDeck={this.props.onNewDeck}/>
      <FileSaveAs
        onNewDeck={this.props.onNewDeck}
        deck={this.props.deck}/>
      <Exporter deck={this.props.deck}/>
      <Importer onNewDeck={this.props.onNewDeck} ref="importer"/>
    </div>
  }
})
