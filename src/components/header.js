'use strict'
import React from 'react'
import lang from 'i18n/lang'
let Header = React.createClass({
  render: function () {
    let undoTitle = lang.undo + ' ' + this.props.deck.undoStack.stack[this.props.deck.undoStack.current].desc
    let redoTitle = lang.redo + ' ' + ((this.props.deck.undoStack.current + 1 < this.props.deck.undoStack.stack.length) ? this.props.deck.undoStack.stack[this.props.deck.undoStack.current + 1].desc : '')
    return <nav className="navbar navbar-default showpreper-header">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="dropdown">
            <a href="#" className="navbar-brand dropdown-toggle" data-toggle="dropdown" role="button btn-default"
               aria-haspopup="true"
               aria-expanded="false">ShowPreper<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={this.props.onUndo} title={undoTitle}>{lang.undo}<span
                className="badge">Ctrl-z</span></a></li>
              <li><a href="#" onClick={this.props.onRedo} title={redoTitle}>{lang.redo}<span
                className="badge">Ctrl-y</span></a></li>
            </ul>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div className="nav navbar-btn btn-group navbar-left" role="group">
            {[
              {icon: 'glyphicon-text-width', text: lang.text, type: 'text'},
              {icon: 'glyphicon-picture', text: lang.image, type: 'image'},
              {icon: 'glyphicon-film', text: lang.video, type: 'video'},
              {icon: 'glyphicon-globe', text: lang.website, type: 'website'},
              {icon: 'glyphicon-star', text: lang.shapes, type: 'shapes'},
            ].map(e =>
              <button type="button" className="btn btn-default" key={e.type}>
                <span className={'glyphicon ' + e.icon}/>
                <div className="btn-label">
                  {e.text}
                </div>
              </button>
            )}
          </div>
          <ul className="nav navbar-btn navbar-right">
            <li style={this.props.currentView!=='slides'?{}: {display: 'none'}}>
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
            <li style={this.props.currentView!=='overview' ?{}: {display: 'none'}}>
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
        </div>
        {/*<!-- /.navbar-collapse -->*/}
      </div>
      {/*<!-- /.container-fluid -->*/}
    </nav>
  }
})

module.exports = Header
