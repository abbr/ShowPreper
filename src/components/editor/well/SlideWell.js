'use strict';

var React = require('react');
var Slide = require('./wellSlide');

require('./slideWell.less')

var SlideWell = React.createClass({
	renderSlide: function(slide, index) {
		return (
			<Slide
				model={slide}
				key={slide.id}
				index={index}
				onClick={this.props.onSlideClicked}
			/>
		);
	},

	render: function() {
		var slides = this.props.deck.slides.map(this.renderSlide);
		return 	<div {...this.props} className="sp-slide-well">
				{slides}
			</div>
	}
});

module.exports = SlideWell;
