'use strict'
import React from 'react'
import lang from 'i18n/lang'
import Exporter from 'components/file/export'
import Importer from 'components/file/import'
import FileOpener from 'components/file/open'
import FileSaveAs from 'components/file/saveAs'
import QuickStyler from 'components/styler/quick'
import './header.less'

let Header = React.createClass({
  createWidget: function (type) {
    let deck = this.props.deck
    let activeSlide = deck.getActiveSlide()
    this.props.onNewWidget(activeSlide, null,
      {
        "type": type,
        "x": 0,
        "y": 0,
        "text": "<div style=\"font-family: Hammersmith One;font-size: 30pt\">(" + lang['triClickEdt'] + ")</div>"
      },
      lang['new'] + ' ' + lang[type])
  },
  onImport: function () {
    this.refs.importer.click()
  },
  onDelete: function () {
    this.props.onDeleteDeck()
  },
  getInitialState: () => ({
    selectedStyleTarget: 'defaultSlide'
  }),
  render: function () {
    let undoTitle = lang.undo + ' ' + this.props.deck.undoStack.stack[this.props.deck.undoStack.current].desc
    let redoTitle = lang.redo + ' ' + ((this.props.deck.undoStack.current + 1 < this.props.deck.undoStack.stack.length) ? this.props.deck.undoStack.stack[this.props.deck.undoStack.current + 1].desc : '')
    return <nav className="navbar navbar-default sp-header">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#sp-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <div className="dropdown">
            <a href="#" className="navbar-brand dropdown-toggle" data-toggle="dropdown" role="button btn-default"
               aria-haspopup="true"
               aria-expanded="false">ShowPreper<span className="caret"/></a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={this.props.onUndo} title={undoTitle}>{lang.undo}<span
                className="badge">Ctrl-z</span></a></li>
              <li><a href="#" onClick={this.props.onRedo} title={redoTitle}>{lang.redo}<span
                className="badge">Ctrl-y</span></a></li>
              <li><a href="#fileOpen" title={lang.open}>{lang.open}</a>
              </li>
              <li><a href="#fileSaveAs" title={lang.saveAs}>{lang.saveAs}</a>
              </li>
              <li><a href="#openExport" title={lang.export}>{lang.export}</a>
              </li>
              <li><a href="#" onClick={this.onImport} title={lang.import}>{lang.import}</a>
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
        </div>
        <div className="collapse navbar-collapse" id="sp-navbar-collapse-1">
          <div className="nav navbar-btn navbar-left">
            <button type="button" className="btn btn-default"
                    onClick={() => {
                      this.createWidget('TextBox')
                    }}>
              <span className={'glyphicon glyphicon-text-width'}/>&nbsp;
              <span className={'glyphicon glyphicon-picture'}/>&nbsp;
              <span className={'glyphicon glyphicon-globe'}/>
              <div className="btn-label">
                {lang.insertObject}
              </div>
            </button>
            <div className="dropdown" id="sp-navbar-style">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <div>{lang.setAppearance}</div>
                <div className="btn-label">
                  {lang[this.state.selectedStyleTarget]}<span className="caret"/>
                </div>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a onClick={()=> {
                  this.setState({selectedStyleTarget: 'defaultSlide'})
                }}>{lang.defaultSlide}</a></li>
                <li><a onClick={()=> {
                  this.setState({selectedStyleTarget: 'thisSlide'})
                }}>{lang.thisSlide}</a></li>
                <li><a onClick={()=> {
                  this.setState({selectedStyleTarget: 'selectedSlides'})
                }}>{lang.selectedSlides}</a></li>
                <li><a onClick={()=> {
                  this.setState({selectedStyleTarget: 'entirePresentation'})
                }}>{lang.entirePresentation}</a></li>
              </ul>
            </div>
            <QuickStyler selectedStyleTarget={this.state.selectedStyleTarget}
                         deckStyle={this.props.deckStyle}
                         deck={this.props.deck}
                         defaultSlideStyle={this.props.defaultSlideStyle}
                         selectedSlideStyle={this.props.selectedSlideStyle}
                         setTargetStyle={this.props.setTargetStyle}
            ></QuickStyler>
          </div>
          <div className="navbar-right">
            <ul className="nav navbar-btn sp-view-btns">
              <li style={this.props.currentView !== 'slides' ? {} : {display: 'none'}}>
                <button type="button"
                        className="btn btn-default"
                        onClick={()=>this.props.changeView('slides')}
                >
                  <span className={'glyphicon glyphicon-th-list'}/>
                  <div className="btn-label">
                    {lang.slides}
                  </div>
                </button>
              </li>
              <li style={this.props.currentView !== 'overview' ? {} : {display: 'none'}}>
                <button type="button"
                        className="btn btn-default"
                        onClick={()=>this.props.changeView('overview')}
                >
                  <span className={'glyphicon glyphicon-th'}/>
                  <div className="btn-label">
                    {lang.overview}
                  </div>
                </button>
              </li>
            </ul>

            <div className="nav navbar-btn btn-group">
              <a type="button" className="btn btn-success" href="./presentation.html" target="_blank">
                <span className={'glyphicon glyphicon-play'}/>
                <div>{lang.show}</div>
              </a>
              <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                <span className="caret"/>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="./presentation.html" target="_blank">{lang.presentation}</a></li>
                <li><a href="./handout.html" target="_blank">{lang.handouts}</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/*<!-- /.navbar-collapse -->*/}
      </div>
      {/*<!-- /.container-fluid -->*/}
    </nav>
  }
})

module.exports = Header
