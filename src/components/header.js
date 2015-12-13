import React from 'react'
import lang from 'i18n/lang'
module.exports = React.createClass({
  render: () =>
    <nav className="navbar navbar-default showpreper-header">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">ShowPreper</a>
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
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
        {/*<!-- /.navbar-collapse -->*/}
      </div>
      {/*<!-- /.container-fluid -->*/}
    </nav>
})
