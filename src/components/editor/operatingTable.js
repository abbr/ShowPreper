'use strict';

var React = require('react');
var Geometry = require('math/Geometry');
var _ = require('lodash');

require('components/editor/operatingTable.less');
import ReactDOM from 'react-dom'

var OperatingTable = React.createClass({
	_computeOtsSquare: function() {
		var deck = this.props.deck;
		var slideWidth = deck.config.slideWidth;
		var slideHeight = deck.config.slideHeight;

		var rootElSize = window.getComputedStyle(ReactDOM.findDOMNode(this));

		if (!rootElSize)
			return {};

		var width = parseInt(rootElSize.width);
		var height = parseInt(rootElSize.height);

		var scale = Geometry.getFitSquareScaleFactor(
			slideWidth,
			slideHeight,
			width,
			height - 20
		);

		var leftOffset = (width - slideWidth * scale) / 2;
		var topOffset = (height - slideHeight * scale) / 2;

		return [
			scale,
			{
				transform: 'scale(' + scale + ')',
				marginLeft: leftOffset + 'px',
				width: slideWidth,
				height: slideHeight
			}
		];
	},

	_resized: function() {
		var style = this._computeOtsSquare();
		this.setState({
			otsStyle: style[1],
			scale: style[0]
		});
	},

	onClick() {
		var slide = this.props.deck.getSelectedSlide();
		if (slide) {
			slide.unselectComponents();
			slide.stopEditingComponents();
		}
	},

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		this._resized();

		window.addEventListener('resize', this._resized);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this._resized);
	},

	render: function() {
		return (
			<div
				className="strt-operating-table"
				onClick={this.onClick}>
				<div className="strt-ot-slide" style={this.state.otsStyle}>
				</div>
			</div>
		);
	}
});

module.exports = OperatingTable;
