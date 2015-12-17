'use strict';

var React = require('react');

var WellSlide = React.createClass({
	_clicked: function() {
		this.props.onClick(this.props.index);
	},

	render: function() {

		return (
			<div
				className={
					"sp-well-slide " + (this.props.model.selected? "selected":'')
				}
				onClick={this._clicked}>
			</div>
		);
	}
});

module.exports = WellSlide;
