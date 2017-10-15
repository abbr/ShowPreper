let React = require('react')

module.exports = class Global extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  static get(name) {
    return window[name]
  }

  getScript() {
    var script = ''
    for (var key in this.props.values || {}) {
      script +=
        'var ' + key + '=' + JSON.stringify(this.props.values[key]) + ';'
    }
    return script
  }

  render() {
    return React.createElement('script', {
      type: 'text/javascript',
      dangerouslySetInnerHTML: {
        __html: this.getScript()
      }
    })
  }
}
