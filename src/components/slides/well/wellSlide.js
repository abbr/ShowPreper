var React = require('react')
let _ = require('lodash')
var DisplayableComponent = require('components/widgets/displayableComponent')
import AutoScale from 'components/mixins/autoScale'
import classNames from 'classnames'

var WellSlide = class extends AutoScale.autoScaleMixin(React.Component) {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    this._resized()
  }
  UNSAFE_componentWillReceiveProps() {
    super.UNSAFE_componentWillReceiveProps && super.UNSAFE_componentWillReceiveProps()
    this._resized()
  }
  _resized() {
    let deck = this.props.deck
    let slideWidth = this.props.component.width || deck.slideWidth
    let slideHeight = this.props.component.height || deck.slideHeight
    this._scale({ width: slideWidth, height: slideHeight })
  }
  _clicked = () => {
    this.props.onSlideClicked(this.props.index)
  }
  render() {
    let componentsView = this.props.component.components.map(
      (component, index) => {
        return <DisplayableComponent component={component} key={index} />
      }
    )
    return (
      <div className="sp-well-slide-container" onClick={this._clicked}>
        <div
          className={classNames('sp-well-slide', {
            'sp-selected': this.props.deck.activeSlide === this.props.index
          })}
          style={_.merge(
            {},
            this.state.scaleStyle,
            (this.props.deck.activeSlide === this.props.index
              ? this.props.thisSlideStyle
              : null) ||
              this.props.component.style ||
              this.props.defaultSlideStyle ||
              this.props.deck.defaultSlideStyle
          )}
        >
          {this.props.children}
          {componentsView}
        </div>
      </div>
    )
  }
}

module.exports = WellSlide
